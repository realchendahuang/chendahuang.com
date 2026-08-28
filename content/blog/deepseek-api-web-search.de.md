---
title: DeepSeek baut Websuche direkt in die API – mit der Responses API die offizielle Suchpower gratis abgreifen
description: "DeepSeek hat Websuche offiziell in die API eingebaut: Rufe deepseek-v4-flash über den Responses-Endpoint auf, deklariere das web_search-Tool, fertig – kein Drittanbieter-Suchdienst, kein eigener Such-Key nötig."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - AI-Tools
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original auf [X](https://x.com/realchendahuang/status/2084826975102030013), der Post lief richtig heiß: 230.000 Views, 1000+ Likes. Hier löse ich die Details ausführlich auf.

Ich hab was Gutes entdeckt: DeepSeek hat ernsthaft Websuche direkt in die API eingebaut.

## In einem Satz erklärt

Rufst du das Modell `deepseek-v4-flash` über den **Responses**-Endpoint auf und deklarierst einfach das Tool `web_search` in den Request-Parametern, nutzt du direkt die serverseitig ausgeführte Suchfunktion von DeepSeek.

Kein eigener Anschluss an Drittanbieter-Suchmaschinen, kein extra Such-API-Key – der komplette Suchkram übernimmt offiziell DeepSeek.

## So nutzt du es

Offizielle Doku: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Der Kern: einfach das Tool deklarieren.

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
    input: 'Was ist im August 2026 Großes in der AI-Branche passiert?'
  })
})
```

Das war's. Suchen, Crawlen, Parsen, Zitieren – der Rest passiert komplett serverseitig bei DeepSeek.

## Warum das ein Gamechanger ist

Früher musstest du für aktuelle Infos der AI eine eigene Pipeline bauen: Suchmaschine wählen (SerpAPI, Bing Search etc.) → API-Key beantragen → Crawl- und Parse-Code schreiben → Suchergebnisse in den Kontext stopfen → und zwischendrin das Budget im Auge behalten.

Das kostet dich schnell ein, zwei Tage, im Zweifel eine ganze Woche – und jede Stufe kostet Geld: Such-APIs werden pro Aufruf abgerechnet, und beim Crawlen musst du dich mit Anti-Scraping-Maßnahmen herumschlagen.

Jetzt hat DeepSeek das einfach eingebaut – und zwar auf Basis von `deepseek-v4-flash`, dem lächerlich günstigen Modell. Suchen und Generieren in einer Pipeline, Kosten so niedrig, dass du's wie Leitungswasser verbrauchen kannst.

## Für welche Szenarien das taugt

- Inhalte, die aktuell sein müssen (Branchen-News, Produktvergleiche, Politikinhalte)
- Agenten: Schritte, in denen erst recherchiert, dann entschieden wird
- Support-/Q&A-Systeme: vor der Antwort kurz die neuesten Infos checken
- Alles, wo ein "Knowledge Cutoff" des Modells im Weg steht

## Hinweise

1. **Nutze den Responses-Endpoint**, nicht den alten Chat Completions. Der alte hat dieses Tool nicht.
2. Granularität und Zitierformat der Websuche stehen in der offiziellen Doku – probier es ruhig aus und schau dir die Antwortstruktur an.
3. Es gibt Cache-Rabatte. Bei langen Kontexten unbedingt ausnutzen – da spart man einiges.

Der Post ist echtes Gratis-Geschenk: Die offizielle Seite verschenkt dir die komplette, lästige Such-Infrastruktur. Wer es braucht, kopiert einfach die Lösung.

Weiterlesen: [DeepSeek V4 Flash – der Langzeittest](/blog/deepseek-v4-flash-review)