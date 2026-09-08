---
title: "2026 인디 개발 베스트 프랙티스: Cloudflare 가난뱅이 올인원 스택"
description: "인디 개발자를 위한 무료 기술 스택: 코드는 Codex, 버전 관리는 GitHub, 결제는 Stripe, 프런트엔드는 TanStack Start, 백엔드는 Hono + Workers, 데이터베이스는 D1, 스토리지는 R2, 캐시는 KV — 전부 Cloudflare 위에서 돌아간다."
date: 2026-06-15
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2066586160902881542
tags:
  - Cloudflare
  - 인디 개발
  - 기술 스택
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 고정 글. 원문은 [X](https://x.com/realchendahuang/status/2066586160902881542)에 게시되었습니다. 4만+ 조회수.

2026년 인디 개발 베스트 프랙티스: **Cloudflare 가난뱅이 올인원 스택**.

## 기술 스택 한눈에 보기

| 영역 | 선택 | 비용 |
|------|------|------|
| 코드 작성 | Codex | 구독제 |
| 버전 관리 | GitHub | 무료 |
| 결제 | Stripe | 건당 수수료 |
| 프런트엔드 | TanStack Start | 무료 |
| 백엔드 | Hono + Cloudflare Workers | 무료 할당량 |
| 배포 | Cloudflare Pages | 무료 |
| 데이터베이스 | Cloudflare D1 | 무료 할당량 |
| 파일 스토리지 | Cloudflare R2 | 무료 할당량 |
| 캐시 / 설정 | Cloudflare KV | 무료 할당량 |

## 왜 이 조합인가

### Codex: 코드를 쓰고 풀스택 개발을 해결한다

AI 코딩은 이미 인디 개발자의 기본 생산성 도구가 됐다. Codex의 Agent 모드는 "요구사항 → 코드 → 테스트 → 배포"의 파이프라인을 거의 한 순간으로 압축한다. 한 명이 팀 전체의 일을 하는 셈이다.

### 프런트엔드 TanStack Start + 백엔드 Hono

TanStack Start는 Workers 생태계와 잘 맞는 풀스택 React 프레임워크다. 백엔드는 Hono — Workers를 위해 태어난 작은 프레임워크로, 라우팅과 미들웨어, 타입 힌트 모두 쾌적하고, 용량은 작고 시작은 빠르다.

### 데이터베이스 D1 + 스토리지 R2 + 캐시 KV

이 삼총사가 Cloudflare 무료 할당량의 핵심이다:

- **D1**: SQLite 호환 관계형 데이터베이스. 개인 프로젝트에는 무료 할당량만으로 충분하다.
- **R2**: S3 호환 객체 스토리지. 10GB 무료 스토리지에 아웃바운드(이그레스) 요금이 0원 — 이것 하나만으로 AWS를 압살한다.
- **KV**: 전 세계에 분산된 키-값 스토리지. 설정, 캐시, 세션에 안성맞춤이다.

### Pages 배포 + 전부 무료인 인프라

Pages는 GitHub 저장소에 바로 연결된다. push 하면 배포되고, CDN과 HTTPS가 기본 포함이다. 도메인, DNS, CDN까지 Cloudflare에서 원스톱으로 해결된다. 무료 할당량이 제품 라인 하나를 통째로 지탱한다.

## 가난뱅이 전략의 핵심

- **무료 할당량을 끝까지 긁어쓴다**: DNS, CDN, Pages, Workers, KV, D1, R2, Tunnel, AI Gateway — 무료인 건 죄다 챙긴다.
- **무료로 쓸 수 있으면 돈을 안 쓴다**: 구독비는 정말 필요한 곳(Codex)에만 쓰고, 나머지는 전부 무료 인프라로 돌린다.
- **한 플랫폼으로 모든 걸 처리한다**: 여러 클라우드를 오갈 필요가 없어서 운영에 드는 인지 부담이 최소화된다.

## 이런 사람에게 맞다

예산이 빠듯하면서 제품을 빠르게 검증하고 싶은 인디 개발자, 인프라에 힘을 쏟고 싶지 않은 AI 코딩 애호가, 그리고 "일단 만들고 나중에 생각하자"는 모든 프로젝트.

Cloudflare는 인디 개발자의 사이버 보살이다. 한 푼도 들이지 않고도 제품을 완전히 돌릴 수 있다. 자세한 내용: [무료 사용자가 Cloudflare를 끝까지 짜먹는 법](/blog/free-cloudflare).
