---
title: Pi Agent, OMP, Codex, ZCode를 이리저리 만져본 끝에, 내가 마지막으로 OpenCode + OpenChamber를 고른 이유
description: "Agent Harness 선택 회고: GUI 경험, 벤더 종속, 2차 개발 자유도라는 세 가지 기준으로 Pi Agent, OMP, Codex, ZCode를 탈락시키고, 마지막으로 OpenCode 코어 + OpenChamber 인터페이스를 선택했다."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - 도구 선택
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 원문은 [X](https://x.com/realchendahuang/status/2085410520459604026)에 게시되었습니다.

최근에 Pi Agent, OMP, ZCode, Codex, OpenCode 같은 Agent Harness를 이것저것 만져보면서, 드디어 내가 실제로 원하는 게 무엇인지 깨달았다.

## 내 세 가지 기준

### 첫째: 성숙하고 안정적인 GUI

GUI에 익숙해진 나는 TUI를 도저히 못 쓰겠다. 까만 터미널 창 안에서 대화하는 건 너무 괴롭다. 단축키와 명령어를 잔뜩 외워야 비로소 쓸 수 있기 때문이다. 반면 GUI는 아이콘과 버튼을 직관적으로 눌러주기만 하면 된다.

그래서 나는 성숙하고, 안정적이고, 보기 좋은 GUI가 반드시 필요하다.

이 기준 하나만으로 **Pi Agent**와 **OMP**는 탈락이다. 코어가 나쁘다는 뜻이 아니다. 그 주변에 붙은 커뮤니티 GUI가 너무 형편없다는 것이다. 직접 만들자니 큰 노력이 들고, 게다가 이런 도구는 커스터마이징 여지가 워낙 넓어서 손수 만든 GUI는 이식성이 없다. 기계를 바꾸거나 사람을 바꾸면 모든 게 처음부터 다시 시작이다.

### 둘째: 벤더 종속 없음, 벤더 편애 없음

Codex는 실제로 타사 모델을 위한 설정 인터페이스를 열어주긴 했지만, 설정이 정말 번거롭고 타사 모델은 언제나 "2등 시민"이다. 공식 모델에 눌려 있고 업데이트 주기에 끌려다니는데, 이게 정말 짜증난다.

ZCode는 더 황당하다. 각 벤더의 Coding Plan에 OAuth로 로그인할 방법이 없다(예를 들어 Kimi For Code나 Grok Build는 ZCode에서 아예 쓸 수 없다. 억지로 우회하지 않는 한).

그래서 나는 ZCode, Codex처럼 모델 벤더를 편애하는 소프트웨어를 배제했다.

### 셋째: 오픈소스, 2차 개발 가능

나는 내 필요에 따라 2차 개발과 커스터마이징을 해서, 고객에게 더 편한 out-of-the-box 경험을 선물하고 싶다. 그래서 반드시 오픈소스이고 라이선스가 자유로운 제품이어야 한다. 내가 쓰기에도 편하고, 고객이 쓰기에도 복잡한 hack을 동원하지 않고 간단하게 쓸 수 있는 그런 제품 말이다.

## 최종 답: OpenCode + OpenChamber

모두 걸러내고 나면, 실제로 선택할 수 있는 건 **OpenCode**뿐이다.

하지만 OpenCode는 그저 Agent 코어일 뿐이다. 여기에 성숙하고 안정적이며 쓰기 좋은 GUI를 붙이려고 찾다가, 마침내 진짜 답을 발견했다. 바로 **OpenChamber**다.

- 코어: OpenCode, 오픈소스, 벤더 종속 없음, 각 벤더의 모델을 모두 지원
- 인터페이스: OpenChamber, 성숙한 GUI 워크벤치
- 조합: 안정적인 코어 + 편안한 인터페이스, 필요하면 언제든 2차 개발 가능

오픈소스: <https://github.com/openchamber/openchamber>

## 몇 가지 소회

도구를 고른다는 것은 본질적으로 "누가 너에 대한 발언권을 쥐고 있느냐"를 고르는 일이다.

폐쇄형 도구가 아무리 좋아도 업데이트 방향, 모델 지원, 가격 정책 모두 남이 정하는 것이고, 우리는 그저 수동적으로 받아들일 수밖에 없다. 오픈소스 + 비종속 조합은 언제나 퇴로가 있고, 언제나 수정할 자유가 있다.

TUI와 GUI 논쟁은 억지로 끌고 가지 말자. 도구는 일을 하기 위한 것이지, 내가 커맨드라인을 안다는 걸 증명하기 위한 게 아니다. 오래 쓰기 편한 인터페이스가 그 무엇보다 중요하다.

관련 글: [DeepSeek V4 Flash 정식 버전 심층 체험](/blog/deepseek-v4-flash-review)
