---
title: 給 DeepSeek 補上多模態：Qwen-3.7-Flash 識圖方案
description: DeepSeek V4 Flash 沒有多模態，識圖怎麼辦？研究後目前 CP 值最高的方案是 Qwen-3.7-Flash：辨識一張圖片成本極低，和 V4 Flash 組合使用補齊短板。
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - 多模態
  - 模型評測
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文發在 [X](https://x.com/realchendahuang/status/2085265465564336327)，8.9 萬瀏覽次數、600+ 讚。

很多人吐槽 DeepSeek V4 Flash 沒有多模態的功能。這確實是它的短板——但也沒必要死守著一個模型不放。

## 問題

V4 Flash 文本能力點滿，但一碰上讀圖場景就沒轍：截圖、表格圖片、UI 設計稿、掃描檔，全都處理不了。

多模態是「便宜」的代價，模型要做視覺編碼，參數就膨脹了，成本就上去了。

## 解法：組合使用

我研究了一圈目前 CP 值最高的識圖模型，結論是 **Qwen-3.7-Flash**。

辨識一張圖片成本低到可以忽略不計。拿它當視覺專用模型，文本推理繼續走 V4 Flash，兩邊的好處都佔到。

## 怎麼組合

最簡單的思路就是「路由」：輸入裡帶圖片 → 走視覺模型；純文字 → 走 V4 Flash。

```js
// 虛擬碼：依需求路由
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // 識圖 + 提取關鍵資訊
  }
  return deepseekV4Flash(input) // 文本推理
}
```

更進階的玩法是把識圖結果直接丟給 V4 Flash 繼續推理：

1. 用 Qwen-3.7-Flash 辨識圖片，輸出結構化描述
2. 把描述 + 原始問題一起交給 DeepSeek V4 Flash
3. V4 Flash 根據描述做深度推理、寫程式、總結

這樣既能看圖，又能享受 V4 Flash 的便宜和快。

## 適用場景

- 截圖提問：把報錯截圖、聊天截圖丟進去
- 表格／文件圖片轉結構化資料
- UI 設計稿轉程式碼
- 發票、合約等掃描檔的資訊提取
- Agent 需要「看」螢幕的場景

## 為什麼不是別的方案

純視覺大模型（例如 GPT 系列的多模態）很強，但那個價格就擺在那裡，日常批次處理不划算。

Qwen-3.7-Flash 贏在 CP 值：辨識品質夠用，成本幾乎可以忽略，還能跑大批量任務不心疼。

## 總結

模型組合是常態，別指望一個模型全包。

文本主力 V4 Flash（便宜快上下文大），視覺補充 Qwen-3.7-Flash（便宜夠用），這套組合是目前 CP 值最高的方案。缺什麼補什麼，比等一個「全能但貴」的模型實際得多。

相關閱讀：[DeepSeek V4 Flash 正式版深度體驗](/blog/deepseek-v4-flash-review)