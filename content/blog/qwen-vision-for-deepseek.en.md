---
title: Adding multimodality to DeepSeek: the Qwen-3.7-Flash image recognition approach
description: DeepSeek V4 Flash has no multimodality — what to do about image recognition? After research, the most cost-effective approach right now is Qwen-3.7-Flash: recognizing an image costs almost nothing, and combining it with V4 Flash patches the gap.
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

> Originally posted on [X](https://x.com/realchendahuang/status/2085265465564336327), 89k views, 600+ likes.

Many people complain that DeepSeek V4 Flash has no multimodality. This is indeed its shortcoming — but there's no need to stubbornly rely on a single model.

## The problem

V4 Flash's text capability is maxed out, but it's helpless the moment it hits image-reading scenarios: screenshots, table images, UI design mockups, scanned documents — none of them can be processed.

Multimodality is the price of "cheap." For a model to do visual encoding, its parameters bloat and cost goes up.

## The solution: combine models

I researched the most cost-effective image recognition models and concluded it's **Qwen-3.7-Flash**.

The cost of recognizing one image is low enough to be negligible. Use it as a vision-specialized model, keep V4 Flash for text reasoning, and you get the best of both.

## How to combine

The simplest approach is "routing": input with an image → vision model; pure text → V4 Flash.

```js
// Pseudocode: route on demand
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // recognize image + extract key info
  }
  return deepseekV4Flash(input) // text reasoning
}
```

A more advanced play is to feed the recognition result directly to V4 Flash for further reasoning:

1. Use Qwen-3.7-Flash to recognize the image and output a structured description
2. Hand the description + the original question to DeepSeek V4 Flash
3. V4 Flash does deep reasoning, writes code, and summarizes based on the description

This way you can both see images and enjoy V4 Flash's cheapness and speed.

## Applicable scenarios

- Screenshot questions: throw in error screenshots and chat screenshots
- Table / document images to structured data
- UI design mockups to code
- Information extraction from scanned invoices, contracts, etc.
- Scenarios where an Agent needs to "see" the screen

## Why not other approaches

Pure vision large models (like GPT's multimodal models) are strong, but the price is there — not cost-effective for daily batch processing.

Qwen-3.7-Flash wins on cost-effectiveness: recognition quality is good enough, cost is almost negligible, and you can run large batch jobs without heartache.

## Summary

Model combination is the norm — don't expect one model to do everything.

Text workhorse V4 Flash (cheap, fast, long context), vision supplement Qwen-3.7-Flash (cheap, good enough) — this combo is currently the most cost-effective approach. Fill in what's missing, which is far more practical than waiting for an "all-capable but expensive" model.

Related reading: [DeepSeek V4 Flash official release deep dive](/blog/deepseek-v4-flash-review)
