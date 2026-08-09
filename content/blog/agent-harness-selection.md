---
title: 折腾了 Pi Agent、OMP、Codex、ZCode，我为什么最终选了 OpenCode + OpenChamber
description: 折腾 Agent Harness 的选型复盘：GUI 体验、供应商锁定、二次开发自由度三个标准，排除了 Pi Agent、OMP、Codex、ZCode，最后选了 OpenCode 内核 + OpenChamber 界面。
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文发在 [X](https://x.com/realchendahuang/status/2085410520459604026)。

最近一直在折腾 Pi Agent、OMP、ZCode、Codex、OpenCode 这些 Agent Harness，终于理解了我自己真正的需求是什么。

## 我的三个标准

### 第一：成熟稳定的 GUI

用惯了 GUI，实在用不下去 TUI。在黑框框里聊天太难受了——你要记很多的快捷键、很多的指令，才能真正用得下去。但是 GUI 只要直观地点点图标、点点按钮就行了。

所以我必须要一个成熟的、稳定的、美观的 GUI 页面。

这一条直接排除了 **Pi Agent** 和 **OMP**。不是说内核不行，是配套的社区 GUI 做得实在太差了。自己手搓又要花很大的精力，而且这种工具可定制化太强，你手搓的 GUI 没有通用性——换个机器、换个人，一切推倒重来。

### 第二：不供应商锁定、不供应商偏袒

Codex 确实开放了第三方模型的配置接口，但配置起来真的很麻烦，而且第三方模型永远是"二等公民"——被官方模型压制、被更新节奏拖累，这让我很不爽。

ZCode 更离谱，没有办法通过 OAuth 登录各家的 Coding Plan（比如 Kimi For Code、Grok Build 都没法在 ZCode 里用，除非邪修折腾）。

所以我排除了 ZCode、Codex 这类有模型供应商偏袒的软件。

### 第三：开源、可二次开发

我需要基于自己的需求做二次开发和定制化，便于给客户更方便的开箱即用。所以它一定要是开源的、许可证友好的产品——方便我自己爽，也方便我的客户用起来简单方便，不搞那么多黑科技去 hack。

## 最终答案：OpenCode + OpenChamber

排到最后，真正能选的就是 **OpenCode**。

但 OpenCode 只是一个 Agent 内核。要给它配一个成熟的、稳定的、好用的 GUI，我终于发现了真正的版本答案：**OpenChamber**。

- 内核：OpenCode，开源、无供应商锁定、支持各家模型
- 界面：OpenChamber，成熟的 GUI 工作台
- 组合：内核稳定 + 界面顺手，还能按需二次开发

开源地址：<https://github.com/openchamber/openchamber>

## 一些体会

选工具这件事，本质上是在选"谁的话语权在你手里"。

闭源工具再香，更新方向、模型支持、价格策略都是别人定的，你只能被动接受。开源 + 非锁定的组合，你永远有退路，也永远有改造的自由。

至于 TUI 和 GUI 之争，别硬扛。工具是拿来干活的，不是拿来证明自己会命令行。界面舒服、能长期用下去，比什么都重要。

相关阅读：[DeepSeek V4 Flash 正式版深度体验](/blog/deepseek-v4-flash-review)
