---
title: 稳定、快速、高产、便宜：我的 AI Coding 全家桶实录
description: "OpenCode + OpenChamber + 两份 DeepSeek V4 Flash 订阅，15 个项目同时跑代码，额度只掉一点点。这篇文章摊开我的完整配置：上下文剪枝、分层记忆、桌面自动化，以及「原汤化原食」的选型教训。"
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - AI 编程
  - 配置
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 核心观点首发于 [X](https://x.com/realchendahuang/status/2086611065920733305)，这篇文章是完整版配置实录。

先说结论：**OpenCode + OpenChamber + OpenCode Go 的 DeepSeek V4 Flash 订阅 + Ollama Cloud 的 DeepSeek V4 Flash 订阅。**

这套组合我长期高强度使用，四个字：稳、快、产、省。连续开了 15 个项目同时在跑代码，额度只消耗了一点点。

## 为什么是 OpenCode + OpenChamber

选型过程在[另一篇文章](/blog/agent-harness-selection)里写过，这里只说结果层面的原因：OpenCode 是目前最均衡的多模型内核——开源、Provider 多、Client/Server、桌面端、Subagent 都成熟；OpenChamber 则是我用过的开源项目里前端打磨得最好的 Harness GUI，作者维护得极其用心，精致、稳定，偶尔的小毛病完全不影响长期使用。

Web 界面 + PWA，跟桌面客户端几乎没有区别，更新还免手动。

## 配置围绕三个核心诉求

我的 OpenCode 配置围绕三件事：上下文管理、记忆系统、外部能力。

**1. opencode-dcp（开源）——动态上下文剪枝。**上下文达到阈值时，自动把旧内容压缩成技术摘要：保留关键信息、丢弃噪声、清理重复内容，把工具报错这类低价值内容从上下文里剔除。长会话不爆上下文，省钱省 token，这是长任务能持续跑一整天的地基。

**2. opencode-goal-plugin——目标管理。**给长任务加 Goal 模式，Agent 跑偏了能拉回来。

**3. Hermes Memory——分层记忆（有需要我后续开源）。**这是我最重的一个插件：把 Hermes agent 的分层记忆机制移植到 OpenCode 上，跨会话记住用户偏好、项目决策和历史教训。新项目不用从零教起。

**4. context7-MCP。**查库和框架的最新官方文档，不用自己翻。

**5. grep-MCP。**在 GitHub 全站代码里搜真实用法，比凭记忆写靠谱得多。

**6. open-computer-use——桌面自动化。**让 AI 直接操作 macOS 应用：点击、输入、滚动、拖拽、截图、读无障碍树。测试和验收环节特别好用。

## 成本账：两份订阅怎么花

DeepSeek V4 Flash 是这套栈的性价比核心：它真的好智能，也真的好省钱。OpenCode Go 的订阅覆盖主力工作流，Ollama Cloud 的订阅做第二通道分流——两份订阅加起来，比一套主流原厂 Coding Plan 便宜，产出还更高。

模型套进第三方壳子会降智的说法，要拆开看：**降智的根源是「壳子没有针对模型做 Harness Engineering」**，而不是换壳这个动作本身。OpenCode 对开放模型的支持是第一梯队，DeepSeek V4 Flash 在里面跑得又稳又快——这正是我敢把 15 个项目压在它身上的原因。

## 「原汤化原食」的教训

群里常有朋友问：有没有一个万能的 AI 编程桌面端？能接各家订阅，所有模型还不降智？

我和几个天天高强度折腾的朋友聊完，结论一致：不存在，原汤化原食。

- GPT → Codex：官方订阅直连，原生调度最稳。
- Gemini → AntiGravity：速度天花板，长窗口不卡壳。
- DeepSeek、GLM 等开源模型 → OpenCode / ZCode 这类对开放模型友好的 Harness。

模型套进不匹配的壳子，基本逃不掉降智、变慢和订阅不通。**每个模型留在它最舒服的位置，组合起来才是你的全家桶。**

## 最后

这套栈跑了几个月，最大的体感不是省了多少钱，而是「敢开任务」——因为稳定和便宜，开 15 个项目心里不慌。工具栈的价值，最终都体现在你敢把多少活压在它身上。
