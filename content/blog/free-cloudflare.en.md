---
title: How free users can squeeze Cloudflare dry — how much can the free tier actually freeload?
description: Cloudflare's free tier can support an entire personal internet infrastructure: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway, and more.
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

Cloudflare can support almost an entire personal internet infrastructure: domains, websites, CDN, object storage, databases, edge functions, intranet tunneling, email forwarding, captchas, and AI gateways — all startable from the free tier.

## Free DNS

Cloudflare is itself a domain registrar, with fairly transparent registration and renewal pricing. You can also buy a domain on a platform like Spaceship and then host the DNS on Cloudflare.

Once your domain is on Cloudflare, you get a solid DNS management system right away.

The key point: resolution isn't billed by query volume. Unlike some big domestic vendors that are especially shameless — charging by resolution count? That's just ugly.

This makes Cloudflare great for multi-domain, multi-subdomain, small-project matrices.

You can set up:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Buy one domain and assign different subdomains to different services, with no extra charge for DNS resolution itself.

For web traffic that needs proxying, turn on the little orange cloud and let Cloudflare take over proxying, caching, and HTTPS certificates.

## Free CDN

CDN caching is the most awesome thing about Cloudflare. Many people first learn about Cloudflare through it. For blogs, official sites, and documentation sites, the most direct value is:

Faster access, lighter origin server, less bandwidth. Especially if you use a very cheap VPS, putting Cloudflare in front makes the experience much better.

## Free Pages

Pages can host static websites and frontend projects for free.

- Personal blogs
- Product official sites
- Documentation sites
- Landing pages
- Open-source project homepages
- Course material pages
- Waitlist pages
- Download instruction pages
- E-book promo pages

These kinds of pages can be hosted directly, no need to buy a separate server. Once you bind your own domain, it becomes a long-term personal site or project homepage.

## Free Workers

When a website needs an API, authentication, or other dynamic logic, you can use Workers. Code runs on Cloudflare's network, no need to maintain your own server; besides JavaScript / TypeScript, it also supports runtimes like WebAssembly.

The free tier gives you 100,000 requests per day. If a personal project can genuinely sustain that volume, it's not too late to upgrade to the paid tier.

Workers Paid starts at $5 per month.

Many small projects don't need a full backend at all. One Worker is enough.

## Free KV

KV is good for data that needs fast reads but not strong consistency, like config, feature flags, and cached results. It's not a full Redis replacement, but it covers many simple needs in personal projects.

## Free D1

D1 is Cloudflare's hosted SQLite database, good for relational data. The free tier has 5 GB of total storage, plus separate daily read and write quotas.

## Free R2

R2 is S3-API-compatible object storage, good for images, attachments, and backups. Its biggest advantage is that egress from R2 doesn't incur bandwidth fees — costs mainly come from storage volume and operation count; the free tier also has a storage and request quota.

You can use it to store:

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
- Short video clips

## Free Email Routing

Email Routing can forward mail sent to your custom domain to an existing inbox, available on the free tier. Cloudflare also now has Email Sending for sending transactional email via Workers, but sending to arbitrary recipients requires Workers Paid — don't confuse it with free inbound forwarding.

## Free Turnstile

Turnstile is Cloudflare's human verification, which usually doesn't require users to identify traffic lights or distorted characters. Good for:

- Login
- Registration
- Comments
- Contact forms
- Waitlists
- Download pages
- Email subscriptions

## Free Tunnel

If your home NAS, local dev machine, or game server needs external access, you can use Tunnel to build a channel that actively connects from your intranet to Cloudflare.

Your home NAS, local dev machine, and intranet services can be exposed through Cloudflare Tunnel. The core value:

- No public IP needed
- No router port opening
- No exposing the origin server IP
- Can use your own domain

For example:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

This thing is a godsend for home server enthusiasts.

## Free Access

Access can sit in front of backends, test environments, and internal tools, verifying identity before letting anyone through. Email verification codes, Google, GitHub, or team identity sources can all be connected — no need to write a whole registration/login system just for one internal page. For example:

- Only specified emails can enter
- Only Google login can enter
- Only GitHub login can enter
- Only team members can enter

This is very useful for protecting backends, test environments, and internal tools.

## Free AI Gateway

AI Gateway can sit in front of different model providers, uniformly logging requests, latency, errors, and cache hits, and can also do rate limiting and fallback. When building AI products early on, using one entry point to manage multiple compatible APIs saves a lot of trouble.

It can help you see:

- Request volume
- Latency
- Errors
- Cache hits
- Model calls
- Rate limiting
- Fallback

You can put a layer in front of OpenAI, Anthropic, Workers AI, and various compatible APIs.

For early AI products, it's great as a unified entry point.

## Free Browser Run

Cloudflare now calls this capability Browser Run. It can launch a full browser session in the cloud and control the page with code or AI.

Good for:

- Webpage screenshots
- Webpage to Markdown
- Webpage automation testing
- Page content collection
- Dynamic webpage parsing
- Webpage to PDF

There's a daily free quota.

## Free Images Transform

Cloudflare Images has an image transformation quota for scaling, cropping, and format conversion. At high volume you need to account for it separately, or you can run your own transcoding service on paid Workers using Container.

This pairs well with R2:

- R2 stores the originals
- Images does thumbnails and format conversion
- Cloudflare caches and distributes

Good for blog covers, avatars, product images, and article illustrations.

Cloudflare's free tier already covers a lot of personal projects. When you genuinely need higher request volume, compute time, or paid capabilities, start adding from the $5/month Workers Paid.

And here I want to say: Cloudflare, please pay me!!
