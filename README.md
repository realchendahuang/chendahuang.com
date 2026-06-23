# chendahuang.com

陈大黄的个人站。放我的 Playbook、Agent Skill 和折腾记录。

## 技术栈

- [Nuxt](https://nuxt.com) + [Nuxt UI](https://ui.nuxt.com)
- [Nuxt Content](https://content.nuxt.com)（内容用 YAML + Markdown 管理）
- 部署在 Cloudflare Pages

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000

## 构建

```bash
pnpm build
pnpm preview
```

## 目录结构

- `app/pages/` — 页面（首页、Playbook、Skill、博客、关于）
- `app/components/landing/` — 首页区块组件
- `content/` — 站点内容，YAML 和 Markdown
- `public/` — 静态资源（头像等）
