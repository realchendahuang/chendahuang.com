---
title: DeepSeek API 內建聯網搜尋，Responses API 白拿官方搜尋能力
description: DeepSeek 官方在 API 裡內建了聯網搜尋：用 Responses 介面呼叫 deepseek-v4-flash，宣告 web_search 工具即可，不用自己接第三方搜尋引擎，也不用申請搜尋金鑰。
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - AI 工具
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文發表於 [X](https://x.com/realchendahuang/status/2084826975102030013)，這篇爆了，23 萬瀏覽次數、1000+ 讚。這裡把細節展開講清楚。

發現個好東西：DeepSeek 官方居然在 API 裡內建了聯網搜尋。

## 一句話說清楚

用 **Responses 格式**的介面呼叫 `deepseek-v4-flash` 模型，只要在請求參數裡宣告 `web_search` 工具，就能直接用上 DeepSeek 伺服器端執行的搜尋能力。

不用自己接第三方搜尋引擎，不用額外申請搜尋介面金鑰，整套搜尋流程官方直接託管了。

## 怎麼用

官方文件：<https://api-docs.deepseek.com/zh-cn/guides/responses_api>

核心就是把工具宣告出來：

```js
const response = await fetch('https://api.deepseek.com/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
  },
  body: JSON.stringify({
    model: 'deepseek-v4-flash',
    tools: [{ type: 'web_search' }],
    input: '2026 年 8 月 AI 行業發生了什麼大事？'
  })
})
```

就只是這樣。剩下的搜尋、抓取、解析、引用，全是 DeepSeek 伺服器端的活。

## 為什麼這件事很關鍵

以前要讓 AI 有即時資訊，你得自己搭一條鏈路：選搜尋引擎（SerpAPI、Bing Search 之類）→ 申請 API Key → 寫抓取和解析的程式碼 → 把搜尋結果塞進上下文 → 還要控制預算。

這一套弄下來，少說一兩天，多了搞不好一個禮拜，而且每個環節都是錢：搜尋 API 按次計費，抓取還要處理反爬。

現在 DeepSeek 直接內建了，而且用的是 `deepseek-v4-flash` 這個便宜到離譜的模型。搜尋和生成一條鏈路，成本低到可以當自來水用。

## 適合什麼場景

- 寫需要時效性的內容（產業動態、產品比較、政策解讀）
- 做 Agent：需要先查資料再決策的環節
- 客服／問答系統：回答前先搜一下最新資訊
- 任何「模型知識截止日期」扯後腿的場景

## 注意事項

1. **用 Responses 介面**，不是舊的 Chat Completions 介面。舊介面沒有這個工具。
2. 聯網搜尋的粒度、引用格式，官方文件裡都有，建議實際跑一次看回傳結構。
3. 有快取打折機制，長上下文場景記得利用起來，能省不少。

這條是真的白拿，官方把最麻煩的搜尋基礎設施免費送給你了。有需要的直接抄作業。

相關閱讀：[DeepSeek V4 Flash 正式版深度體驗](/blog/deepseek-v4-flash-review)