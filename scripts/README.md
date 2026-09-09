# 内容同步脚本(GitHub + X → 站点)

把 @realchendahuang 的 GitHub 仓库和 X 帖子数据同步进 `content/projects/` 与 `content/highlights/`。
统计数字(likes/bookmarks/reposts/views/stars)全自动更新;**新内容的撰写与 17 语言翻译仍走 AI 会话**(见下)。

## 一键流程

```bash
# 1. 抓 X 数据(驱动本机 Chrome,需已登录 x.com;WebBridge daemon 不在会自动拉起)
python3 scripts/sync_x.py --pages 10

# 2. 更新统计 + 出报告(gh CLI 需已登录 realchendahuang)
python3 scripts/sync_stats.py

# 3. 看报告:新帖候选 / 新仓库 / 统计变动
open scripts/out/report-$(date +%F).md
```

- `scripts/out/` 已 gitignore,是临时数据区。
- 只刷 GitHub 不动 X:`python3 scripts/sync_stats.py --no-x`
- 正则只替换 `likes:`/`bookmarks:`/`reposts:`/`views:`/`stars:` 数字行,不重排 YAML,diff 干净。

## sync_x.py 做了什么

1. WebBridge(`127.0.0.1:10086`)驱动真实 Chrome 打开 `x.com/realchendahuang`;
2. `network` 抓当前 `UserOriginalsTimeline` GraphQL 完整 URL——**queryId 会变,必须现抓,不能硬编码**;
3. 页面内 `XMLHttpRequest` 分页(fetch 的 Response 流会被扩展代理读走,必须 XHR;
   **裸 XHR 会被 403,必须带网页版同款认证头**: Bearer + `x-csrf-token`(ct0 cookie) + `x-twitter-auth-type: OAuth2Session`,已固化在脚本里);
   每次 evaluate 只抓一页、游标由脚本传递(daemon 对长耗时 evaluate 会 502);
4. 站内已有、但时间线没翻到的旧帖,用状态页的 `TweetDetail` 补数据——
   它是会话版查询:变量叫 `focalTweetId`,响应在 `data.threaded_conversation_with_injections_v2`(脚本已兼容);
5. 长帖全文从 `note_tweet.note_tweet_results` 取(`legacy.full_text` 是截断版);
6. 产出 `scripts/out/x-timeline.json`(含北京时间 `date_bj`)。

## 新内容收录(需要 AI 会话,脚本不覆盖)

报告里的"新帖候选"按 `likes×2+bookmarks×3+reposts` 热度排序,挑选后:

1. **核对全文**:时间线 API 的文本可能截断,打开单帖页取 `[data-testid="tweetText"]` 全文;
2. 写 `content/highlights/<slug>.yml`:category/title/description/date(UTC→北京 +8h)/stats/url/content;
   正文删 t.co 短链、保留真实链接行;projects 无图时省略 image 字段;
3. 先精写 zh 与 en(逐篇精译,不走子代理),再批量生成其余 15 语言(zh-Hant/ar/de/es/fa/fr/hi/id/ja/ko/pl/pt/ru/tr/vi),抽查;
4. 校验:各语言字段/日期/统计/url 一致,真实链接行全语言都在;
5. `pnpm lint && pnpm build` 后 commit + push + `pnpm deploy`。

## 故障

- **抓不到 GraphQL URL**:确认 Chrome 已开且 x.com 已登录;WebBridge 扩展异常时看 `~/.kimi-webbridge/bin/kimi-webbridge status`。
- **XHR 403/空响应**:登录态失效(ct0 cookie 没了),浏览器里手动刷一下 x.com 再跑。
- **HTTP 502**:daemon 对超长 evaluate 会超时,脚本已按单页/小批量拆分;若仍出现,重跑即可。
- **旧帖 stats 没更新**:加大 `--pages`;仍不行说明单帖接口也没返回,报告会列在"站内帖未刷新"。
