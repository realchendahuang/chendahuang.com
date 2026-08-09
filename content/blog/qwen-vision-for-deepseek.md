---
title: 给 DeepSeek 补上多模态：Qwen-3.7-Flash 识图方案
description: DeepSeek V4 Flash 没有多模态，识图怎么办？调研后目前性价比最高的方案是 Qwen-3.7-Flash：识别一张图片成本极低，和 V4 Flash 组合使用补齐短板。
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文发在 [X](https://x.com/realchendahuang/status/2085265465564336327)，8.9 万浏览、600+ 赞。

很多人吐槽 DeepSeek V4 Flash 没有多模态的功能。这确实是它的短板——但没必要死磕一个模型。

## 问题

V4 Flash 文本能力拉满，但一遇到读图场景就抓瞎：截图、表格图片、UI 设计稿、扫描件，全都处理不了。

多模态是"便宜"的代价，模型要做视觉编码，参数就膨胀了，成本就上去了。

## 解法：组合使用

我调研了一圈目前性价比最高的识图模型，结论是 **Qwen-3.7-Flash**。

识别一张图片的成本，低到可以忽略不计。拿它当视觉专用模型，文本推理继续走 V4 Flash，两头的好处都占。

## 怎么组合

最简单的思路就是"路由"：输入里带图片 → 走视觉模型；纯文本 → 走 V4 Flash。

```js
// 伪代码：按需路由
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // 识图 + 提取关键信息
  }
  return deepseekV4Flash(input) // 文本推理
}
```

更进阶的玩法是把识图结果直接塞给 V4 Flash 继续推理：

1. 用 Qwen-3.7-Flash 识别图片，输出结构化描述
2. 把描述 + 原始问题一起交给 DeepSeek V4 Flash
3. V4 Flash 基于描述做深度推理、写代码、总结

这样既能看图，又享受 V4 Flash 的便宜和快。

## 适用场景

- 截图提问：把报错截图、聊天截图丢进去
- 表格 / 文档图片转结构化数据
- UI 设计稿转代码
- 发票、合同等扫描件的信息提取
- Agent 需要"看"屏幕的场景

## 为什么不是别的方案

纯视觉大模型（比如 GPT 系的多模态）很强，但价格摆在那里，日常批量处理不划算。

Qwen-3.7-Flash 赢在性价比：识别质量够用，成本几乎可以忽略，还能跑大批量任务不心疼。

## 总结

模型组合是常态，别指望一个模型全干。

文本主力 V4 Flash（便宜快上下文大），视觉补充 Qwen-3.7-Flash（便宜够用），这套组合是目前性价比最高的方案。缺什么补什么，比等一个"全能但贵"的模型实际得多。

相关阅读：[DeepSeek V4 Flash 正式版深度体验](/blog/deepseek-v4-flash-review)
