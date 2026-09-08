---
title: 我把機場訂閱聚合搬到了 Cloudflare 上
description: 多個機場加自建節點合成一條訂閱，分流規則在伺服器端配好，用戶端只管訂閱。
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - 翻牆
  - 開源專案
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

我用機場有三四年了，中間也自己搭過 VPS 節點。一直有個挺煩人的事：手上三五條訂閱，加上自己搭的幾台，分散在用戶端裡要一條條加，分流規則每個用戶端又得重配一遍。換設備、換用戶端、幫家人裝一次，就再來一遍。

後來我想，訂閱這件事沒必要在用戶端裡散著管。把它收攏成一條連結，規則在伺服器端定死，用戶端只管訂閱，事情就清爽了。Sub-Store 那套思路我之前就用，但它跑在自己的伺服器上，我嫌維護麻煩。所以這次自己寫了一個跑在 Cloudflare 上的版本，叫 sub-store-cloudflare，開源在 [GitHub](https://github.com/realchendahuang/sub-store-cloudflare)。

## 它其實就只做一件事

把多個訂閱來源合成一條訂閱。

具體說，你可以往裡面塞幾樣東西：

- 幾個機場的訂閱連結
- 自己 VPS 上的節點文字（vless、trojan、ss、vmess 都行）
- 臨時貼一段節點進來也行

這些進站後 Worker 會去拉取、去重，按你給的規則篩一遍，再按需要改名、補國旗、解析網域。出來之後塞進一個組合訂閱裡，用戶端訂閱這一條就夠了。

規則這塊我放進了伺服器端。內建了幾個常用的 Mihomo 模板，acl4ssr、loyalsoldier 白名單黑名單、ai-streaming 之類的，分流組、規則集都在雲端配好。你把訂閱丟進 mihomo / clash、surge、sing-box、shadowrocket 這些用戶端，下載下來就是帶好分流規則的成品，那邊不用再手動寫規則、維護規則集 URL。

## 為什麼非要放 Cloudflare 上

原因很實在：

- **不用伺服器。** Workers + D1，免費額度對個人夠用，伺服器錢和維護都省了。
- **workers.dev 那個網域本身就在牆外。** 你用戶端連過去抓訂閱這一步是通的，不存在「伺服器在境外、節點拉訂閱還要梯子」這種套娃。
- **部署完就是 Web 管理介面加一個下載端點。** 手機換用戶端也能開網頁改設定。

技術棧我刻意保持小：Worker + Static Assets + D1 + Worker Secrets。KV、R2、Durable Objects、Queue、Cron 都不在核心路徑裡，能少一樣是一樣。

## 部署特意做了兩條路

第一條是給想用的人：點倉庫裡的 Deploy to Cloudflare 按鈕，Cloudflare 自己拉倉庫、建 Worker、建 D1、問你要兩個 token，部署完給你一個帶 token 的管理連結。一步一步來，不用碰命令列。

第二條是給我自己也給愛折騰的人：AI Agent 一鍵安裝。

倉庫裡帶了 agent 協定（AGENTS.md + agent 裡的 SKILL）。你把訂閱來源、要做的組合訂閱、想用的規則模板寫進一個本機設定檔，跑 `pnpm run install:cloudflare`，agent 會替你檢查 Cloudflare 登入、建資料庫、寫 secret、遷移、部署、匯入設定、驗證連結，最後把管理連結和下載連結交到你手上。

我自己就是用這條路上線的，所以更推薦這條，省心。給 Codex / Claude Code 用的時候，直接複製倉庫裡 `agent/install.prompt.md` 那段提示詞就行。

## 適合誰

直說：手裡不只一個機場、再加上自己搭的幾個節點、想把它們合成一條訂閱自用的，就是這個專案的目標族群。你就一個機場湊合著用，那真的沒必要用這個。

程式碼全開源，AGPL。前端的互動思路致敬了原版 Sub-Store，原版跑在容器裡、覆蓋更多用戶端生態，我做的是更小的 Cloudflare-native 形態，方便自己改也方便直接部署，不是逐項複刻。

有興趣的可以去倉庫翻翻，README 寫得滿齊全，照著部署就行。