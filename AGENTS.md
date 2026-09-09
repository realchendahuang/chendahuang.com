# 项目说明

```bash
# 开发
pnpm dev

# 检查
pnpm lint
pnpm typecheck
pnpm build

# 部署到 Cloudflare Pages
pnpm deploy

# 确认 Wrangler 登录
pnpm exec wrangler whoami
```

```txt
项目：chendahuang.com
Cloudflare Pages：chendahuang-portfolio
生产域名：https://chendahuang.com
构建目录：dist
```

## 双 D1 架构(内容 + 统计分离)

- **内容库 `chendahuang-content`(绑定 `CONTENT_DB`)**：Nuxt Content 生产运行时库。构建产物 dist 根目录的 `dump.*.sql`(8 个,gzip+base64)是内容快照;worker 的 `POST /__nuxt_content/{collection}/query` 查 D1 时先校验 `_content_info.checksum`,版本不符自动从 dump 重建(自愈)。
- **统计库 `chendahuang-analytics`(绑定 `DB`)**：只存访客统计,与内容无关。
- D1 绑定:Pages 控制台 → Settings → Functions → D1 绑定(Production + Preview)两套都绑:`DB` → analytics,`CONTENT_DB` → content。
- 内容库预热(可选):`pnpm build` → `pnpm run db:seed-content`(解压 dump 逐条 `wrangler d1 execute --remote`;失败不影响站点,运行时自愈兜底)。校验:`wrangler d1 execute chendahuang-content --remote --command 'SELECT name, ready FROM _content_info'`。
- R2 不用于内容查询(D1 足够,R2 无 SQL);将来大图片可挪 R2。

## 访客统计(自建, Cloudflare D1)

- 埋点 POST `/api/track` → 写入 D1 库 `chendahuang-analytics`(Pages worker 运行时执行,不预渲染)。
- 页脚总访问 GET `/api/counter`,内容阅读数 GET `/api/views`,私有看板 GET `/api/stats` + 页面 `/stats`(中文,需 `?k=` Token)。
- D1 绑定:Pages 控制台 → Settings → Functions → D1 绑定,变量名 `DB` → 该库(Production + Preview)。
- 建库/迁移:`pnpm run db:create` → `pnpm run db:migrate`(schema 在 `server/db/schema.sql`)。
- 可选:`STATS_TOKEN` 环境变量锁定 `/stats` 看板(不设=公开)。
- 本地 dev / 未绑定 D1 时全部接口静默降级(页脚自动隐藏),不影响开发。
- 口径:浏览 = 页面加载 + SPA 路由切换;访客 = 会话数(sessionStorage 随机会话 id,免 cookie)。
