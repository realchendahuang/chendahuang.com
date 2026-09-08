---
title: 試遍了 Pi Agent、OMP、Codex、ZCode，我最後為什麼選了 OpenCode + OpenChamber
description: 試過一輪 Agent Harness 後的選型復盤：以 GUI 體驗、供應商綁定、二次開發自由度三個標準，排除了 Pi Agent、OMP、Codex、ZCode，最後選了 OpenCode 核心 + OpenChamber 介面。
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - 工具選型
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文發表於 [X](https://x.com/realchendahuang/status/2085410520459604026)。

最近把 Pi Agent、OMP、ZCode、Codex、OpenCode 這些 Agent Harness 一一試過，總算理解了自己真正的需求是什麼。

## 我的三個標準

### 第一：成熟穩定的 GUI

用慣了 GUI，實在回不去 TUI。在黑色視窗裡聊天太痛苦了——你得記一大堆快捷鍵、一大堆指令，才真的用得下去。但 GUI 只要直覺地點點圖示、按按鈕就行了。

所以我要的是一個成熟、穩定又好看的 GUI 頁面。

光這一條就直接淘汰了 **Pi Agent** 和 **OMP**。不是說核心不行，而是配套的社群 GUI 做得真的太差。自己動手刻一個又得花很多心力，而且這類工具可自訂性太強，自己刻的 GUI 沒有通用性——換台機器、換個人，一切就得砍掉重練。

### 第二：不綁定供應商、不偏袒供應商

Codex 確實開放了第三方模型的設定介面，但設定起來真的很麻煩，而且第三方模型永遠是「二等公民」——被官方模型壓著打、被更新節奏拖累，這點讓我很不爽。

ZCode 更誇張，沒有辦法用 OAuth 登入各家的 Coding Plan（例如 Kimi For Code、Grok Build 都沒辦法在 ZCode 裡用，除非走旁門左道硬搞）。

所以我把 ZCode、Codex 這類偏袒特定模型供應商的軟體都排除了。

### 第三：開放原始碼、可二次開發

我需要依照自己的需求做二次開發與客製化，好讓客戶能更方便地開箱即用。所以它一定要是開放原始碼、授權友善的產品——讓我自己用得爽，客戶用起來也簡單方便，不用搞一堆黑科技去 hack。

## 最終答案：OpenCode + OpenChamber

一路淘汰到最後，真正能選的就是 **OpenCode**。

但 OpenCode 只是一個 Agent 核心。要幫它配上一個成熟、穩定、好用的 GUI，我終於找到了真正的版本答案：**OpenChamber**。

- 核心：OpenCode，開放原始碼、不綁定供應商、支援各家模型
- 介面：OpenChamber，成熟的 GUI 工作台
- 組合：核心穩定 + 介面順手，還能依需求二次開發

開放原始碼位置：<https://github.com/openchamber/openchamber>

## 一些心得

選工具這件事，本質上就是在選「話語權握在誰手裡」。

閉源工具再好用，更新方向、模型支援、價格策略都掌握在別人手裡，你只能被動接受。開放原始碼 + 不綁定的組合，你永遠有退路，也永遠保有改造的自由。

至於 TUI 和 GUI 之爭，別硬撐。工具是拿來做事的，不是拿來證明自己懂命令列。介面用得舒服、能長期用下去，比什麼都重要。

相關閱讀：[DeepSeek V4 Flash 正式版深度體驗](/blog/deepseek-v4-flash-review)
