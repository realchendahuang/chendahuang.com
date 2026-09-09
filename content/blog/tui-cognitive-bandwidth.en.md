---
title: TUI Is Killing Your Cognitive Bandwidth: Time to Shatter the "Geek Filter" in AI Coding
description: "A pile of AI coding agents are rushing to ship TUIs, stuffing interaction back into the 1980s terminal paradigm and calling it \"immersive\" and \"respectful of programmers.\" This piece breaks down the three mechanisms by which TUI systematically lowers your cognitive bandwidth — and why Web UI is the right answer."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - AI Coding
  - Interaction design
  - Essay
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> The core argument first appeared on [X](https://x.com/realchendahuang/status/2087949416808518106); this is the full-length version.

A pile of AI coding agents are rushing to ship TUIs these days, and Claude Code owes a big share of the blame for that trend. It made conversing with an AI in the terminal to write code an art form — but it also set a taste and a path dependence: a "truly advanced" coding agent must default to a terminal interface; the web version is an afterthought, even mocked as "not programmer enough."

And the result? Build a complicated TUI first — all the colors, status bars, shortcuts, and mode switching — then call it "immersive," "efficient," and "respectful of programmers."

Really?

## You Think You're Conversing, but You're Wrestling

For the small group who live in the terminal all day, sure, TUI feels great. For many more people, it's a wall built on purpose. When you collaborate with an agent through a TUI, you're constantly doing three things:

**Recalling shortcuts and modes.** Every tool has its own keymap. New users are lost; even veterans relearn every tool's personal habits.

**Locating information inside a scrolling stream of characters.** State isn't laid out for you — it's buried in a timeline you excavate by scrolling and searching.

**Praying you haven't stumbled into some weird state.** Mode switching is invisible; you often don't know which mode you're in until something breaks.

That's not interaction anymore — that's wrestling with an interface.

## Information Density Is Not Information Efficiency

The favorite word of TUI defenders is "density." But push information density to the extreme and you pay for it by trampling readability and recoverability to the minimum.

A truly efficient interface should **spread the state out in front of you**, letting your eyes and spatial sense do the understanding — which task is running, which session is waiting for input, which file got changed, all visible at a glance. Instead of forcing everything into short-term memory while your brain maintains an invisible map of "current system state."

Human working memory has four to seven slots. The TUI interaction model essentially spends your most precious cognitive resource on "remembering interface state" instead of "thinking about the problem."

## It Also Cultivates a Bad Habit

Worse, the TUI ecosystem cultivates a broken value judgment: **treating mastery of a tool's keymap as an ability in itself.**

So people spend enormous energy adapting to the interface instead of thinking about the problem. The measure of a programmer becomes "can you recite these shortcuts" rather than "can you decompose the problem clearly."

A good tool should lower the cost of thinking, not move the cost of thinking into "how to operate this interface."

## Web UI Can Be Fast and Clean

Some say the web is slow and not "native." It's 2026 — that argument is long dead.

A web UI can be just as fast and clean: install it as a PWA and it's nearly indistinguishable from a desktop client, with easier updates — no manual upgrades, just refresh for the latest version. Long sessions, parallel tasks, visualized task states — these are exactly the strengths of browser DOM, not character streams.

My own daily setup is a web interface like OpenChamber on an OpenCode core, under long-term heavy use — rock solid. If I nitpick, the occasional small web bug never affects long-term use, whereas certain TUI mode switches have bitten me plenty of times.

## Tools Exist to Serve People, Not to Prove Who's More "Hardcore"

Claude Code itself is excellent, no dispute. But it popularized the "TUI is the orthodox way" aesthetic, and the imitators that followed are worse — they skip interaction design entirely and treat "living in the terminal" as proof of sophistication.

Dressing up anti-human interaction as sophistication — it's genuinely hilarious.

Tools exist to serve people. The standard should always be: **did it lower the total cost of getting your work done?** If an interface makes you spend energy "wrestling with the interface," it's a liability no matter how "hardcore" it looks.

Next time you pick a coding agent, take the filter off first.
