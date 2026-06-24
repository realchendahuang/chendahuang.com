# 项目协作说明

## 项目概况

- 这是 `chendahuang.com` 的 Nuxt 项目。
- 包管理器使用 `pnpm`。
- Cloudflare Pages 项目名是 `chendahuang-portfolio`。
- 生产域名是 `https://chendahuang.com`。
- 构建输出目录是 `dist`。

## 常用命令

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm deploy
```

## 部署

当前部署方式是 Cloudflare Pages Direct Upload，通过 Wrangler 上传本地构建产物。

部署命令：

```bash
pnpm deploy
```

这个脚本会执行：

```bash
pnpm build
wrangler pages deploy dist --project-name chendahuang-portfolio --branch main
```

如果部署前需要确认 Wrangler 登录状态：

```bash
pnpm exec wrangler whoami
```

## 开发检查

改动完成后，视情况运行：

```bash
pnpm lint
pnpm typecheck
pnpm build
```
