---
title: After tinkering with Pi Agent, OMP, Codex, and ZCode, why I finally chose OpenCode + OpenChamber
description: "A retrospective on choosing an Agent Harness: three criteria — GUI experience, vendor lock-in, and freedom for secondary development — ruled out Pi Agent, OMP, Codex, and ZCode, and finally settled on the OpenCode core + OpenChamber interface."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Tool selection
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Originally posted on [X](https://x.com/realchendahuang/status/2085410520459604026).

I've been tinkering with Agent Harnesses like Pi Agent, OMP, ZCode, Codex, and OpenCode lately, and I've finally understood what I actually need.

## My three criteria

### First: a mature, stable GUI

I'm used to GUIs and really can't stand TUIs. Chatting in a black terminal box is too painful — you have to memorize a ton of shortcuts and commands just to make it usable. A GUI, on the other hand, just needs you to intuitively click icons and buttons.

So I need a mature, stable, and good-looking GUI.

This criterion alone ruled out **Pi Agent** and **OMP**. It's not that their cores are bad — it's that the community GUIs built around them are just terrible. Building my own from scratch would take a lot of effort, and these tools are so customizable that a hand-rolled GUI has no portability — switch machines or switch people, and everything starts over from scratch.

### Second: no vendor lock-in, no vendor favoritism

Codex does open up configuration interfaces for third-party models, but configuring them is genuinely painful, and third-party models are always "second-class citizens" — suppressed by the official models and dragged down by the update cadence, which really annoys me.

ZCode is even more absurd: there's no way to log into each vendor's Coding Plan via OAuth (for example, Kimi For Code and Grok Build can't be used in ZCode at all, unless you resort to hacky workarounds).

So I ruled out ZCode and Codex — software with model-vendor favoritism.

### Third: open source and open to secondary development

I need to do secondary development and customization based on my own needs, to make it easier to give clients an out-of-the-box experience. So it has to be an open-source, license-friendly product — convenient for me to enjoy, and convenient for my clients to use simply, without all that black-magic hacking.

## The final answer: OpenCode + OpenChamber

After eliminating everything, the only real choice left is **OpenCode**.

But OpenCode is just an Agent core. To pair it with a mature, stable, easy-to-use GUI, I finally found the real answer: **OpenChamber**.

- Core: OpenCode, open source, no vendor lock-in, supports models from all vendors
- Interface: OpenChamber, a mature GUI workbench
- Combination: a stable core + a comfortable interface, plus the ability to do secondary development as needed

Open source: <https://github.com/openchamber/openchamber>

## Some reflections

Choosing a tool is essentially choosing "who holds the say over you."

No matter how good a closed-source tool is, its update direction, model support, and pricing strategy are all decided by others — you can only passively accept them. With an open-source + non-locked-in combination, you always have an exit, and you always have the freedom to modify.

As for the TUI vs. GUI debate, don't force it. Tools are for getting work done, not for proving you know the command line. A comfortable interface you can stick with long-term matters more than anything.

Related reading: [DeepSeek V4 Flash official release deep dive](/blog/deepseek-v4-flash-review)
