---
title: 我把机场订阅聚合搬到了 Cloudflare 上
description: 多个机场加自建节点揉成一条订阅，分流规则在服务端配好，客户端只管订阅。
date: 2026-06-28
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

我用机场有三四年了，中间也自己搭过 VPS 节点。一直有个挺烦人的事：手里三五条订阅，加上自己搭的几台，分散在客户端里要一条条加，分流规则每个客户端又得重配一遍。换设备、换客户端、给家里人装一次，就再来一遍。

后来我想，订阅这件事没必要在客户端散着管。把它收拢成一条链接，规则在服务端定死，客户端只管订阅，事情就清爽了。Sub-Store 那套思路我之前就用，但它跑在自己服务器上，我嫌养护麻烦。所以这次自己写了个跑在 Cloudflare 上的版本，叫 sub-store-cloudflare，开源在 [GitHub](https://github.com/realchendahuang/sub-store-cloudflare)。

## 它其实就干一件事

把多个订阅源揉成一条订阅。

具体说，你可以往里面塞几样东西：

- 几个机场的订阅链接
- 自己 VPS 上的节点文本（vless、trojan、ss、vmess 都行）
- 临时粘一段节点进来也行

这些进站后 Worker 会去拉、去重，按你给的规则筛一遍，再按需要改名、补国旗、解析域名。出来之后塞进一个组合订阅里，客户端订阅这一条就够了。

规则这块我放进了服务端。内置了几个常用的 Mihomo 模板，acl4ssr、loyalsoldier 白名单黑名单、ai-streaming 之类的，分流组、规则集都在云端配好。你把订阅丢进 mihomo / clash、surge、sing-box、shadowrocket 这些客户端，下载下来就是带好分流规则的成品，那边不用再手动写规则、维护规则集 URL。

## 为什么非要放 Cloudflare 上

原因很实在：

- **不要服务器。** Workers + D1，免费额度对个人够用，服务器钱和养护都省了。
- **workers.dev 那个域名本身就在墙外。** 你客户端连过去抓订阅这一步是通的，不存在“服务器在境外、节点拉订阅还要梯子”这种套娃。
- **部署完就是 Web 管理界面加一个下载端点。** 手机换客户端也能开网页改配置。

技术栈我刻意保持小：Worker + Static Assets + D1 + Worker Secrets。KV、R2、Durable Objects、Queue、Cron 都不在核心路径里，能少一样少一样。

## 部署特意做了两条路

第一条是给想用的人：点仓库里的 Deploy to Cloudflare 按钮，Cloudflare 自己拉仓库、建 Worker、建 D1、问你要两个 token，部署完给你一个带 token 的管理链接。一步步来，不用碰命令行。

第二条是给我自己也给爱折腾的人：AI Agent 一键装。

仓库里带了 agent 协议（AGENTS.md + agent 里的 SKILL）。你把订阅源、要做的组合订阅、想用的规则模板写进一个本地配置文件，跑 `pnpm run install:cloudflare`，agent 会替你检查 Cloudflare 登录、建库、写 secret、迁移、部署、导入配置、验证链接，最后把管理链接和下载链接交到你手上。

我自己就是用这条路上的线，所以更推荐这条，省心。给 Codex / Claude Code 用的时候，直接复制仓库里 `agent/install.prompt.md` 那段提示词就行。

## 适合谁

直说：手里不止一个机场、再加上自己搭的几个节点、想合成一条订阅自用的，就是这个项目的目标人群。你就一个机场将就用，那真没必要上这个。

代码全开源，AGPL。前端的交互思路致敬了原版 Sub-Store，原版跑在容器里、覆盖更多客户端生态，我做的是更小的 Cloudflare-native 形态，方便自己改也方便直接部署，不是逐项复刻。

感兴趣的可以去仓库翻翻，README 写得挺全，照着部署就行。