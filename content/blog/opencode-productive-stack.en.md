---
title: "Stable, Fast, Productive, Cheap: My AI Coding Stack, Documented"
description: "OpenCode + OpenChamber + two DeepSeek V4 Flash subscriptions: 15 projects running code simultaneously and the quota barely moved. The full configuration laid out — context pruning, layered memory, desktop automation, and the \"stick with the original pairing\" lesson."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - AI Coding
  - Configuration
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> The core argument first appeared on [X](https://x.com/realchendahuang/status/2086611065920733305); this is the full configuration write-up.

The conclusion first: **OpenCode + OpenChamber + a DeepSeek V4 Flash subscription via OpenCode Go + a DeepSeek V4 Flash subscription via Ollama Cloud.**

I've run this stack under long-term heavy use, and it delivers four things: stable, fast, productive, cheap. I've had 15 projects open in a row, all running code at the same time, and the quota barely moved.

## Why OpenCode + OpenChamber

The selection journey is in [another article](/blog/agent-harness-selection); here's just the outcome-level reasoning. OpenCode is currently the most balanced multi-model core — open source, many providers, mature Client/Server, desktop app, and subagents. OpenChamber is the best-polished front end I've used in an open-source harness GUI: a maintainer who truly cares, refined, stable, and its occasional small bugs never get in the way of long-term use.

Web interface + PWA — nearly indistinguishable from a desktop client, with updates you don't do by hand.

## The Setup Revolves Around Three Needs

My OpenCode configuration is built around three things: context management, memory, and external capabilities.

**1. opencode-dcp (open source) — dynamic context pruning.** When the context hits a threshold, it automatically compresses older content into technical summaries: keeps key information, drops noise, cleans duplicates, and removes low-value content like tool errors from the context. Long sessions that don't blow up the context — this is the foundation for running long tasks all day.

**2. opencode-goal-plugin — goal management.** Adds Goal mode to long tasks, so the agent can be pulled back when it drifts.

**3. Hermes Memory — layered memory (I'll open source it on demand).** My heaviest plugin: I ported the Hermes agent's layered memory mechanism onto OpenCode, remembering user preferences, project decisions, and past lessons across sessions. New projects don't start from zero.

**4. context7-MCP.** Look up the latest official docs for libraries and frameworks — no manual digging.

**5. grep-MCP.** Search real-world usage across all of GitHub — far more reliable than writing from memory.

**6. open-computer-use — desktop automation.** Lets the AI directly operate macOS apps: clicking, typing, scrolling, dragging, screenshots, reading the accessibility tree. Especially useful for testing and acceptance.

## The Cost Math: How Two Subscriptions Get Spent

DeepSeek V4 Flash is the value core of this stack: genuinely smart, genuinely cheap. The OpenCode Go subscription covers the main workflow; the Ollama Cloud subscription is the second channel — together they cost less than one mainstream first-party coding plan, with higher output.

The claim that "models inside third-party shells get dumbed down" needs unpacking: **the root cause of degradation is a shell that does no harness engineering for the model**, not the act of changing shells. OpenCode's support for open models is first-tier; DeepSeek V4 Flash runs in it steadily and fast — which is exactly why I dare to stack 15 projects on it.

## The Lesson: Stick with the Original Pairing

Friends in group chats often ask: is there a universal AI coding desktop? One that connects to every subscription and never dumb models down?

After talking with a few friends who tinker at high intensity every day, our conclusion was unanimous: it doesn't exist. Stick with the original pairing.

- GPT → Codex: direct official subscription, the most stable native scheduling.
- Gemini → AntiGravity: the speed ceiling, long windows without choking.
- DeepSeek, GLM and other open models → open-model-friendly harnesses like OpenCode / ZCode.

Put a model into a mismatched shell and you basically can't escape degraded intelligence, slower responses, and broken subscriptions. **Keep each model in the seat where it's most comfortable — the combination is your stack.**

## Finally

I've run this stack for months, and the biggest change isn't how much money I saved — it's that **I dare to open tasks**. Because it's stable and cheap, opening 15 projects doesn't scare me. The value of a tool stack ultimately shows up in how much work you dare to put on it.
