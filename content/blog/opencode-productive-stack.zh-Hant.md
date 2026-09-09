---
title: 穩定、快速、高產、便宜：我的 AI Coding 全家桶實錄
description: "OpenCode + OpenChamber + 兩份 DeepSeek V4 Flash 訂閱，15 個項目同時跑代碼，額度只掉一點點。這篇文章攤開我的完整配置：上下文剪枝、分層記憶、桌面自動化，以及「原湯化原食」的選型教訓。"
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - AI 程式設計
  - 配置
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 核心觀點首發於 [X](https://x.com/realchendahuang/status/2086611065920733305)，這篇文章是完整版配置實錄。

先說結論：**OpenCode + OpenChamber + OpenCode Go 的 DeepSeek V4 Flash 訂閱 + Ollama Cloud 的 DeepSeek V4 Flash 訂閱。**

這套組合我長期高強度使用，四個字：穩、快、產、省。連續開了 15 個項目同時在跑代碼，額度只消耗了一點點。

## 為什麼是 OpenCode + OpenChamber

選型過程在[另一篇文章](/blog/agent-harness-selection)裡寫過，這裡只說結果層面的原因：OpenCode 是目前最均衡的多模型內核——開源、Provider 多、Client/Server、桌面端、Subagent 都成熟；OpenChamber 則是我用過的開源項目裡前端打磨得最好的 Harness GUI，作者維護得極其用心，精緻、穩定，偶爾的小毛病完全不影響長期使用。

Web 介面 + PWA，跟桌面客戶端幾乎沒有區別，更新還免手動。

## 配置圍繞三個核心訴求

我的 OpenCode 配置圍繞三件事：上下文管理、記憶系統、外部能力。

**1. opencode-dcp（開源）——動態上下文剪枝。**上下文達到閾值時，自動把舊內容壓縮成技術摘要：保留關保留關鍵信息、丟棄噪聲、清理重複內容，把工具報錯這類低價值內容從上下文裡剔除。長會話不爆上下文，省錢省 token，這是長任務能持續跑一整天的地基。

**2. opencode-goal-plugin——目標管理。**給長任務加 Goal 模式，Agent 跑偏了能拉回來。

**3. Hermes Memory——分層記憶（有需要我後續開源）。**這是我最重的一個插件：把 Hermes agent 的分層記憶機制移植到 OpenCode 上，跨會話記住用戶偏好、項目決策和歷史教訓。新項目不用從零教起。

**4. context7-MCP。**查庫和框架的最新官方文檔，不用自己翻。

**5. grep-MCP。**在 GitHub 全站代碼裡搜真實用法，比憑記憶寫靠譜得多。

**6. open-computer-use——桌面自動化。**讓 AI 直接操作 macOS 應用：點擊、輸入、滾動、拖拽、截圖、讀無障礙樹。測試和驗收環節特別好用。

## 成本賬：兩份訂閱怎麼花

DeepSeek V4 Flash 是這套棧的性價比核心：它真的好智能，也真的好省錢。OpenCode Go 的訂閱覆蓋主力工作流，Ollama Cloud 的訂閱做第二通道分流——兩份訂閱加起來，比一套主流原廠 Coding Plan 便宜，產出還更高。

模型套進第三方殼子會降智的說法，要拆開看：**降智的根源是「殼子沒有針對模型做 Harness Engineering」，而不是換殼這個動作本身。**OpenCode 對開放模型的支持是第一梯隊，DeepSeek V4 Flash 在裡面跑得又穩又快——這正是我敢把 15 個項目壓在它身上的原因。

## 「原湯化原食」的教訓

群裡常有朋友問：有沒有一個萬能的 AI 編程桌面端？能接各家訂閱，所有模型還不降智？

我和幾個天天高強度折騰的朋友聊完，結論一致：不存在，原湯化原食。

- GPT → Codex：官方訂閱直連，原生調度最穩。
- Gemini → AntiGravity：速度天花板，長窗口不卡殼。
- DeepSeek、GLM 等開源模型 → OpenCode / ZCode 這類對開放模型友好的 Harness。

模型套進不匹配的殼子，基本逃不掉降智、變慢和訂閱不通。**每個模型留在它最舒服的位置，組合起來才是你的全家桶。**

## 最後

這套棧跑了幾個月，最大的體感不是省了多少錢，而是「敢開任務」——因為穩定和便宜，開 15 個項目心裡不慌。工具棧的價值，最終都體現在你能把多少活壓在它身上。
