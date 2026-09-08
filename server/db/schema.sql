-- 访客统计:页面浏览埋点表(自建,Cloudflare D1)
-- 建库:pnpm run db:create  |  迁移:pnpm run db:migrate
-- 绑定:Pages 控制台 → Settings → Functions → D1 绑定,变量名 DB → chendahuang-analytics
CREATE TABLE IF NOT EXISTS pageviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,                -- epoch 毫秒(UTC)
  path TEXT NOT NULL,                 -- 规范化内容路径,如 /blog/xxx、/projects、/(17 语言聚合)
  locale TEXT NOT NULL,               -- 页面语言 code(zh/en/...)
  ref_host TEXT NOT NULL DEFAULT '',  -- 站外来源域名,空=直接/站内
  country TEXT NOT NULL DEFAULT '',   -- CF-IPCountry 国家码
  sid TEXT NOT NULL                   -- 会话 id(客户端 sessionStorage 随机),访客数近似口径
);
CREATE INDEX IF NOT EXISTS idx_pageviews_ts ON pageviews(ts);
CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews(path);
CREATE INDEX IF NOT EXISTS idx_pageviews_locale ON pageviews(locale);
