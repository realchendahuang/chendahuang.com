# 项目说明

```bash
# 开发
pnpm dev

# 检查
pnpm lint
pnpm typecheck
pnpm build

# 部署到 Cloudflare Workers(静态资产 + module worker)
pnpm deploy

# 本地以 Workers 形态预览(含 D1 本地模拟)
pnpm preview

# 确认 Wrangler 登录
pnpm exec wrangler whoami
```

```txt
项目：chendahuang.com
Cloudflare Worker：chendahuang(自定义域 chendahuang.com)
构建产物：.output(nitro preset cloudflare_module → .output/public 静态资产 + .output/server worker)
部署配置：wrangler.jsonc(assets + D1 绑定 + 域名,代码化)
```

## 双 D1 架构(内容 + 统计分离)

- **内容库 `chendahuang-content`(绑定 `CONTENT_DB`)**：Nuxt Content 生产运行时库。构建产物 .output/public 根目录的 `dump.*.sql`(8 个,gzip+base64)是内容快照;worker 的 `POST /__nuxt_content/{collection}/query` 查 D1 时先校验 `_content_info.checksum`,版本不符自动从 dump 重建(自愈)。
- **统计库 `chendahuang-analytics`(绑定 `DB`)**：只存访客统计,与内容无关。
- D1 绑定在 `wrangler.jsonc` 代码化(Workers 部署即生效),不再走控制台手绑。
- 内容库预热(可选):`pnpm build` → `pnpm run db:seed-content`(解压 dump 逐条 `wrangler d1 execute --remote`;失败不影响站点,运行时自愈兜底)。校验:`wrangler d1 execute chendahuang-content --remote --command 'SELECT name, ready FROM _content_info'`。
- R2 不用于内容查询(D1 足够,R2 无 SQL);将来大图片可挪 R2。

## 访客统计(自建, Cloudflare D1)

- 埋点 POST `/api/track` → 写入 D1 库 `chendahuang-analytics`(worker 运行时执行,不预渲染)。
- 页脚总访问 GET `/api/counter`,内容阅读数 GET `/api/views`,私有看板 GET `/api/stats` + 页面 `/stats`(中文,需 `?k=` Token)。
- 建库/迁移:`pnpm run db:create` → `pnpm run db:migrate`(schema 在 `server/db/schema.sql`)。
- 可选:`STATS_TOKEN` 环境变量锁定 `/stats` 看板(不设=公开)。
- 本地 dev / 未绑定 D1 时全部接口静默降级(页脚自动隐藏),不影响开发。
- 口径:浏览 = 页面加载 + SPA 路由切换;访客 = 会话数(sessionStorage 随机会话 id,免 cookie)。

## 历史

- 2026-09-09 从 Cloudflare Pages 项目 `chendahuang-portfolio` 全量迁移到 Worker `chendahuang`(域名当日切换,Pages 项目保留作回滚,确认稳定后可 `wrangler pages project delete chendahuang-portfolio` 删除)。
