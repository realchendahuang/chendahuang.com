# Agent Notes

## Project

- Nuxt site for `chendahuang.com`.
- Package manager: `pnpm`.
- Cloudflare Pages project: `chendahuang-portfolio`.
- Production domain: `https://chendahuang.com`.
- Build output: `dist`.

## Common Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm deploy
```

## Deploy

This project uses Cloudflare Pages Direct Upload, not GitHub Actions.

Deploy with:

```bash
pnpm deploy
```

That runs:

```bash
pnpm build
wrangler pages deploy dist --project-name chendahuang-portfolio --branch main
```

Before deploying, make sure Wrangler is logged in:

```bash
pnpm exec wrangler whoami
```

## Notes For Future Agents

- Do not add `.github/workflows` for deployment; Cloudflare Pages is deployed directly with Wrangler.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before committing meaningful code changes when practical.
- If the user asks to deploy, use `pnpm deploy` from the repo root.
