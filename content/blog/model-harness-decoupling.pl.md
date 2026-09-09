---
title: "Harness first-party nie zawsze jest wersją zwycięską: w epoce modeli otwartych wybieraj model i Harness osobno"
description: "Używasz Claude? Bierzesz Claude Code. W epoce modeli otwartych ten instynkt wymaga aktualizacji. Przewaga first-party jest realna, ale wytrenowanie dobrego modelu i zbudowanie dobrego Harnessa to dwie różne dziedziny inżynierii — ten artykuł wyjaśnia, dlaczego model i Harness można już wybierać osobno, plus mapę pozycjonowania pięciu Harnessów."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Wybór narzędzi
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Główny argument po raz pierwszy ukazał się na [X](https://x.com/realchendahuang/status/2093890559874388141); to pełna wersja rozważań, z mapą pozycjonowania pięciu Harnessów.

Pierwszy odruch większości ludzi przy wyborze Coding Agent jest zupełnie naturalny: Claude? To Claude Code. GPT? Codex. GLM? ZCode. DeepSeek? No oczywiście najpierw własny Harness od DeepSeek.

To myślenie jest w gruncie rzeczy całkowicie rozsądne. Największa przewaga first-party polega na tym, że nikt nie zna lepiej własnego modelu.

## Przewaga first-party jest realna

Jakie prompty lubi model, jaki projekt Tool Schema jest najbardziej stabilny, jak zorganizować długi kontekst, jakie możliwości dodaje nowe wydanie, gdzie najłatwiej się potknąć — first-party zwykle wie to wszystko wcześniej niż osoby trzecie.

Więc w produktach takich jak Claude Code i Codex, gdzie model i Harness iterują razem przez długi czas, kombinacja first-party bywa najsilniejszą wersją odpowiedzi. Tego nie kwestionuję.

## Ale trenowanie modelu i budowanie Harnessa to dwie zupełnie różne dziedziny inżynierii

Kiedy dochodzimy do otwartych modeli typu DeepSeek czy GLM, robi się ciekawie — bo wytrenowanie dobrego modelu i zbudowanie dobrego Harnessa to w istocie dwie zupełnie różne dziedziny inżynierii.

Gdy Coding Agent naprawdę rusza, pojawia się masa problemów spoza samego modelu:

- Jak czytać pliki i jak edytować kod
- Jak sterować Agent Loop i jak kompresować Context
- Jak wykorzystywać Cache i jak odrabiać błędy Tool Call
- Jak szeregowywać Subagenty i jak zarządzać uprawnieniami

Jak dobrze te rzeczy zrobiono, bezpośrednio decyduje o tym, czy ten sam model ostatecznie dobrze się używa. Ten sam model w innym Harnessie może dać doświadczenie jak niebo a ziemia.

## Większy problem: modele aktualizują się zbyt szybko

Dziś najsilniejszy jest GLM, w przyszłym miesiącu DeepSeek może wypuścić mocniejszy Flash, a po chwili dogoni kolejny nowy model.

Jeśli cały workflow kodowania jest przywiązany do produktu jednego first-party, zmiana modelu często oznacza zmianę narzędzi i nawyków. Konfiguracje, pamięci i workflow szlifowane miesiącami — wszystko do wyburzenia.

Tu właśnie bronią się Harnessy firm trzecich: **możesz przytwierdzić swoje znane narzędzia, Skills, MCP, uprawnienia i workflow, a wymienić tylko model pod spodem.** Dziś działa DeepSeek, jutro podmieniasz na GLM, pojutze na coś innego — środowiska pracy nie trzeba budować od nowa.

## Mapa pozycjonowania pięciu Harnessów

Uporządkujmy pozycje piątki głównych graczy (według mojego doświadczenia na koniec sierpnia 2026):

**Pi**: filozofia minimalistyczna; Harness ingeruje w model jak najmniej. Lekki, szybki, niski narzut Tokenów, wybitnie podatny na kształtowanie. Nadaje się jako fundament własnego długoterminowego agenta — prosty, czysty, do modyfikowania do woli.

**OMP**: dalej dokłada na Pi ciężkie zdolności kodowania — LSP, Debugger, Browser, AST — jakby wyposażyć agenta w pełne IDE. Dla tych, którzy naprawdę ciężko kodują i potrzebują złożonej nawigacji po repo.

**DeepSeek Harness**: idzie najdalej — Everything is Plugin. Agent Loop, narzędzia, uprawnienia, Presety i UI — wszystko można rozebrać i złożyć na nowo. Dla grzebiących w architekturze agentów, Presetach, multi-agencie i Runtime nowej generacji. Wypróbuj częściej tryb PTC — szybszy i oszczędniejszy w tokeny.

**OpenCode**: obecnie najbardziej wyrównany — open source, wielu Providerów, duży ekosystem, dojrzałe Client/Server, aplikacja desktopowa i Subagenty. Dla każdego, kto chce dojrzałego, ogólnego, wielomodelowego Coding Agenta.

**Command Code**: zupełnie inna droga — uwielbia łatać dziury za modelem. Źle zapisane parametry Tool Call naprawiane lokalnie; dublujące się odczyty plików deduplikowane; długie sesje utrzymują Stable Prefix, by podbić Cache Hit; gdy Context zaraz eksploduje, następuje Compaction. To podejście daje największą wartość na haraczych modelach typu DeepSeek V4 Flash czy GLM-5.3 Flash: model słabszy — Harness go łata.

## Jak ja wybieram

Jeśli patrzeć wyłącznie na długoterminową podatność na przeróbki, wciąż wolę Pi. Ale gdybym dziś miał zmusić DeepSeek V4 Flash czy GLM-5.3 do serio harówki, naprawdę skosztowałbym Command Code — para model i Harness jest konfigurowana pod zadanie, nie pod obóz.

W epoce modeli otwartych model i Harness można już w pełni wybierać osobno. **Przestań pytać „model czyjej firmy — czyje narzędzie”, zacznij pytać „w którym Harnessie ten model pracuje najlepiej”.**
