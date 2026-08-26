---
title: DeepSeek API has built-in web search — freeload the official search via the Responses API
description: DeepSeek officially built web search into its API: call deepseek-v4-flash via the Responses interface and declare the web_search tool, no third-party search engine integration or search key application needed.
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - AI tools
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Originally posted on [X](https://x.com/realchendahuang/status/2084826975102030013). This one blew up — 230k views, 1000+ likes. Here I'll expand on the details.

Found something great: DeepSeek officially built web search into its API.

## In one sentence

Call the `deepseek-v4-flash` model via the **Responses format** interface, and just declare the `web_search` tool in the request parameters — you can directly use DeepSeek's server-side search capability.

No need to integrate a third-party search engine yourself, no need to apply for a separate search API key — the entire search flow is officially hosted.

## How to use it

Official docs: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

The core is just declaring the tool:

```js
const response = await fetch('https://api.deepseek.com/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
  },
  body: JSON.stringify({
    model: 'deepseek-v4-flash',
    tools: [{ type: 'web_search' }],
    input: '2026 年 8 月 AI 行业发生了什么大事？'
  })
})
```

That's it. The rest — searching, fetching, parsing, citing — is all done by DeepSeek's server side.

## Why this matters

Previously, to give AI real-time information, you had to build a whole pipeline yourself: pick a search engine (SerpAPI, Bing Search, etc.) → apply for an API key → write fetching and parsing code → stuff the search results into context → and manage the budget.

That whole process takes at least a day or two, maybe a week, and every step costs money: search APIs bill per call, and fetching requires dealing with anti-scraping.

Now DeepSeek has it built in, and it uses `deepseek-v4-flash`, a model that's absurdly cheap. Search and generation in one pipeline, cheap enough to use like tap water.

## What scenarios it suits

- Writing time-sensitive content (industry news, product comparisons, policy interpretation)
- Building Agents: the step where you need to look things up before deciding
- Customer service / Q&A systems: search for the latest info before answering
- Any scenario where the "model knowledge cutoff" holds you back

## Caveats

1. **Use the Responses interface**, not the old Chat Completions interface. The old interface doesn't have this tool.
2. The granularity and citation format of web search are all in the official docs — I recommend actually running it to see the return structure.
3. There's a cache discount mechanism; make use of it in long-context scenarios to save a lot.

This is a genuine freeload — the official side hands you the most troublesome search infrastructure for free. If you need it, just copy the homework.

Related reading: [DeepSeek V4 Flash official release deep dive](/blog/deepseek-v4-flash-review)
