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

## 访客统计(自建, Cloudflare D1)

- 埋点 POST `/api/track` → 写入 D1 库 `chendahuang-analytics`(Pages worker 运行时执行,不预渲染)。
- 页脚总访问 GET `/api/counter`,内容阅读数 GET `/api/views`,私有看板 GET `/api/stats` + 页面 `/stats`(中文,需 `?k=` Token)。
- D1 绑定:Pages 控制台 → Settings → Functions → D1 绑定,变量名 `DB` → 该库(Production + Preview)。
- 建库/迁移:`pnpm run db:create` → `pnpm run db:migrate`(schema 在 `server/db/schema.sql`)。
- 可选:`STATS_TOKEN` 环境变量锁定 `/stats` 看板(不设=公开)。
- 本地 dev / 未绑定 D1 时全部接口静默降级(页脚自动隐藏),不影响开发。
- 口径:浏览 = 页面加载 + SPA 路由切换;访客 = 会话数(sessionStorage 随机会话 id,免 cookie)。
