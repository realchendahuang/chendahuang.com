#!/usr/bin/env python3
"""把 scripts/out/ 里的抓取结果落到站点内容:

  1. GitHub 仓库(gh CLI) → 更新 content/projects/*.yml 的 stars,报告新仓库
  2. X 帖子数据(scripts/out/x-timeline.json,sync_x.py 产出) →
     更新 content/highlights/*.yml(全语言)的 likes/bookmarks/reposts/views,报告新帖候选
  3. 生成 scripts/out/report-YYYYMMDD.md(新帖/新仓库/统计变动),新内容的撰写翻译仍需人工+AI

只做正则替换数字行,不重排 YAML,保持既有格式与 diff 干净。

用法:
  python3 scripts/sync_stats.py            # 先跑过 sync_x.py 才有 x-timeline.json
  python3 scripts/sync_stats.py --no-x     # 只刷 GitHub stars
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts" / "out"
HANDLE = "realchendahuang"
LOCALE_RE = r"\.(?:[a-z]{2}|zh-Hant)\.yml$"
STAT_FIELDS = ["likes", "bookmarks", "reposts", "views"]

RE_ID = re.compile(r'^url: "?https://(?:x|twitter)\.com/' + HANDLE + r"/status/(\d+)", re.M)
RE_REPO = re.compile(r'^url: "?https://github\.com/' + HANDLE + r"/([^/\"?\s]+)", re.M)


def locale_files(directory: Path, slug: str):
    """slug 对应的全部语言文件(避免 feedsieve 误匹配 feedsieve-cases)。"""
    files = []
    for p in sorted(directory.glob("*.yml")):
        if p.name == f"{slug}.yml" or (
            p.name != f"{slug}.yml" and re.sub(LOCALE_RE, "", p.name) == slug
        ):
            files.append(p)
    return files


def base_slugs(directory: Path):
    return sorted(
        p.name[:-4] for p in directory.glob("*.yml") if not re.search(LOCALE_RE, p.name)
    )


def get_stat(text: str, key: str):
    m = re.search(rf"^{key}: (\d+)$", text, re.M)
    return int(m.group(1)) if m else None


def set_stat(text: str, key: str, value: int):
    return re.sub(rf"^{key}: \d+$", f"{key}: {value}", text, count=1, flags=re.M)


def fetch_github_repos():
    """gh CLI 拉全量公开仓库(手动翻页,避免 --paginate 的多 JSON 文档拼接问题)。"""
    repos, page = [], 1
    while True:
        r = subprocess.run(
            ["gh", "api", f"users/{HANDLE}/repos?per_page=100&page={page}"],
            capture_output=True, text=True, timeout=60,
        )
        if r.returncode != 0:
            sys.exit(f"gh api 失败: {r.stderr.strip()[:300]}")
        batch = json.loads(r.stdout)
        repos.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "github-repos.json").write_text(json.dumps(repos, ensure_ascii=False, indent=1))
    return repos


def score(t):
    return t["likes"] * 2 + t["bookmarks"] * 3 + t["reposts"]


def fmt_tweet(t):
    return (
        f"- {t['date_bj'] or t['date'][:10]} | ❤️{t['likes']} 🔖{t['bookmarks']} "
        f"🔁{t['reposts']} 👁{t['views']} | [链接]({t['url']})\n"
        f"  > {t['text'][:200].replace(chr(10), ' / ')}\n"
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-x", action="store_true", help="跳过 X 统计更新,只刷 GitHub")
    args = ap.parse_args()

    now_bj = datetime.now(timezone(timedelta(hours=8)))
    report_lines = [f"# 同步报告 {now_bj.date().isoformat()}(北京时间)", ""]

    # ---------- GitHub ----------
    repos = fetch_github_repos()
    by_name = {r["name"].lower(): r for r in repos}
    print(f"[ok] GitHub 拉到 {len(repos)} 个仓库")

    projects_dir = ROOT / "content" / "projects"
    star_changes, matched_repos = [], set()
    for slug in base_slugs(projects_dir):
        base = (projects_dir / f"{slug}.yml").read_text()
        m = RE_REPO.search(base)
        if not m:
            continue
        repo = by_name.get(m.group(1).lower())
        if not repo:
            continue
        matched_repos.add(repo["name"])
        stars = int(repo["stargazers_count"])
        old_m = re.search(r"^stars: (\d+)$", base, re.M)
        old = int(old_m.group(1)) if old_m else None
        if old == stars:
            continue
        for f in locale_files(projects_dir, slug):
            txt = f.read_text()
            if re.search(r"^stars: \d+$", txt, re.M):
                f.write_text(set_stat(txt, "stars", stars))
        star_changes.append((slug, old, stars))
    print(f"[ok] projects stars 更新 {len(star_changes)} 处")

    if star_changes:
        report_lines += ["## GitHub stars 变动", ""]
        report_lines += [f"- {s}: {o} → {n}" for s, o, n in star_changes]
        report_lines.append("")
    new_repos = [r for r in repos if r["name"] not in matched_repos]
    new_repos.sort(key=lambda r: r.get("pushed_at") or "", reverse=True)
    if new_repos:
        report_lines += ["## GitHub 未收录仓库(候选)", ""]
        for r in new_repos:
            desc = (r.get("description") or "").strip()
            home = f" | 主页: {r['homepage']}" if r.get("homepage") else ""
            report_lines.append(
                f"- **{r['name']}** ⭐{r['stargazers_count']} {'(fork)' if r['fork'] else ''} "
                f"{r.get('language') or ''} push:{(r.get('pushed_at') or '')[:10]}{home}\n"
                f"  {desc}\n  {r['html_url']}\n"
            )
    report_lines.append("")

    # ---------- X ----------
    if not args.no_x:
        data = json.loads((OUT / "x-timeline.json").read_text())
        tweets = {t["id"]: t for t in data["tweets"]}
        print(f"[ok] X 数据 {len(tweets)} 条(抓取于 {data['fetched_at']})")

        highlights_dir = ROOT / "content" / "highlights"
        known_ids, stat_changes, missing = set(), [], []
        for slug in base_slugs(highlights_dir):
            base = (highlights_dir / f"{slug}.yml").read_text()
            m = RE_ID.search(base)
            if not m:
                missing.append((slug, "无 url 字段"))
                continue
            tid = m.group(1)
            known_ids.add(tid)
            t = tweets.get(tid)
            if not t:
                missing.append((slug, "时间线+详情都没覆盖"))
                continue
            diffs = {}
            for k in STAT_FIELDS:
                old = get_stat(base, k)
                if old != t[k]:
                    diffs[k] = (old, t[k])
            if not diffs:
                continue
            for f in locale_files(highlights_dir, slug):
                txt = f.read_text()
                for k, (_, nv) in diffs.items():
                    if re.search(rf"^{k}: \d+$", txt, re.M):
                        txt = set_stat(txt, k, nv)
                    else:
                        print(f"[warn] {f.name} 缺 {k} 字段,未补")
                f.write_text(txt)
            stat_changes.append((slug, diffs))

        print(f"[ok] highlights 统计更新 {len(stat_changes)} 条")

        if stat_changes:
            report_lines += ["## X 统计变动", ""]
            for slug, diffs in stat_changes:
                parts = ", ".join(f"{k} {o}→{n}" for k, (o, n) in diffs.items())
                report_lines.append(f"- {slug}: {parts}")
            report_lines.append("")

        if missing:
            report_lines += ["## 站内帖未刷新(数据没抓到)", ""]
            report_lines += [f"- {s}: {why}" for s, why in missing]
            report_lines.append("")

        candidates = [t for t in tweets.values() if t["id"] not in known_ids and not t["reply_to"]]
        candidates.sort(key=score, reverse=True)
        report_lines += ["## X 新帖候选(按 热度=likes×2+bookmarks×3+reposts 排序)", ""]
        if candidates:
            for t in candidates[:20]:
                report_lines.append(fmt_tweet(t))
        else:
            report_lines.append("(无——时间线内所有原创帖都已收录)")
        report_lines.append("")

        reply_new = [t for t in tweets.values() if t["id"] not in known_ids and t["reply_to"]]
        if reply_new:
            report_lines += ["## 新回复(一般不收录,仅列出)", ""]
            for t in sorted(reply_new, key=score, reverse=True)[:10]:
                report_lines.append(fmt_tweet(t))
            report_lines.append("")

    report_file = OUT / f"report-{now_bj.date().isoformat()}.md"
    report_file.write_text("\n".join(report_lines), encoding="utf-8")
    print(f"[done] 报告 → {report_file.relative_to(ROOT)}")
    print("\n".join(report_lines[:40]))


if __name__ == "__main__":
    main()
