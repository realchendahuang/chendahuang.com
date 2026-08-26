---
title: I moved my airport subscription aggregation to Cloudflare
description: Merge multiple airports and self-hosted nodes into one subscription, with routing rules configured server-side and clients only needing to subscribe.
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

I've been using airports for three or four years, and in between I've also set up my own VPS nodes. There's always been one annoying thing: with three or five subscriptions in hand, plus a few self-hosted ones, they're scattered across clients and have to be added one by one, and the routing rules have to be reconfigured in every client. Switch devices, switch clients, set it up for a family member — and you do it all over again.

Later I thought, subscription management doesn't need to be scattered across clients. Consolidate it into one link, fix the rules server-side, and clients only need to subscribe — that cleans things up. I'd used the Sub-Store approach before, but it runs on my own server, and I found the maintenance annoying. So this time I wrote my own version that runs on Cloudflare, called sub-store-cloudflare, open-sourced on [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## It really only does one thing

Merge multiple subscription sources into one subscription.

Specifically, you can stuff several things into it:

- Subscription links from several airports
- Node text from your own VPS (vless, trojan, ss, vmess all work)
- Temporarily paste in a node segment too

After these come in, the Worker fetches and deduplicates them, filters them by your rules, then renames, adds flags, and resolves domains as needed. The output goes into a combined subscription, and the client only needs to subscribe to this one link.

I put the rules on the server side. It has several common Mihomo templates built in — acl4ssr, loyalsoldier whitelist/blacklist, ai-streaming, and the like — with routing groups and rule sets all configured in the cloud. Drop the subscription into clients like mihomo / clash, surge, sing-box, or shadowrocket, and what you download is a finished product with routing rules already in place, no need to manually write rules or maintain rule-set URLs on that side.

## Why it has to be on Cloudflare

The reasons are very practical:

- **No server needed.** Workers + D1, the free tier is enough for personal use, saving both server cost and maintenance.
- **The workers.dev domain itself is outside the wall.** The step where your client connects to fetch the subscription works, so there's no "server is overseas, and fetching the subscription still needs a ladder" nesting problem.
- **Once deployed, it's a web management interface plus a download endpoint.** You can open the web page to change config even when switching clients on your phone.

I deliberately kept the tech stack small: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, and Cron are all outside the core path — the fewer, the better.

## I deliberately built two deployment paths

The first is for people who just want to use it: click the Deploy to Cloudflare button in the repo, and Cloudflare pulls the repo, creates the Worker, creates D1, asks you for two tokens, and after deployment gives you a management link with a token. Step by step, no command line needed.

The second is for me and for people who like to tinker: one-click install via an AI Agent.

The repo ships with an agent protocol (AGENTS.md + a SKILL inside agent). You write the subscription sources, the combined subscriptions you want, and the rule templates you want to use into a local config file, run `pnpm run install:cloudflare`, and the agent checks your Cloudflare login, creates the database, writes secrets, migrates, deploys, imports config, and verifies the link — finally handing you the management link and download link.

I use this path myself, so I recommend it more — it's hassle-free. When using it with Codex / Claude Code, just copy the prompt in `agent/install.prompt.md` from the repo.

## Who it's for

To be blunt: people with more than one airport, plus a few self-hosted nodes, who want to merge them into one subscription for personal use — that's the target audience. If you have just one airport and it works fine, there's really no need for this.

The code is fully open source, AGPL. The frontend interaction approach pays homage to the original Sub-Store, which runs in a container and covers a broader client ecosystem. What I built is a smaller Cloudflare-native form, convenient to modify and deploy directly, not an item-by-item replica.

If you're interested, go browse the repo — the README is quite complete, just follow it to deploy.
