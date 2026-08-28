---
title: Busca na web embutida na API do DeepSeek — Responses API de graça com busca oficial
description: "O DeepSeek embutiu busca na web na API oficial: é só chamar o deepseek-v4-flash pelo endpoint Responses declarando a ferramenta web_search, sem integrar buscador de terceiros e sem pedir chave de busca."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Ferramenta de IA
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original postado no [X](https://x.com/realchendahuang/status/2084826975102030013), essa bombou: 230 mil visualizações, 1000+ curtidas. Vou destrinchar os detalhes aqui.

Achei uma joia: o DeepSeek embutiu busca na web na própria API.

## Explicando em uma frase

Chamando o modelo `deepseek-v4-flash` pelo endpoint no formato **Responses**, é só declarar a ferramenta `web_search` nos parâmetros da requisição e pronto — a busca rola executada no servidor do DeepSeek.

Sem integrar buscador de terceiros, sem pedir chave de busca, sem nada. O fluxo de busca inteiro é hospedado oficialmente.

## Como usar

Documentação oficial: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

O essencial é declarar a ferramenta:

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
    input: 'O que de importante aconteceu na indústria de IA em agosto de 2026?'
  })
})
```

É só isso. Busca, scraping, parsing e citação ficam todos do lado do servidor do DeepSeek.

## Por que isso é tão importante

Antes, para dar informação em tempo real à IA, você precisava montar a pipeline você mesmo: escolher um buscador (SerpAPI, Bing Search etc.) → pedir uma API Key → escrever o código de scraping e parsing → enfiar o resultado no contexto → e ainda controlar o orçamento.

Tudo isso leva de um a dois dias no mínimo, quando não uma semana — e cada etapa custa dinheiro: a API de busca cobra por chamada, e o scraping ainda tem que brigar com anti-bot.

Agora o DeepSeek já entregou embutido, e ainda por cima usando o `deepseek-v4-flash`, modelo barato de doer. Busca e geração numa cadeia só, com custo baixo o bastante para usar como água corrente.

## Para quais cenários serve

- Conteúdo que precisa de atualidade (notícias da indústria, comparação de produtos, explicar políticas)
- Agents: etapas em que é preciso pesquisar antes de decidir
- Sistemas de atendimento/FAQ: buscar informação atualizada antes de responder
- Qualquer caso em que o "prazo do conhecimento do modelo" atrapalha

## Avisos

1. **Use o endpoint Responses**, não o Chat Completions antigo. O antigo não tem essa ferramenta.
2. Granularidade da busca e formato de citação estão na documentação oficial; roda de verdade para ver a estrutura de retorno.
3. Existe mecanismo de desconto por cache; em contextos longos, use e abuse — economiza uma grana.

Essa é a cara do "de graça": a DeepSeek te entregou a infraestrutura de busca mais chata de graça. Quem precisar, é copiar e colar.

Leitura relacionada: [DeepSeek V4 Flash versão final — experiência aprofundada](/blog/deepseek-v4-flash-review)