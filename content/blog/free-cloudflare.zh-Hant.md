---
title: 免費使用者如何榨乾 Cloudflare，免費版到底能白嫖到什麼程度？
description: Cloudflare 免費版能撐起一整套個人網路基礎設施：DNS、CDN、Pages、Workers、KV、D1、R2、信箱、Tunnel、AI 閘道等。
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - 免費額度
  - 部署
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文發布於 [X Articles](https://x.com/realchendahuang/article/2066528625378443300)。

Cloudflare 差不多能撐起一整套個人網路基礎設施：網域、網站、CDN、物件儲存、資料庫、邊緣函式、內網穿透、信箱轉寄、人機驗證和 AI 閘道，都可以從免費版開始用。

## 免費 DNS

Cloudflare 本身也是網域註冊商，註冊和續費價格都滿透明。你也可以在 Spaceship 之類的平台買網域，再把 DNS 代管到 Cloudflare。

網域接進 Cloudflare，你直接拿到一套好用的 DNS 管理系統。

重點是：解析不按查詢量計費。不像中國有些大型服務商特別噁心，竟然按解析次數來收費？吃相也別太難看。

Cloudflare 這就很適合多網域、多子網域、小專案矩陣。

你可以搞：

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

買一個網域，就能給不同服務分配不同的子網域，DNS 解析本身不用另外付費。

需要代理的 Web 流量可以打開小橙雲，讓 Cloudflare 接管代理、快取和 HTTPS 憑證。

## 免費 CDN

CDN 快取是 Cloudflare 最猛的東西。很多人都是透過這個認識 Cloudflare 的。對部落格、官網、文件站來說，最直接的價值就是：

訪客看得快一點，源站輕一點，頻寬省一點。尤其你用很便宜的 VPS，前面掛 Cloudflare，體感會好很多。

## 免費 Pages

Pages 可以免費代管靜態網站和前端專案。

- 個人部落格
- 產品官網
- 文件站
- 落地頁
- 開源專案首頁
- 課程資料頁
- 等待名單頁面
- 下載說明頁
- 電子書宣傳頁

這類頁面可以直接代管，不用另外買伺服器。綁定自己的網域後，就能當長期維護的個人站或專案首頁。

## 免費 Workers

網站需要 API、認證或其他動態邏輯時，可以用 Workers。程式碼跑在 Cloudflare 的網路上，不用自己維護伺服器；除了 JavaScript / TypeScript，也支援 WebAssembly 等執行方式。

免費版每天有 10 萬次請求額度。個人專案真的能穩定跑過這個量，再開付費版也不遲。

Workers Paid 的起價是每月 5 美元。

很多小專案根本不需要完整後端。一個 Worker 就夠了。

## 免費 KV

KV 適合放需要快速讀取、但不要求強一致性的資料，例如設定、功能開關和快取結果。它不是完整的 Redis 替代品，但個人專案裡很多簡單需求夠用了。

## 免費 D1

D1 是 Cloudflare 代管的 SQLite 資料庫，適合關聯式資料。免費版總儲存額度是 5 GB，讀寫還分別有每日額度。

## 免費 R2

R2 是相容 S3 API 的物件儲存，適合放圖片、附件和備份。它最大的優勢是從 R2 出站不收頻寬費，費用主要看儲存量和操作次數；免費版也有一檔儲存和請求額度。

你可以拿它放：

- 圖片
- 附件
- PDF
- 課程資料
- 軟體套件
- 備份檔案
- 使用者頭像
- Markdown 圖片
- 靜態資源
- 資料集
- 音訊檔案
- 小影片素材

## 免費 Email Routing

Email Routing 可以把寄到自訂網域的郵件轉寄到現有的信箱，免費版就能用。Cloudflare 現在也有透過 Workers 寄交易郵件的 Email Sending，但要寄信給任意收件人需要 Workers Paid，不能和免費的收件轉寄混為一談。

## 免費 Turnstile

Turnstile 是 Cloudflare 的人機驗證，通常不用讓使用者辨識紅綠燈或扭曲字元。適合放在：

- 登入
- 註冊
- 留言
- 聯絡表單
- 等待名單
- 下載頁
- 電子報訂閱

## 免費 Tunnel

家裡的 NAS、本機開發機或遊戲伺服器想給外部網路存取，可以用 Tunnel 建一條從內網主動連到 Cloudflare 的通道。

你家的 NAS、本機開發機、內網服務，都可以透過 Cloudflare Tunnel 對外暴露。核心價值：

- 不需要公網 IP
- 不用在路由器開通訊埠
- 不用暴露源站 IP
- 可以掛自己的網域

例如：

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

這玩意對家庭伺服器玩家來說太香了。

## 免費 Access

Access 可以擋在後台、測試環境和內部工具前面，先驗證身分再放行。信箱驗證碼、Google、GitHub 或團隊身分來源都能接，不必為了單一內部頁面再寫一套註冊登入。例如：

- 只有指定信箱能進
- 只有 Google 登入能進
- 只有 GitHub 登入能進
- 只有團隊成員能進

這對保護後台、測試環境、內部工具非常好用。

## 免費 AI Gateway

AI Gateway 可以放在不同模型供應商前面，統一記錄請求、延遲、錯誤和快取命中，也能做限速與 fallback。早期做 AI 產品時，用一個入口管理多家相容 API 會省不少事。

它可以幫你看：

- 請求量
- 延遲
- 錯誤
- 快取命中
- 模型呼叫
- 限速
- fallback

你接 OpenAI、Anthropic、Workers AI、各種相容 API，都可以在前面套一層。

早期做 AI 產品，很適合拿它當統一入口。

## 免費 Browser Run

Cloudflare 現在把這項能力叫作 Browser Run。它能在雲端啟動完整的瀏覽器工作階段，用程式碼或 AI 控制頁面。

適合：

- 網頁截圖
- 網頁轉 Markdown
- 網頁自動化測試
- 頁面內容採集
- 動態網頁解析
- 網頁轉 PDF

每天有免費額度。

## 免費 Images Transform

Cloudflare Images 有圖片轉換額度，可以縮放、裁切和轉換格式。用量大的話要另外計費，也可以在付費 Workers 上用 Container 自己跑轉碼服務。

這可以搭配 R2 玩：

- R2 放原圖
- Images 做縮圖和格式轉換
- Cloudflare 快取分發

適合部落格封面、頭像、商品圖、文章插圖。

Cloudflare 的免費額度已經能覆蓋不少個人專案。真的用到更高的請求量、運算時間或付費功能，再從每月 5 美元的 Workers Paid 開始往上加。

在這裡我想說，Cloudflare，快斗內！！