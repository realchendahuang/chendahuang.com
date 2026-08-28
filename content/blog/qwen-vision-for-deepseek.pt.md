---
title: "Dando multimodal ao DeepSeek: solução de visão com Qwen-3.7-Flash"
description: "O DeepSeek V4 Flash não tem multimodal. E ler imagem, como fica? Na minha pesquisa, a opção com melhor custo-benefício hoje é o Qwen-3.7-Flash: reconhecer uma imagem custa quase nada e, combinado com o V4 Flash, cobre a lacuna."
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - Multimodal
  - Review de modelo
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original postado no [X](https://x.com/realchendahuang/status/2085265465564336327), 89 mil visualizações, 600+ curtidas.

Muita gente reclama que o DeepSeek V4 Flash não tem multimodal. É uma lacuna real — mas não precisa insistir num modelo só.

## O problema

O V4 Flash está com a capacidade textual no talo, mas chega na hora de ler imagem e trava: screenshot, imagem de tabela, mockup de UI, documento escaneado — nada disso ele processa.

Multimodal é o preço da "baratura": o modelo precisa de encoding visual, os parâmetros incham e o custo sobe.

## A solução: usar em combinação

Pesquisei a fundo a opção de reconhecimento de imagem com melhor custo-benefício hoje, e a resposta é **Qwen-3.7-Flash**.

O custo para reconhecer uma imagem é tão baixo que dá para ignorar. Use ele como modelo de visão dedicado e siga com a inferência de texto no V4 Flash — fica com o melhor dos dois mundos.

## Como combinar

O caminho mais simples é o "roteamento": entrada com imagem → modelo de visão; texto puro → V4 Flash.

```js
// pseudocódigo: roteamento sob demanda
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // reconhece imagem + extrai informação-chave
  }
  return deepseekV4Flash(input) // inferência de texto
}
```

Um esquema mais avançado é jogar o resultado da visão direto no V4 Flash para continuar a inferência:

1. Use o Qwen-3.7-Flash para reconhecer a imagem e gerar uma descrição estruturada
2. Empacote a descrição + a pergunta original para o DeepSeek V4 Flash
3. O V4 Flash faz inferência profunda, escreve código e resume com base na descrição

Assim você enxerga imagem e ainda aproveita o barato e a velocidade do V4 Flash.

## Cenários de uso

- Perguntar com screenshot: joga screenshot de erro, screenshot de conversa
- Imagens de tabela/documento virando dados estruturados
- Mockup de UI virando código
- Extração de informações de escaneados (nota fiscal, contrato)
- Cenários em que um Agent precisa "olhar" a tela

## Por que não outra opção

Modelos de visão puros (tipo os multimodais da família GPT) são fortes, mas o preço está lá — para processamento em lote no dia a dia não compensa.

O Qwen-3.7-Flash vence no custo-benefício: qualidade de reconhecimento suficiente, custo praticamente invisível, e dá para rodar lote grande sem pesar no bolso.

## Resumo

A combinação de modelos é o normal — não espere um modelo fazer tudo sozinho.

Texto principal no V4 Flash (barato, rápido, contexto grande), visão de apoio no Qwen-3.7-Flash (barato, suficiente): essa é a opção com melhor custo-benefício hoje. Completa o que falta, um por um — bem mais realista do que esperar um modelo "universal mas caro".

Leitura relacionada: [DeepSeek V4 Flash versão final — experiência aprofundada](/blog/deepseek-v4-flash-review)