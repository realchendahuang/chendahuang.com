#!/usr/bin/env python3
"""抓取 X(@realchendahuang) 时间线 + 单帖数据,输出 scripts/out/x-timeline.json。

依赖本机 Kimi WebBridge daemon(127.0.0.1:10086)驱动用户真实 Chrome(复用 x.com 登录态)。
流程与 2026-09 手工同步验证过的一致:
  1. network 抓当前 UserOriginalsTimeline / TweetDetail 的 GraphQL URL(queryId 会变,必须现抓)
  2. 页面内 XMLHttpRequest 分页(fetch 的 Response 流会被扩展代理读走,必须用 XHR);
     每次 evaluate 只抓一页,游标由本脚本传递(daemon 对长耗时 evaluate 会 502)
  3. 现有 highlights 里有、但时间线翻页没覆盖到的旧帖,用 TweetDetail 逐个补

用法:
  python3 scripts/sync_x.py            # 默认翻 10 页时间线
  python3 scripts/sync_x.py --pages 20
"""

import argparse
import json
import re
import subprocess
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts" / "out"
BRIDGE = "http://127.0.0.1:10086/command"
SESSION = "x-sync"
HANDLE = "realchendahuang"
PROFILE_URL = f"https://x.com/{HANDLE}"

XHR_GET = """
function xhrGet(u) {
  // 裸 XHR 会被 403:必须带 web app 同款认证头(bearer 是 x.com 网页版公开常量)
  const ct0 = (document.cookie.split('; ').find(function (c) { return c.indexOf('ct0=') === 0; }) || '').slice(4);
  return new Promise(function (resolve, reject) {
    const x = new XMLHttpRequest();
    x.open('GET', u, true);
    x.setRequestHeader('authorization', 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA');
    x.setRequestHeader('x-csrf-token', decodeURIComponent(ct0));
    x.setRequestHeader('x-twitter-auth-type', 'OAuth2Session');
    x.setRequestHeader('x-twitter-active-user', 'yes');
    x.onload = function () { resolve(x.responseText); };
    x.onerror = function () { reject(new Error('xhr error')); };
    x.send();
  });
}
"""

TWEET_FROM_RESULT = """
function tweetFromResult(r) {
  if (r && r.__typename === 'TweetWithVisibilityResults' && r.tweet) r = r.tweet;
  const lg = (r && r.legacy) || {};
  if (!lg.id_str || lg.retweeted_status_result) return null;
  let text = lg.full_text || '';
  // 长帖(note_tweet)的 legacy.full_text 是截断版,全文在 note_tweet 里
  if (r.note_tweet && r.note_tweet.note_tweet_results && r.note_tweet.note_tweet_results.result) {
    text = r.note_tweet.note_tweet_results.result.text || text;
  }
  for (const u of (lg.entities && lg.entities.urls) || []) {
    if (u.url && u.expanded_url) text = text.split(u.url).join(u.expanded_url);
  }
  for (const m of (lg.entities && lg.entities.media) || []) {
    if (m.url) text = text.split(m.url).join('');
  }
  return {
    id: lg.id_str,
    url: 'https://x.com/HANDLE/status/' + lg.id_str,
    date: lg.created_at,
    text: text.trim().slice(0, 1500),
    likes: lg.favorite_count || 0,
    bookmarks: lg.bookmark_count || 0,
    reposts: lg.retweet_count || 0,
    replies: lg.reply_count || 0,
    views: parseInt((r.views && r.views.count) || '0', 10) || 0,
    reply_to: lg.in_reply_to_status_id_str || null
  };
}
""".replace("HANDLE", HANDLE)

PARSE_TWEETS = TWEET_FROM_RESULT + """
function parseTweets(j) {
  const res = [];
  const root = j && j.data && j.data.user && j.data.user.result;
  const tl = (root && root.timeline && (root.timeline.timeline || root.timeline.timeline_v2)) || null;
  if (!tl) return { tweets: res, cursor: null };
  let cursor = null;
  for (const ins of (tl.instructions || [])) {
    let entries = [];
    if (ins.type === 'TimelineAddEntries') entries = ins.entries || [];
    else if (ins.type === 'TimelinePinEntry' && ins.entry) entries = [ins.entry];
    for (const e of entries) {
      const c = e.content || {};
      if ((e.entryId || '').indexOf('cursor-bottom') === 0) { cursor = c.value || null; continue; }
      const items = [];
      if (c.itemContent) items.push(c.itemContent);
      if (c.items) for (const it of c.items) { if (it.item && it.item.itemContent) items.push(it.item.itemContent); }
      for (const ic of items) {
        if (!ic || ic.itemType !== 'TimelineTweet' || !ic.tweet_results || !ic.tweet_results.result) continue;
        const t = tweetFromResult(ic.tweet_results.result);
        if (t) res.push(t);
      }
    }
  }
  return { tweets: res, cursor: cursor };
}
""".replace("HANDLE", HANDLE)

