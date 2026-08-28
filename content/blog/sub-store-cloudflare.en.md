---
title: I moved my proxy subscription aggregation to Cloudflare
description: Merge multiple proxy services plus your own nodes into one single subscription, with routing rules configured server-side — clients just subscribe.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Circumvention
  - Open-source project
minRead: 4
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

I've used proxy services for three or four years now, and at times I've run my own VPS nodes. There's always been one annoying thing: three or five subscriptions plus a few self-hosted boxes scattered in the client, added one by one, with routing rules having to be reconfigured in every single client. New device, new client, or setting someone in the family up — and you go through the whole ritual again.

Then I thought: there's no reason to manage subscriptions separately inside clients. Pull them all into one link, define the rules server-side, and let the client simply subscribe — clean. I'd used Sub-Store's approach before, but it ran on your own server and I found maintenance a hassle. So this time I wrote a Cloudflare-hosted version myself, called sub-store-cloudflare, open-sourced on [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## It really just does one thing

Merges multiple subscription sources into one subscription.

Concretely, you can throw a few things into it:

- Subscription links from several proxy services
- Node text from your own VPS (vless, trojan, ss, vmess — all fine)
- Even paste in a temporary chunk of nodes

Once inside, the Worker fetches and de-duplicates them, filters according to the rules you give it, then renames, adds flags, and resolves domains as needed. Everything comes out merged into one combined subscription — clients subscribe to that single link and done.

Rules live on the server side. It ships with a few common Mihomo templates — acl4ssr, Loyalsoldier's whitelist/blacklist, ai-streaming and the like — with routing groups and rule sets all configured in the cloud. Feed the subscription into clients like mihomo/clash, surge, sing-box, shadowrocket, and what downloads is a finished subscription with routing rules already built in — no manual rule-writing or rule-set URL maintenance on that end.

## Why Cloudflare specifically

Pragmatic reasons:

- **No server.** Workers + D1, and the free quota is enough for personal use — saves both server money and upkeep.
- **The workers.dev domain is itself outside the wall.** Your client connecting to fetch the subscription works out of the box — no "server is abroad but the node still needs a ladder to pull its own subscription" nesting-doll nonsense.
- **Once deployed, it's a web admin panel plus a download endpoint.** Switch clients on your phone and you can still open a web page to change config.

I deliberately kept the stack small: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron are all off the critical path — the fewer, the better.

## Two deployment paths, on purpose

The first is for people who just want to use it: click the Deploy to Cloudflare button in the repo. Cloudflare pulls the repo, creates the Worker and D1, asks you for two tokens, and hands you a management link with a token when done. Step by step, no command line.

The second is for me and for people who like tinkering: one-click install with an AI agent.

The repo ships an agent protocol (AGENTS.md + a SKILL inside the agent). You write your subscription sources, the combined subscriptions you want, and the rule templates into a local config file, run `pnpm run install:cloudflare`, and the agent checks your Cloudflare login, creates the database, writes secrets, migrates, deploys, imports config, verifies the links, and finally hands you the management link and download link.

I deployed my own link exactly this way, so I recommend this route — less fuss. When using it with Codex / Claude Code, just copy the prompt from `agent/install.prompt.md` in the repo.

## Who it's for

Straight talk: if you have more than one proxy service plus a few self-hosted nodes and want them merged into a single subscription for your own use — this is your project. If you're happily getting by with just one service, you really don't need this.

Code is fully open source, AGPL. The frontend interaction is a nod to the original Sub-Store; the original runs in a container and covers a wider client ecosystem. Mine is a leaner Cloudflare-native form — easier to modify and deploy directly, not a line-by-line clone.

Interested people can browse the repo — the README is fairly complete, just follow the deployment steps.