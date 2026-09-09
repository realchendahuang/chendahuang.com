---
title: 原厂 Harness 未必是版本答案：开放模型时代，模型和 Harness 要分开选
description: "用 Claude 就上 Claude Code？开放模型时代这个直觉该升级了。原厂的优势是真的，但训练好模型和做好 Harness 是两门工程——这篇文章讲清楚为什么模型与 Harness 已经可以分开选，以及五家 Harness 的定位地图。"
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - 选型
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 核心观点首发于 [X](https://x.com/realchendahuang/status/2093890559874388141)，这篇文章是完整版论述，附五家 Harness 的定位地图。

很多人选 Coding Agent 的第一反应都很自然：用 Claude，就上 Claude Code；用 GPT，就上 Codex；用 GLM，就上 ZCode；用 DeepSeek，当然优先考虑 DeepSeek 自己的 Harness。

这个思路其实完全合理。原厂最大的优势，就是最了解自己的模型。

## 原厂的优势是真的

模型喜欢什么样的 Prompt，Tool Schema 怎么设计最稳定，长上下文怎么组织，新版本增加了什么能力，哪些地方最容易翻车——原厂通常都比第三方更早知道。

所以 Claude Code 和 Codex 这种模型与 Harness 一起长期迭代的产品，原厂组合往往就是很强的版本答案。这一点我不反驳。

## 但训练模型和做 Harness，是两门完全不同的工程

到了 DeepSeek、GLM 这些开放模型，事情就开始变得有意思了。因为训练一个好模型，和做一个好 Harness，其实是两门完全不同的工程。

Coding Agent 真正跑起来以后，还有大量模型之外的问题：

- 文件怎么读、代码怎么改
- Agent Loop 怎么控制、Context 怎么压缩
- 缓存怎么利用、Tool Call 出错以后怎么恢复
- Subagent 怎么调度、权限怎么管理

这些地方做得好不好，会直接影响同一个模型最后到底好不好用。同一个模型，换个 Harness，体验可以是天壤之别。

## 更大的问题：模型更新速度太快了

今天 GLM 强，下个月 DeepSeek 可能又出一个更能打的 Flash，再过一阵子又有新的模型追上来。

如果整个 Coding 工作流都绑定在某一家原厂产品上，换模型往往连工具和习惯也要跟着换。你花了几个月调教出来的配置、记忆、工作流，全部推倒重来。

第三方 Harness 的价值就在这里：**你可以把自己熟悉的工具、Skills、MCP、权限和工作流固定下来，只替换底下的模型。**今天跑 DeepSeek，明天换 GLM，后天再换别的，工作环境不用推倒重来。

## 五家 Harness 定位地图

把主流五家的定位说清楚（截至 2026 年 8 月底我的使用体验）：

**Pi**：思路极简，Harness 尽量少干预模型，轻、快、Token 开销低，可塑性极强。适合做自己的长期 Agent 基座，简单、干净、随便魔改。

**OMP**：在 Pi 上继续堆 LSP、Debugger、Browser、AST 这些重型 Coding 能力，像给 Agent 装了一套完整 IDE。适合真正重度 Coding、需要复杂 Repo 导航的场景。

**DeepSeek Harness**：走得最远，Everything is Plugin，Agent Loop、工具、权限、Preset、UI 都可以拆开重组。适合折腾 Agent 架构、Preset、多 Agent 和下一代 Runtime 的人。多试 PTC 模式，速度更快、更省 token。

**OpenCode**：目前最均衡的一类，开源、Provider 多、生态大、Client/Server、桌面端、Subagent 都比较成熟。适合想要一套成熟通用型多模型 Coding Agent 的人。

**Command Code**：路子完全不同——它特别喜欢替模型补位。Tool Call 参数写错了本地修；文件重复读帮你去重；长 Session 维持 Stable Prefix 提高 Cache Hit；Context 快爆了就做 Compaction。这套思路放到 DeepSeek V4 Flash、GLM-5.3 Flash 这种苦力模型上，价值最大：模型差一点，Harness 给你补。

## 我的选法

如果只看长期可塑性，我依然更喜欢 Pi。但如果今天就让我拿 DeepSeek V4 Flash、GLM-5.3 狠狠干活，我会认真尝尝 Command Code 的咸淡——模型和 Harness 的组合是按任务配的，不是按阵营站的。

到了开放模型时代，模型和 Harness 已经完全可以分开选了。**别再问「用谁家的模型该用谁家的工具」，改问「这个模型放在哪个 Harness 里，能把活干得最好」。**
