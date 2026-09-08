---
title: DeepSeek ma w API wbudowane wyszukiwanie w sieci — darmowa oficjalna funkcja wyszukiwania przez Responses API
description: "DeepSeek wbudował wyszukiwanie w sieci prosto w API: wywołaj deepseek-v4-flash przez interfejs Responses i zadeklaruj narzędzie web_search. Bez integracji z zewnętrzną wyszukiwarką, bez klucza API do wyszukiwania."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Narzędzia AI
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Pierwotnie opublikowane na [X](https://x.com/realchendahuang/status/2084826975102030013). Ten post się rozkręcił — 230 tys. wyświetleń, 1000+ polubień. Tutaj rozwinięte szczegóły.

Znalazłem coś świetnego: DeepSeek wbudował wyszukiwanie w sieci bezpośrednio w swoje API.

## W jednym zdaniu

Wywołaj model `deepseek-v4-flash` przez interfejs **Responses**. Wystarczy zadeklarować narzędzie `web_search` w parametrach żądania, a dostajesz wykonywaną po stronie serwera DeepSeek możliwość wyszukiwania.

Bez integracji z zewnętrzną wyszukiwarką, bez ubiegania się o osobny klucz do interfejsu wyszukiwania — cały proces wyszukiwania jest obsługiwany przez DeepSeek.

## Jak to działa

Oficjalna dokumentacja: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Sednem jest tylko zadeklarowanie narzędzia:

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

I tyle. Wyszukiwanie, pobieranie, parsowanie i cytowanie — wszystko odbywa się po stronie DeepSeeka.

## Dlaczego to ważne

Wcześniej, żeby dać AI dostęp do informacji na bieżąco, musiałeś zbudować cały łańcuch sam: wybrać wyszukiwarkę (SerpAPI, Bing Search, cokolwiek) → zdobyć klucz API → napisać kod pobierania i parsowania → włożyć wyniki do kontekstu → pilnować budżetu.

To co najmniej dzień albo dwa, może tydzień, jeśli coś się posypie, a każdy krok kosztuje: interfejsy wyszukiwarek rozliczają za żądanie, a skrobanie oznacza walkę z zabezpieczeniami antybotowymi.

Teraz DeepSeek po prostu to wbudował, korzystając z absurdalnie taniego modelu `deepseek-v4-flash`. Wyszukiwanie i generowanie w jednym łańcuchu, na tyle tanio, że można używać jak wody z kranu.

## Dobre przypadki użycia

- Pisanie czegokolwiek, co zależy od aktualności (wiadomości z branży, porównania produktów, objaśnienia polityki)
- Budowanie agentów: kroki, które wymagają sprawdzenia czegoś przed podjęciem decyzji
- Systemy obsługi klienta / Q&A: wyszukaj najnowsze informacje przed odpowiedzią
- Każdy scenariusz, w którym blokuje cię data graniczna wiedzy modelu

## Uwagi

1. **Używaj interfejsu Responses**, nie starego interfejsu Chat Completions. Stary nie ma tego narzędzia.
2. Granularność wyszukiwania w sieci i format cytowań są w oficjalnej dokumentacji — warto raz uruchomić i zobaczyć strukturę odpowiedzi.
3. Jest mechanizm zniżek za cache — wykorzystaj go w scenariuszach z długim kontekstem, sporo oszczędza.

To prawdziwa darmocha: oficjalny zespół oddał za darmo najbardziej bolesną część infrastruktury wyszukiwania. Jeśli tego potrzebujesz, po prostu przepisz rozwiązanie.

Powiązane: [DeepSeek V4 Flash — recenzja wersji stabilnej z praktyki](/blog/deepseek-v4-flash-review)