PAGE_JS = """
(async () => {
__PARSE__
__XHR__
  const startUrl = "__START_URL__";
  const cursorIn = __CURSOR__;
  let u = startUrl;
  if (cursorIn) {
    const pu = new URL(startUrl);
    const v = JSON.parse(pu.searchParams.get('variables') || '{}');
    v.cursor = cursorIn;
    pu.searchParams.set('variables', JSON.stringify(v));
    u = pu.toString();
  }
  const body = await xhrGet(u);
  let j;
  try { j = JSON.parse(body); } catch (e) {
    return JSON.stringify({ tweets: [], cursor: null, error: 'json-parse: ' + body.slice(0, 200) });
  }
  const parsed = parseTweets(j);
  if (!parsed.tweets.length) {
    parsed.error = JSON.stringify({ errors: j.errors || null, topKeys: Object.keys(j), hasData: !!j.data }).slice(0, 300);
  }
  return JSON.stringify(parsed);
})()
"""

DETAIL_JS = """
(async () => {
__HELPERS__
__XHR__
  const startUrl = "__START_URL__";
  const ids = __IDS__;
  // 状态页抓到的 TweetDetail 是会话版:变量叫 focalTweetId,响应在 threaded_conversation_with_injections_v2
  function parseConversation(j, id) {
    let r = j && j.data && j.data.tweetResult && j.data.tweetResult.result;  // 兼容纯详情版
    if (r) return tweetFromResult(r);
    const root = j && j.data && j.data.threaded_conversation_with_injections_v2;
    for (const ins of (root && root.instructions) || []) {
      for (const e of (ins.type === 'TimelineAddEntries' && ins.entries) || []) {
        if (e.entryId === 'tweet-' + id && e.content && e.content.itemContent) {
          const res = e.content.itemContent.tweet_results;
          if (res && res.result) return tweetFromResult(res.result);
        }
      }
    }
    return null;
  }
  const out = [];
  for (const id of ids) {
    const pu = new URL(startUrl);
    const v = JSON.parse(pu.searchParams.get('variables') || '{}');
    if ('focalTweetId' in v) v.focalTweetId = id; else v.tweetId = id;
    pu.searchParams.set('variables', JSON.stringify(v));
    try {
      const body = await xhrGet(pu.toString());
      const t = parseConversation(JSON.parse(body), id);
      if (t) out.push(t);
    } catch (e) {}
    await new Promise(function (r) { setTimeout(r, 350); });
  }
  return JSON.stringify(out);
})()
"""


