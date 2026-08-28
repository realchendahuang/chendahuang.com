---
title: DeepSeek intègre la recherche web dans son API — la recherche officielle à l'œil via Responses API
description: "DeepSeek a intégré la recherche web directement dans son API : il suffit d'appeler deepseek-v4-flash via l'interface Responses et de déclarer l'outil web_search. Pas besoin de moteur tiers, pas besoin de clé de recherche."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Outil IA
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publié à l'origine sur [X](https://x.com/realchendahuang/status/2084826975102030013) — ce post a cartonné : 230 000 vues, 1000+ likes. Ici je détaille tout le truc.

J'ai déniché un truc bien : DeepSeek a carrément intégré la recherche web dans son API officielle.

## En une phrase

Appelle `deepseek-v4-flash` via l'interface au format **Responses**, déclare l'outil `web_search` dans les paramètres de la requête, et tu profites direct de la recherche exécutée côté serveur DeepSeek.

Pas besoin de brancher soi-même un moteur tiers, pas besoin de demander une clé d'API de recherche : toute la chaîne de recherche est hébergée officiellement.

## Comment l'utiliser

Doc officielle : <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Le cœur du truc, c'est de déclarer l'outil :

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

C'est tout. La recherche, le scraping, le parsing, les citations — tout est géré côté serveur DeepSeek.

## Pourquoi c'est un gros deal

Avant, pour donner de l'info en temps réel à une IA, il fallait monter soi-même toute la chaîne : choisir un moteur (SerpAPI, Bing Search, peu importe) → demander une clé API → écrire le code de scraping et de parsing → injecter les résultats de recherche dans le contexte → et surveiller le budget.

Tout ça, c'est minimum un jour ou deux, parfois une semaine, et chaque brique coûte de la thune : l'API de recherche est facturée à l'appel, et le scraping doit gérer l'anti-bot.

Maintenant DeepSeek l'intègre nativement, et en plus avec `deepseek-v4-flash`, ce modèle absurdement pas cher. La recherche et la génération dans une seule chaîne, à un coût si bas qu'on peut s'en servir comme de l'eau courante.

## Pour quels usages

- Écrire du contenu sensible à l'actualité (actus secteur, comparatifs produits, décryptages)
- Construire des Agents : les étapes qui exigent de chercher des infos avant de décider
- Support / FAQ : chercher la toute dernière info avant de répondre
- Tous les scénarios où « la date butoir des connaissances du modèle » freine

## À noter

1. **Utilise l'interface Responses**, pas l'ancienne Chat Completions. L'ancienne n'a pas cet outil.
2. La granularité de la recherche web et le format de citation sont détaillés dans la doc officielle ; je conseille de faire un vrai test pour voir la structure du retour.
3. Il y a un mécanisme de remise sur le cache : en long contexte, pense à en profiter, ça économise pas mal.

Ce truc, c'est du vrai « à l'œil » : l'officiel t'offre l'infrastructure de recherche, la partie la plus galère. Ceux qui en ont besoin n'ont qu'à recopier la recette.

À lire aussi : [Retour en profondeur sur DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)