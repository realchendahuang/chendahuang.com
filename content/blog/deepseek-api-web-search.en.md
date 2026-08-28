---
title: DeepSeek's API has built-in web search — freeload the official search via the Responses API
description: DeepSeek built web search straight into the API: call deepseek-v4-flash through the Responses interface and declare the web_search tool. No third-party search engine integration, no search API key required.
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

> Originally posted on [X](https://x.com/realchendahuang/status/2084826975102030013). This one blew up — 230k views, 1000+ likes. I'll expand on the details here.

Found something great: DeepSeek actually shipped web search directly inside its API.

## In one sentence

Call the `deepseek-v4-flash` model through the **Responses** interface. Just declare a `web_search` tool in the request parameters, and you get DeepSeek's server-side search capability.

No integrating a third-party search engine, no applying for a separate search API key — the entire search pipeline is hosted by DeepSeek.

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
    input: 'What major things happened in the AI industry in August 2026?'
  })
})
```

That's it. The searching, fetching, parsing, and citing are all done on DeepSeek's side.

## Why this matters

Previously, to give an AI real-time information, you had to build the whole pipeline yourself: pick a search engine (SerpAPI, Bing Search, whatever) → apply for an API key → write the fetch-and-parse code → stuff the results into context → keep an eye on the budget.

That's a day or two at minimum, maybe a week if you hit snags, and every step costs money: search APIs bill per request, and scraping means fighting anti-bot measures.

Now DeepSeek just built it in, using the absurdly cheap `deepseek-v4-flash` model. Search and generation in one pipeline, cheap enough to use like running water.

## Good use cases

- Writing anything time-sensitive (industry news, product comparisons, policy explainers)
- Building agents: steps that need to look things up before deciding
- Customer support / Q&A systems: search the latest info before answering
- Any scenario where the model's knowledge cutoff holds you back

## Notes

1. **Use the Responses interface**, not the old Chat Completions interface. The old one doesn't have this tool.
2. The granularity of web search and the citation format are in the official docs — worth running it once to see the response structure.
3. There's a cache discount mechanism — make use of it for long-context scenarios, it saves a lot.

This is a genuine freebie: the official team gave away the most painful part of search infrastructure. If you need it, just copy the homework.

Related: [DeepSeek V4 Flash — hands-on review of the stable release](/blog/deepseek-v4-flash-review)