---
title: The First-Party Harness Isn't Always the Best Answer: In the Open-Model Era, Pick Your Model and Harness Separately
description: "Using Claude? Go Claude Code. In the open-model era that instinct deserves an upgrade. The first-party advantage is real, but training a good model and building a good harness are two different kinds of engineering — here's why models and harnesses are now separable choices, plus a positioning map of five harnesses."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Tool selection
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> The core argument first appeared on [X](https://x.com/realchendahuang/status/2093890559874388141); this is the full-length version, with a positioning map of five harnesses.

Most people's first instinct when picking a coding agent is perfectly natural: Claude → Claude Code; GPT → Codex; GLM → ZCode; DeepSeek → DeepSeek's own harness, obviously.

And the instinct is entirely sound. A first party's biggest advantage is knowing its own model best.

## The First-Party Advantage Is Real

What prompts the model likes, which tool-schema design is most stable, how to organize long context, what new capabilities a release adds, where it most easily trips — the first party usually knows all of this before third parties do.

So for products like Claude Code and Codex, where model and harness iterate together over the long term, the first-party combo is often the strongest version of the answer. I won't argue with that.

## But Training a Model and Building a Harness Are Two Different Kinds of Engineering

Once you get to open models like DeepSeek and GLM, things get interesting — because training a good model and building a good harness are two completely different kinds of engineering.

Once a coding agent actually runs, a mass of non-model problems appears:

- How files get read, how code gets edited
- How the agent loop is controlled, how context is compressed
- How cache is exploited, how tool-call failures recover
- How subagents are scheduled, how permissions are managed

How well those are done directly determines whether the same model ends up feeling good to use. The same model in a different harness can be a night-and-day experience.

## The Bigger Problem: Models Update Too Fast

Today GLM is on top; next month DeepSeek may ship an even stronger Flash; a while later another model catches up.

If your whole coding workflow is bound to one first-party product, switching models often means switching tools and habits too. Months of tuned configs, memories, and workflows get bulldozed.

That's exactly where third-party harnesses earn their keep: **you can lock in the tools, skills, MCP servers, permissions, and workflows you know, and swap only the model underneath.** Run DeepSeek today, GLM tomorrow, something else the day after — your working environment doesn't get rebuilt from scratch.

## A Positioning Map of Five Harnesses

Where the mainstream five sit, based on my experience as of late August 2026:

**Pi**: minimalist philosophy; the harness interferes with the model as little as possible. Light, fast, low token overhead, extremely malleable. Best as the foundation for your own long-term agent — simple, clean, endlessly hackable.

**OMP**: keeps stacking heavy coding capabilities on Pi — LSP, Debugger, Browser, AST — like fitting the agent with a full IDE. Best for genuinely heavy coding and complex repo navigation.

**DeepSeek Harness**: goes furthest — Everything is Plugin. Agent loop, tools, permissions, presets, and UI all come apart and recombine. Best for tinkering with agent architecture, presets, multi-agent setups, and next-gen runtimes. Try PTC mode more — faster and more token-efficient.

**OpenCode**: the most balanced of the bunch — open source, many providers, big ecosystem, mature Client/Server, desktop app, and subagents. Best for anyone wanting a mature, general-purpose, multi-model coding agent.

**Command Code**: a completely different route — it loves covering for the model. Bad tool-call arguments get fixed locally; duplicate file reads get deduplicated; long sessions keep a stable prefix to raise cache hits; when context is about to blow up it compacts. Applied to workhorse models like DeepSeek V4 Flash or GLM-5.3 Flash, this gets maximum value: the weaker the model, the more the harness picks up the slack.

## How I Choose

If I only care about long-term malleability, I still prefer Pi. But if today you asked me to put DeepSeek V4 Flash or GLM-5.3 to serious work, I'd genuinely give Command Code a taste — the model-and-harness pairing is configured per task, not per camp.

In the open-model era, the model and the harness are fully separable choices. **Stop asking "whose model should I pair with whose tool," and start asking "in which harness does this model do its best work."**
