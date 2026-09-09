-- 访客统计:页面浏览埋点表(自建,Cloudflare D1)
-- 建库:pnpm run db:create  |  迁移:pnpm run db:migrate
-- 绑定:wrangler.jsonc 代码化,DB → chendahuang-analytics
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

-- 汇总计数:track 增量 upsert,counter 直读 1 行,免全表扫描(行读数不随总浏览量线性涨)
CREATE TABLE IF NOT EXISTS counters (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);

-- 会话去重:sid 主键,uv 增量口径的载体(首次访问才落行)
CREATE TABLE IF NOT EXISTS sessions (
  sid TEXT PRIMARY KEY,
  ts INTEGER NOT NULL
);

-- 幂等回填:仅当种子缺失时全表扫描一次,之后靠 track 增量维护
INSERT INTO counters (key, value) VALUES ('pv', 0) ON CONFLICT(key) DO NOTHING;
INSERT INTO counters (key, value) VALUES ('uv', 0) ON CONFLICT(key) DO NOTHING;
UPDATE counters SET value = (SELECT COUNT(*) FROM pageviews) WHERE key = 'pv' AND value = 0;
UPDATE counters SET value = (SELECT COUNT(DISTINCT sid) FROM pageviews) WHERE key = 'uv' AND value = 0;
INSERT OR IGNORE INTO sessions (sid, ts) SELECT sid, MIN(ts) FROM pageviews GROUP BY sid;

-- 自检(uptime):worker cron 每小时自测关键路径,保留 90 天
CREATE TABLE IF NOT EXISTS health_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  ok INTEGER NOT NULL,
  details TEXT NOT NULL DEFAULT '[]'
);
