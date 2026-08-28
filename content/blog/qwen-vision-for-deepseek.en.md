---
title: Giving DeepSeek multimodality: the Qwen-3.7-Flash vision approach
description: DeepSeek V4 Flash has no multimodality — what do you do for image understanding? After surveying the market, the most cost-effective option right now is Qwen-3.7-Flash: recognizing an image costs almost nothing, and pairing it with V4 Flash patches the gap.
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - Multimodality
  - Model review
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Originally posted on [X](https://x.com/realchendahuang/status/2085265465564336327) — 89k views, 600+ likes.

Lots of people complain that DeepSeek V4 Flash has no multimodal capability. It's a real gap — but there's no need to be married to one model.

## The problem

V4 Flash's text ability is maxed out, but it's helpless with images: screenshots, table images, UI design mockups, scanned documents — none of it works.

Multimodality is the price of "cheap" — the model needs visual encoders, parameters balloon, and costs climb.

## The fix: combine models

I surveyed the most cost-effective vision models on the market, and the answer is **Qwen-3.7-Flash**.

The cost of recognizing one image is negligible. Use it as the dedicated vision model, keep text reasoning on V4 Flash, and get the best of both.

## How to combine them

The simplest idea is "routing": input contains an image → vision model; pure text → V4 Flash.

```js
// pseudocode: route on demand
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // recognize image + extract key info
  }
  return deepseekV4Flash(input) // text reasoning
}
```

A more advanced play is feeding the vision output straight into V4 Flash for further reasoning:

1. Have Qwen-3.7-Flash recognize the image and output a structured description
2. Hand the description + original question to DeepSeek V4 Flash together
3. V4 Flash reasons deeply on the description — writes code, summarizes

This way you get vision *and* V4 Flash's cheap-and-fast.

## Good use cases

- Screenshot Q&A: throw in error screenshots and chat screenshots
- Table / document images into structured data
- UI mockups into code
- Extracting info from scanned invoices and contracts
- Agents that need to "see" a screen

## Why not other options

Pure vision LLMs (like the GPT family's multimodal models) are strong, but the price is what it is — not economical for daily batch work.

Qwen-3.7-Flash wins on cost-performance: recognition quality is sufficient, cost is nearly invisible, and you can run big batches without wincing.

## Summary

Model combination is the norm — don't expect one model to do everything.

Text workhorse V4 Flash (cheap, fast, huge context), vision supplement Qwen-3.7-Flash (cheap, good enough) — this combo is the best cost-performance option available right now. Patch what's missing rather than waiting for a "does-everything-but-expensive" model to arrive.

Related: [DeepSeek V4 Flash — hands-on review of the stable release](/blog/deepseek-v4-flash-review)