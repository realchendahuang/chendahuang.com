---
title: DeepSeek API에 내장된 웹 검색 — Responses API로 공식 검색을 공짜로 쓰자
description: "DeepSeek가 API 안에 웹 검색을 내장했다: Responses 인터페이스로 deepseek-v4-flash를 호출하고 web_search 도구만 선언하면 된다. 타사 검색 엔진 연동도, 검색 API 키도 필요 없다."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - AI 도구
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 원문은 [X](https://x.com/realchendahuang/status/2084826975102030013)에 게시되었습니다. 이 글이 불타올랐습니다. 조회수 23만, 좋아요 1000+. 여기서는 세부 내용을 풀어서 설명합니다.

좋은 걸 발견했다: DeepSeek가 API 안에 웹 검색을 직접 내장했다.

## 한 문장으로 정리하면

**Responses** 인터페이스로 `deepseek-v4-flash` 모델을 호출하고, 요청 파라미터에 `web_search` 도구만 선언하면 DeepSeek 서버 측 검색 능력을 바로 쓸 수 있다.

타사 검색 엔진을 연동할 필요도, 별도 검색 API 키를 신청할 필요도 없다. 검색 파이프라인 전체가 DeepSeek가 호스팅한다.

## 사용법

공식 문서: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

핵심은 그냥 도구를 선언하는 것뿐이다:

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
    input: '2026년 8월 AI 업계에 무슨 큰일이 있었나?'
  })
})
```

이게 전부다. 검색하고, 가져오고, 파싱하고, 인용하는 일은 전부 DeepSeek 서버 쪽에서 처리한다.

## 왜 중요한가

예전에는 AI에게 실시간 정보를 주려면 파이프라인을 직접 구축해야 했다: 검색 엔진을 고르고(SerpAPI, Bing Search 등) → API 키를 신청하고 → 가져오고 파싱하는 코드를 짜고 → 결과를 컨텍스트에 넣고 → 예산을 관리해야 했다.

이렇게 하면 최소 하루 이틀, 꼬이면 일주일도 걸리는데, 단계마다 돈이 들었다. 검색 API는 요청당 과금되고, 스크래핑은 안티봇과 싸워야 한다.

이제 DeepSeek가 그냥 내장해버렸다. 게다가 쓰는 모델은 터무니없이 싼 `deepseek-v4-flash`다. 검색과 생성이 하나의 파이프라인으로 이어져서, 수돗물 쓰듯 써도 될 만큼 싸다.

## 잘 맞는 시나리오

- 최신성이 중요한 글쓰기(업계 뉴스, 제품 비교, 정책 해설)
- Agent 구축: 결정하기 전에 자료를 찾아봐야 하는 단계
- 고객 지원 / Q&A 시스템: 답변하기 전에 최신 정보를 검색하는 경우
- 모델의 지식 컷오프가 발목을 잡는 모든 시나리오

## 주의사항

1. **Responses 인터페이스를 쓸 것**, 옛 Chat Completions 인터페이스가 아니라. 옛 인터페이스에는 이 도구가 없다.
2. 웹 검색의 세밀함과 인용 형식은 공식 문서에 나와 있으니, 한 번 실행해서 응답 구조를 확인해 보길 권한다.
3. 캐시 할인 메커니즘이 있다. 긴 컨텍스트 시나리오에서는 적극 활용하자. 꽤 아낄 수 있다.

이건 진짜 공짜다. 공식 팀이 검색 인프라에서 가장 골치 아픈 부분을 그냥 선물로 줬다. 필요하면 그냥 이 숙제를 베껴 쓰면 된다.

관련 글: [DeepSeek V4 Flash — 정식 버전 핸즈온 리뷰](/blog/deepseek-v4-flash-review)
