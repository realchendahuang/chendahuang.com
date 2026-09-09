---
title: "순정 Harness가 곧 버전 정답은 아니다: 오픈 모델 시대에는 모델과 Harness를 따로 골라라"
description: "Claude 쓰면 Claude Code? 오픈 모델 시대에는 이 직관을 업그레이드할 때다. 순정의 강점은 진짜지만, 좋은 모델을 만드는 일과 좋은 Harness를 만드는 일은 별개의 공학이다 — 이 글은 모델과 Harness를 분리해서 선택할 수 있게 된 이유와 다섯 가지 Harness의 포지셔닝 맵을 정리한다."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - 도구 선택
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 핵심 주장은 먼저 [X](https://x.com/realchendahuang/status/2093890559874388141)에 게시했다. 이 글은 완전판 논의에 다섯 가지 Harness의 포지셔닝 맵을 덧붙인 것이다.

Coding Agent를 고를 때 많은 사람의 첫 반응은 아주 자연스럽다: Claude 쓰면 Claude Code, GPT 쓰면 Codex, GLM 쓰면 ZCode, DeepSeek 쓰면 당연히 DeepSeek 순정 Harness부터 고려한다.

이 사고방식은 사실 전적으로 합리적이다. 순정의 최대 강점은 자기 모델을 가장 잘 안다는 것이다.

## 순정의 강점은 진짜다

모델이 어떤 Prompt를 좋아하는지, Tool Schema를 어떻게 설계해야 가장 안정적인지, 긴 Context를 어떻게 구성할지, 새 버전에 어떤 능력이 추가됐는지, 어디서 가장 쉽게 넘어지는지 — 순정은 보통 서드파티보다 먼저 안다.

그래서 Claude Code나 Codex처럼 모델과 Harness가 오래 함께 발전해 온 제품은, 순정 조합이 흔히 가장 강한 버전 정답이 된다. 이 점은 반박하지 않는다.

## 하지만 모델 학습과 Harness 개발은 완전히 다른 공학이다

DeepSeek, GLM 같은 오픈 모델로 오면 이야기가 재미있어지기 시작한다. 좋은 모델을 만드는 일과 좋은 Harness를 만드는 일은 사실 완전히 다른 공학이기 때문이다.

Coding Agent가 실제로 돌아가기 시작하면, 모델 밖의 문제가 잔뜩 나타난다:

- 파일을 어떻게 읽고, 코드를 어떻게 고칠 것인가
- Agent Loop를 어떻게 제어하고, Context를 어떻게 압축할 것인가
- Cache를 어떻게 활용하고, Tool Call이 실패한 뒤 어떻게 복구할 것인가
- Subagent를 어떻게 스케줄링하고, 권한을 어떻게 관리할 것인가

이 부분들의 완성도가 같은 모델의 최종 사용감을 직접 좌우한다. 같은 모델도 Harness를 바꾸면 천지차이가 될 수 있다.

## 더 큰 문제: 모델 갱신 속도가 너무 빠르다

오늘은 GLM이 강하고, 다음 달엔 DeepSeek이 더 강한 Flash를 또 내놓을지 모르고, 그 뒤로 또 새 모델이 따라잡는다.

Coding 워크플로 전체가 한 회사의 순정 제품에 묶여 있으면, 모델을 바꿀 때 도구와 습관까지 갈아엎어야 하는 경우가 많다. 몇 달에 걸쳐 길러낸 설정, 기억, 워크플로가 전부 무너진다.

서드파티 Harness의 가치가 바로 여기 있다: **자기가 익숙한 도구, Skills, MCP, 권한, 워크플로는 고정해 두고, 아래의 모델만 교체할 수 있다.** 오늘은 DeepSeek, 내일은 GLM, 모레는 다른 모델 — 작업 환경은 처음부터 다시 만들 필요가 없다.

## 다섯 가지 Harness 포지셔닝 맵

주요 다섯 곳의 포지셔닝을 정리한다(2026년 8월 말 기준 내 사용 경험):

**Pi**: 철학이 극도로 미니멀하다. Harness가 모델에 최대한 개입하지 않는다. 가볍고, 빠르고, Token 소모가 적고, 가소성이 극히 높다. 자기만의 장기 Agent 기반으로 삼기에 알맞다. 단순하고, 깔끔하고, 마음대로 개조할 수 있다.

**OMP**: Pi 위에 LSP, Debugger, Browser, AST 같은 무거운 Coding 능력을 계속 쌓는다. Agent에 IDE 한 벌을 통째로 장착시키는 셈이다. 진짜 헤비하게 코딩하고, 복잡한 Repo 탐색이 필요한 상황에 알맞다.

**DeepSeek Harness**: 가장 멀리 갔다. Everything is Plugin — Agent Loop, 도구, 권한, Preset, UI를 모두 분해해 재조립할 수 있다. Agent 아키텍처, Preset, 멀티 Agent, 차세대 Runtime를 만지작거리고 싶은 사람에게 알맞다. PTC 모드를 더 써보라. 더 빠르고 token도 아낀다.

**OpenCode**: 현재 가장 균형 잡힌 부류. 오픈소스이고, Provider가 많고, 생태계가 크고, Client/Server, 데스크톱, Subagent가 모두 성숙했다. 성숙한 범용 멀티모델 Coding Agent를 통째로 원하는 사람에게 알맞다.

**Command Code**: 노선이 완전히 다르다 — 모델의 빈틈을 대신 메워주는 걸 특히 좋아한다. Tool Call 인자를 잘못 쓰면 로컬에서 고쳐주고, 중복 파일 읽기는 중복을 걸러주고, 긴 Session에서는 Stable Prefix를 유지해 Cache Hit를 높이고, Context가 터질 위기면 Compaction을 한다. 이 사고방식을 DeepSeek V4 Flash, GLM-5.3 Flash 같은 노동력 모델에 얹으면 가치가 최대가 된다: 모델이 조금 부족해도 Harness가 메워준다.

## 나의 선택 기준

장기 가소성만 보면 나는 여전히 Pi를 선호한다. 하지만 오늘 당장 DeepSeek V4 Flash나 GLM-5.3으로 빡세게 일시켜야 한다면 Command Code의 맛을 제대로 보겠다 — 모델과 Harness의 조합은 과제별로 맞추는 것이지, 진영별로 서는 것이 아니다.

오픈 모델 시대에 이르러 모델과 Harness는 이제 완전히 따로 고를 수 있다. **"어느 회사 모델에는 어느 회사 도구"라는 질문은 그만두고, "이 모델을 어느 Harness에 넣어야 가장 잘 일하는가"를 물어라.**
