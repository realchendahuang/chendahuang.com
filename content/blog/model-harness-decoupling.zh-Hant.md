---
title: 原廠 Harness 未必是版本答案：開放模型時代，模型和 Harness 要分開選
description: "用 Claude 就上 Claude Code？開放模型時代這個直覺該升級了。原廠的優勢是真的，但訓練好模型和做好 Harness 是兩門工程——這篇文章講清楚為什麼模型與 Harness 已經可以分開選，以及五家 Harness 的定位地圖。"
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - 選型
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 核心觀點首發於 [X](https://x.com/realchendahuang/status/2093890559874388141)，這篇文章是完整版論述，附五家 Harness 的定位地圖。

很多人選 Coding Agent 的第一反應都很自然：用 Claude，就上 Claude Code；用 GPT，就上 Codex；用 GLM，就上 ZCode；用 DeepSeek，當然優先考慮 DeepSeek 自己的 Harness。

這個思路其實完全合理。原廠最大的優勢，就是最了解自己的模型。

## 原廠的優勢是真的

模型喜歡什麼樣的 Prompt，Tool Schema 怎麼設計最穩定，長上下文怎麼組織，新版本增加了什麼能力，哪些地方最容易翻車——原廠通常都比第三方更早知道。

所以 Claude Code 和 Codex 這種模型與 Harness 一起長期迭代的產品，原廠組合往往就是很強的版本答案。這一點我不反駁。

## 但訓練模型和做 Harness，是兩門完全不同的工程

到了 DeepSeek、GLM 這些開放模型，事情就開始變得有意思了。因為訓練一個好模型，和做一個好 Harness，其實是兩門完全不同的工程。

Coding Agent 真正跑起來以後，還有大量模型之外的問題：

- 文件怎麼讀、代碼怎麼改
- Agent Loop 怎麼控制、Context 怎麼壓縮
- 緩存怎麼利用、Tool Call 出錯以後怎麼恢復
- Subagent 怎麼調度、權限怎麼管理

這些地方做得好不好，會直接影響同一個模型最後到底好不好用。同一個模型，換個 Harness，體驗可以是天壤之別。

## 更大的問題：模型更新速度太快了

今天 GLM 強，下個月 DeepSeek 可能又出一個更能打的 Flash，再過一陣子又有新的模型追上來。

如果整個 Coding 工作流都綁定在某一家原廠產品上，換模型往往連工具和習慣也要跟著換。你花了几個月調教出來的配置、記憶、工作流，全部推倒重來。

第三方 Harness 的價值就在這裡：**你可以把自己熟悉的工具、Skills、MCP、權限和工作流固定下來，只替換底下的模型。**今天跑 DeepSeek，明天換 GLM，後天再換別的，工作環境不用推倒重來。

## 五家 Harness 定位地圖

把主流五家的定位說清楚（截至 2026 年 8 月底我的使用體驗）：

**Pi**：思路極簡，Harness 盡量少干預模型，輕、快、Token 開銷低，可塑性極強。適合做自己的長期 Agent 基座，簡單、乾淨、隨便魔改。

**OMP**：在 Pi 上繼續堆 LSP、Debugger、Browser、AST 這些重型 Coding 能力，像給 Agent 裝了一套完整 IDE。適合真正重度 Coding、需要複雜 Repo 導航的場景。

**DeepSeek Harness**：走得最遠，Everything is Plugin，Agent Loop、工具、權限、Preset、UI 都可以拆開重組。適合折騰 Agent 架構、Preset、多 Agent 和下一代 Runtime 的人。多試 PTC 模式，速度更快、更省 token。

**OpenCode**：目前最均衡的一類，開源、Provider 多、生態大、Client/Server、桌面端、Subagent 都比較成熟。適合想要一套成熟通用型多模型 Coding Agent 的人。

**Command Code**：路子完全不同——它特別喜歡替模型補位。Tool Call 參數寫錯了本地修；文件重複讀幫你去重；長 Session 維持 Stable Prefix 提高 Cache Hit；Context 快爆了就做 Compaction。這套思路放到 DeepSeek V4 Flash、GLM-5.3 Flash 這種苦力模型上，價值最大：模型差一點，Harness 給你補。

## 我的選法

如果只看長期可塑性，我依然更喜歡 Pi。但如果今天就讓我拿 DeepSeek V4 Flash、GLM-5.3 狠狠幹活，我會認真嚐嚐 Command Code 的鹹淡——模型和 Harness 的組合是按任務配的，不是按陣營站的。

到了開放模型時代，模型和 Harness 已經完全可以分開選了。**別再問「用誰家的模型該用誰家的工具」，改問「這個模型放在哪個 Harness 裡，能把活幹得最好」。**