def bridge(action, args, timeout=120, retries=3):
    body = json.dumps({"action": action, "args": args, "session": SESSION}).encode()
    last_err = None
    for i in range(retries):
        try:
            req = urllib.request.Request(BRIDGE, data=body, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                payload = json.loads(resp.read())
            data = payload.get("data", payload)
            if isinstance(data, dict) and data.get("success") is False:
                raise RuntimeError(f"{action} 失败: {json.dumps(data, ensure_ascii=False)[:400]}")
            return data
        except urllib.error.HTTPError as e:
            err_body = e.read().decode(errors="replace")[:300]
            last_err = RuntimeError(f"{action} HTTP {e.code}: {err_body}")
            if e.code < 500:
                raise last_err
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as e:
            last_err = e
        time.sleep(2 * (i + 1))
    raise last_err


def ensure_daemon():
    try:
        bridge("list_tabs", {}, timeout=10)
        print("[ok] WebBridge daemon 在线")
    except Exception:
        print("[..] WebBridge daemon 未响应,尝试启动")
        subprocess.run(
            [str(Path.home() / ".kimi-webbridge" / "bin" / "kimi-webbridge"), "start"],
            timeout=30,
        )
        time.sleep(2)
        bridge("list_tabs", {}, timeout=15)
        print("[ok] WebBridge daemon 已启动")


def deep_collect_urls(obj, op, hits):
    """递归收集响应里所有含 /i/api/graphql/ 且带 variables= 的 URL 字符串。"""
    if isinstance(obj, str):
        if "/i/api/graphql/" in obj and op in obj and "variables=" in obj:
            hits.append(obj)
    elif isinstance(obj, dict):
        for v in obj.values():
            deep_collect_urls(v, op, hits)
    elif isinstance(obj, list):
        for v in obj:
            deep_collect_urls(v, op, hits)


def capture_graphql_url(op, page_url):
    """导航到 page_url,用 network 捕获 op 查询的完整 GraphQL URL。"""
    bridge("navigate", {"url": page_url})  # session 必须先有 tab,network 才能启动
    bridge("network", {"cmd": "start"})
    try:
        bridge("navigate", {"url": page_url})  # 重载以触发 GraphQL 请求
        for attempt in range(15):
            time.sleep(1)
            try:
                listed = bridge("network", {"cmd": "list", "filter": op})
            except RuntimeError:
                listed = bridge("network", {"cmd": "list"})
            hits = []
            deep_collect_urls(listed, op, hits)
            if hits:
                return max(hits, key=len)
            print(f"[..] 等待 {op} 请求出现 ({attempt + 1}/15)")
        raise RuntimeError(f"没抓到 {op} 的 GraphQL URL——确认 Chrome 已打开且已登录 x.com")
    finally:
        try:
            bridge("network", {"cmd": "stop"})
        except RuntimeError:
            pass


def known_highlight_ids():
    """从 content/highlights 现有条目里收集 tweet id(url 可能带引号)。"""
    ids = set()
    for p in (ROOT / "content" / "highlights").glob("*.yml"):
        m = re.search(
            r'^url: "?https://(?:x|twitter)\.com/' + HANDLE + r"/status/(\d+)", p.read_text(), re.M
        )
        if m:
            ids.add(m.group(1))
    return ids


def x_date_to_bj(raw):
    """'Wed Jun 22 12:00:00 +0000 2026' → 北京时间 ISO 日期。"""
    try:
        dt = datetime.strptime(raw, "%a %b %d %H:%M:%S %z %Y").astimezone(
            timezone(timedelta(hours=8))
        )
        return dt.date().isoformat()
    except Exception:
        return None


def evaluate_json(code, timeout=120):
    raw = bridge("evaluate", {"code": code}, timeout=timeout)
    return json.loads(raw.get("value", "null"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", type=int, default=10, help="时间线翻页数(每页约 20 条)")
    args = ap.parse_args()

    ensure_daemon()
    print("[..] 打开个人主页并捕获 UserOriginalsTimeline 请求")
    timeline_url = capture_graphql_url("UserOriginalsTimeline", PROFILE_URL).replace("&amp;", "&")
    print("[ok] 捕获到时间线 GraphQL URL")

    tweets, seen, cursor = [], set(), None
    for page in range(args.pages):
        code = (
            PAGE_JS.replace("__PARSE__", PARSE_TWEETS)
            .replace("__XHR__", XHR_GET)
            .replace("__START_URL__", timeline_url)
            .replace("__CURSOR__", json.dumps(cursor))
        )
        try:
            parsed = evaluate_json(code)
        except Exception as e:
            print(f"[warn] 第 {page + 1} 页失败: {e}")
            break
        page_tweets = (parsed or {}).get("tweets") or []
        fresh = [t for t in page_tweets if t["id"] not in seen]
        for t in fresh:
            seen.add(t["id"])
        tweets.extend(fresh)
        next_cursor = (parsed or {}).get("cursor")
        print(f"[..] 第 {page + 1} 页:+{len(fresh)} 条(累计 {len(tweets)})")
        if not fresh and (parsed or {}).get("error"):
            print(f"[warn] 空页诊断: {parsed['error']}")
        if not next_cursor or next_cursor == cursor:
            break
        cursor = next_cursor
        time.sleep(0.5)

    if not tweets:
        probe = bridge("evaluate", {"code": "document.body.innerText.slice(0,200)"})
        print(f"[error] 一条都没抓到,页面内容: {(probe.get('value') or '')[:200]}")
        raise SystemExit("可能未登录 x.com 或 GraphQL 响应结构变了")

    known = known_highlight_ids()
    print(f"[ok] 站内已有 {len(known)} 条 highlight")
    missing = sorted(known - seen)
    if missing:
        print(f"[..] {len(missing)} 条旧帖不在时间线内,用 TweetDetail 分批补抓")
        anchor = tweets[0]["url"] if tweets else PROFILE_URL
        detail_url = capture_graphql_url("TweetDetail", anchor)
        for i in range(0, len(missing), 10):
            batch = missing[i : i + 10]
            code = (
                DETAIL_JS.replace("__HELPERS__", TWEET_FROM_RESULT)
                .replace("__XHR__", XHR_GET)
                .replace("__START_URL__", detail_url)
                .replace("__IDS__", json.dumps(batch))
            )
            got = evaluate_json(code, timeout=180) or []
            tweets.extend(got)
            seen.update(t["id"] for t in got)
            print(f"[..] 详情批次 {i // 10 + 1}:+{len(got)} 条")
    else:
        print("[ok] 站内 highlight 全部被时间线覆盖,无需补抓")

    for t in tweets:
        t["date_bj"] = x_date_to_bj(t["date"])

    OUT.mkdir(parents=True, exist_ok=True)
    out_file = OUT / "x-timeline.json"
    out_file.write_text(
        json.dumps(
            {
                "fetched_at": datetime.now().isoformat(timespec="seconds"),
                "handle": HANDLE,
                "count": len(tweets),
                "tweets": tweets,
            },
            ensure_ascii=False,
            indent=1,
        )
    )
    still_missing = known - seen
    print(f"[done] {len(tweets)} 条 → {out_file.relative_to(ROOT)}")
    if still_missing:
        print(f"[warn] {len(still_missing)} 条站内帖没抓到数据(可能已删除/仅关注者可见): {sorted(still_missing)[:5]} ...")


if __name__ == "__main__":
    main()
