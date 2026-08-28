---
title: How free users can squeeze Cloudflare dry — how far does the free tier actually get you?
description: Cloudflare's free tier can carry an entire personal internet infrastructure: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway and more.
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Free tier
  - Deployment
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Originally published on [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare can carry almost an entire personal internet infrastructure: domains, websites, CDN, object storage, databases, edge functions, tunneling, email forwarding, CAPTCHA, and an AI gateway — all of it can start on the free tier.

## Free DNS

Cloudflare is a domain registrar itself, with fairly transparent registration and renewal pricing. You can also buy domains on platforms like Spaceship and move DNS hosting to Cloudflare.

Once your domain is on Cloudflare, you get a solid DNS management system.

The key point: DNS resolution isn't billed per query. Unlike some big domestic providers, which are gross enough to charge by the number of resolution queries — talk about shameless.

Cloudflare is great for multi-domain, multi-subdomain, and small-project matrices.

You can run:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Buy one domain, assign different subdomains to different services, and DNS resolution itself costs nothing extra.

For web traffic that needs proxying, flip on the orange cloud and let Cloudflare handle proxying, caching, and HTTPS certificates.

## Free CDN

CDN caching is the coolest thing Cloudflare has — it's how most people first hear about the company. For blogs, official sites, and docs sites, the value is straightforward:

Faster visits, a lighter origin server, and less bandwidth. Especially if you're on a cheap VPS, putting Cloudflare in front makes a big felt difference.

## Free Pages

Pages can host static sites and frontend projects for free.

- Personal blogs
- Product websites
- Docs sites
- Landing pages
- Open-source project pages
- Course material pages
- Waitlist pages
- Download instruction pages
- Ebook promo pages

These can be hosted directly, no separate server purchase needed. Bind your own domain and it becomes a long-term personal site or project homepage.

## Free Workers

When your site needs APIs, auth, or other dynamic logic, use Workers. Your code runs on Cloudflare's network — no server maintenance on your end. Besides JavaScript/TypeScript, it also supports WebAssembly and other runtimes.

The free tier includes 100k requests per day. If a personal project genuinely outgrows that, upgrade to paid — no rush.

Workers Paid starts at $5/month.

Many small projects don't need a full backend at all. One Worker is enough.

## Free KV

KV fits data that needs fast reads but not strong consistency — config, feature flags, cached results. It's not a full Redis replacement, but it covers a lot of simple needs in personal projects.

## Free D1

D1 is Cloudflare's managed SQLite database, good for relational data. The free tier includes 5 GB of total storage, plus daily read/write quotas.

## Free R2

R2 is an S3-API-compatible object store, good for images, attachments, and backups. Its biggest advantage: no bandwidth fees when serving from R2 — you pay mainly for storage and operations. There's also a free tier with a quota for both.

You can put in it:

- Images
- Attachments
- PDFs
- Course materials
- Software packages
- Backup files
- User avatars
- Markdown images
- Static assets
- Datasets
- Audio files
- Small video assets

## Free Email Routing

Email Routing forwards email sent to your custom domain to an existing mailbox — available on the free tier. Cloudflare also has Email Sending for transactional email via Workers, but sending to arbitrary recipients requires Workers Paid, so don't confuse it with free inbound forwarding.

## Free Turnstile

Turnstile is Cloudflare's human verification, and users usually don't have to identify traffic lights or distorted letters. Good for:

- Login
- Registration
- Comments
- Contact forms
- Waitlists
- Download pages
- Email subscriptions

## Free Tunnel

Want to expose your home NAS, local dev machine, or game server to the internet? Use Tunnel to build a pipe that connects from your internal network out to Cloudflare, actively.

Your NAS, local dev boxes, internal services — can all be exposed through Cloudflare Tunnel. Core value:

- No public IP needed
- No router port forwarding
- No exposing origin IPs
- Can attach your own domain

For example:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

This thing is a godsend for home-server tinkerers.

## Free Access

Access sits in front of admin panels, staging environments, and internal tools, verifying identity before letting people in. Email OTP, Google, GitHub, or team identity providers all work — no need to write another registration/login system just for an internal page. For example:

- Only specific emails get in
- Only Google login gets in
- Only GitHub login gets in
- Only team members get in

This is very handy for protecting backends, staging, and internal tools.

## Free AI Gateway

AI Gateway can sit in front of multiple model providers, uniformly logging requests, latency, errors, and cache hits, plus rate limiting and fallback. When building an AI product early, managing multiple compatible APIs through one entry point saves a lot of hassle.

It lets you observe:

- Request volume
- Latency
- Errors
- Cache hits
- Model calls
- Rate limiting
- Fallback

Whether you're using OpenAI, Anthropic, Workers AI, or assorted compatible APIs, you can wrap one layer in front of them.

For early AI products, it makes a great unified entry point.

## Free Browser Run

Cloudflare now calls this capability Browser Run. It launches full browser sessions in the cloud, controllable via code or AI.

Good for:

- Webpage screenshots
- Webpage to Markdown
- Webpage automation testing
- Page content scraping
- Dynamic page parsing
- Webpage to PDF

There's a daily free quota.

## Free Images Transform

Cloudflare Images has a transformation quota for resizing, cropping, and format conversion. Heavy usage is billed separately, or you can run your own transcoding service on paid Workers with Containers.

Pair it with R2:

- R2 stores originals
- Images makes thumbnails and format conversions
- Cloudflare cache distributes

Good for blog covers, avatars, product images, and article illustrations.

Cloudflare's free quota already covers plenty of personal projects. If you genuinely need higher request volume, compute time, or paid features, upgrade from the $5/month Workers Paid tier and scale up.

And here I want to say: Cloudflare, please wire me the money!!