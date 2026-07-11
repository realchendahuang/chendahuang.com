---
title: 免费用户如何榨干 Cloudflare，免费版到底能白嫖到什么程度？
description: Cloudflare 免费版能撑起一整套个人互联网基础设施：DNS、CDN、Pages、Workers、KV、D1、R2、邮箱、Tunnel、AI Gateway 等。
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文发布于 [X Articles](https://x.com/realchendahuang/article/2066528625378443300)。

Cloudflare 差不多能撑起一整套个人互联网基础设施：域名、网站、CDN、对象存储、数据库、边缘函数、内网穿透、邮箱转发、验证码和 AI 网关，都可以从免费版开始用。

## 免费 DNS

Cloudflare 本身也是域名注册商，注册和续费价格比较透明。你也可以在 Spaceship 之类的平台买域名，再把 DNS 托管到 Cloudflare。

域名接进 Cloudflare，你直接拿到一套好用的 DNS 管理系统。

重点是：解析不按查询量收费。不像国内有些大厂特别恶心，竟然按解析次数来收费？吃相不要太难看。

Cloudflare 这就很适合多域名、多子域名、小项目矩阵。

你可以搞：

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

买一个域名，就能给不同服务分配不同的子域名，DNS 解析本身不用另外付费。

需要代理的 Web 流量可以打开小橙云，让 Cloudflare 接管代理、缓存和 HTTPS 证书。

## 免费 CDN

CDN 缓存是 Cloudflare 最屌的东西。很多人都是通过这个知道 Cloudflare 的。对博客、官网、文档站来说，最直接的价值就是：

访问快一点，源站轻一点，带宽省一点。尤其你用很便宜的 VPS，前面挂 Cloudflare，体感会好很多。

## 免费 Pages

Pages 可以免费托管静态网站和前端项目。

- 个人博客
- 产品官网
- 文档站
- 落地页
- 开源项目主页
- 课程资料页
- 等待名单页面
- 下载说明页
- 电子书宣传页

这类页面可以直接托管，不用单独买服务器。绑定自己的域名后，就能当长期维护的个人站或项目主页。

## 免费 Workers

网站需要 API、鉴权或其他动态逻辑时，可以用 Workers。代码跑在 Cloudflare 的网络上，不用自己维护服务器；除了 JavaScript / TypeScript，也支持 WebAssembly 等运行方式。

免费版每天有 10 万次请求额度。个人项目真能稳定跑过这个量，再开付费版也不迟。

Workers Paid 的起步价是每月 5 美元。

很多小项目根本不需要完整后端。一个 Worker 就够了。

## 免费 KV

KV 适合放需要快速读取、但不要求强一致的数据，比如配置、功能开关和缓存结果。它不是完整的 Redis 替代品，但个人项目里很多简单需求够用了。

## 免费 D1

D1 是 Cloudflare 托管的 SQLite 数据库，适合关系型数据。免费版总存储额度是 5 GB，读写还分别有每日额度。

## 免费 R2

R2 是兼容 S3 API 的对象存储，适合放图片、附件和备份。它最大的优势是直接从 R2 出站不收带宽费，费用主要看存储量和操作次数；免费版也有一档存储和请求额度。

你可以拿它放：

- 图片
- 附件
- PDF
- 课程资料
- 软件包
- 备份文件
- 用户头像
- Markdown 图片
- 静态资源
- 数据集
- 音频文件
- 小视频素材

## 免费 Email Routing

Email Routing 可以把发到自定义域名的邮件转发到现有邮箱，免费版就能用。Cloudflare 现在也有通过 Workers 发事务邮件的 Email Sending，但给任意收件人发信需要 Workers Paid，不能和免费的收件转发混为一谈。

## 免费 Turnstile

Turnstile 是 Cloudflare 的人机验证，通常不用让用户识别红绿灯或扭曲字符。适合放在：

- 登录
- 注册
- 评论
- 联系表单
- 等待名单
- 下载页
- 邮件订阅

## 免费 Tunnel

家里的 NAS、本地开发机或游戏服务器想给外网访问，可以用 Tunnel 建一条从内网主动连到 Cloudflare 的通道。

你家里的 NAS、本地开发机、内网服务，可以通过 Cloudflare Tunnel 暴露出来。核心价值：

- 不用公网 IP
- 不用路由器开端口
- 不用暴露源站 IP
- 可以挂自己的域名

比如：

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

这玩意对家庭服务器玩家太香了。

## 免费 Access

Access 可以挡在后台、测试环境和内部工具前面，先验证身份再放行。邮箱验证码、Google、GitHub 或团队身份源都能接，不必为了一个内部页面再写一套注册登录。比如：

- 只有指定邮箱能进
- 只有 Google 登录能进
- 只有 GitHub 登录能进
- 只有团队成员能进

这对保护后台、测试环境、内部工具非常好用。

## 免费 AI Gateway

AI Gateway 可以放在不同模型供应商前面，统一记录请求、延迟、错误和缓存命中，也能做限速与 fallback。早期做 AI 产品时，用一个入口管理多家兼容 API 会省不少事。

它可以帮你看：

- 请求量
- 延迟
- 错误
- 缓存命中
- 模型调用
- 限速
- fallback

你接 OpenAI、Anthropic、Workers AI、各种兼容 API，都可以在前面套一层。

早期做 AI 产品，很适合拿它当统一入口。

## 免费 Browser Run

Cloudflare 现在把这项能力叫 Browser Run。它能在云端启动完整浏览器会话，用代码或 AI 控制页面。

适合：

- 网页截图
- 网页转 Markdown
- 网页自动化测试
- 页面内容采集
- 动态网页解析
- 网页转 PDF

每天有免费额度。

## 免费 Images Transform

Cloudflare Images 有图片转换额度，可以缩放、裁切和转换格式。用量大时要单独算账，也可以在付费 Workers 上用 Container 自己跑转码服务。

这可以搭配 R2 玩：

- R2 放原图
- Images 做缩略图和格式转换
- Cloudflare 缓存分发

适合博客封面、头像、商品图、文章插图。

Cloudflare 的免费额度已经能覆盖不少个人项目。真用到更高的请求量、计算时间或付费能力，再从每月 5 美元的 Workers Paid 开始往上加。

在这里我想说，Cloudflare，请打钱！！
