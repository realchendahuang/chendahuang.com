---
title: DeepSeek API 内置联网搜索，Responses API 白嫖官方搜索能力
description: DeepSeek 官方在 API 里内置了联网搜索：用 Responses 接口调用 deepseek-v4-flash，声明 web_search 工具即可，不用对接第三方搜索引擎，不用申请搜索密钥。
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文发在 [X](https://x.com/realchendahuang/status/2084826975102030013)，这条火了，23 万浏览、1000+ 赞。这里把细节展开讲清楚。

发现个好东西：DeepSeek 官方居然在 API 里内置了联网搜索。

## 一句话说清楚

用 **Responses 格式**的接口调用 `deepseek-v4-flash` 模型，只要在请求参数里声明 `web_search` 工具，就能直接用上 DeepSeek 服务端执行的搜索能力。

不用自己对接第三方搜索引擎，不用额外申请搜索接口密钥，整套搜索流程官方直接托管了。

## 怎么用

官方文档：<https://api-docs.deepseek.com/zh-cn/guides/responses_api>

核心就是把工具声明出来：

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

就这么多。剩下的搜索、抓取、解析、引用，全是 DeepSeek 服务端干的活。

## 为什么这件事很关键

以前要让 AI 有实时信息，你需要自己搭一条链路：选搜索引擎（SerpAPI、Bing Search 之类）→ 申请 API Key → 写抓取和解析代码 → 把搜索结果塞进上下文 → 还要控制预算。

这一套下来，少说一两天，多了没准一周，而且每个环节都是钱：搜索 API 按次计费，抓取还要处理反爬。

现在 DeepSeek 直接内置了，而且用的是 `deepseek-v4-flash` 这个便宜到离谱的模型。搜索和生成一条链路，成本低到可以当自来水用。

## 适合什么场景

- 写需要时效性的内容（行业资讯、产品对比、政策解读）
- 做 Agent：需要查资料再决策的环节
- 客服/答疑系统：回答前先搜一下最新的信息
- 任何"模型知识截止日期"拖后腿的场景

## 注意事项

1. **用 Responses 接口**，不是老的 Chat Completions 接口。老接口没有这个工具。
2. 联网搜索的粒度、引用格式，官方文档里都有，建议实际跑一下看返回结构。
3. 有缓存打折机制，长上下文场景记得利用起来，能省不少。

这条是真·白嫖，官方把最麻烦的搜索基础设施免费送你了。有需要的直接抄作业。

相关阅读：[DeepSeek V4 Flash 正式版深度体验](/blog/deepseek-v4-flash-review)
