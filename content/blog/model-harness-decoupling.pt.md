---
title: "O Harness first-party nem sempre é a resposta: na era dos modelos abertos, escolha o modelo e o Harness separadamente"
description: "Usa Claude, vai de Claude Code? Na era dos modelos abertos, esse instinto pede um upgrade. A vantagem first-party é real, mas treinar um bom modelo e construir um bom Harness são duas engenharias diferentes — este artigo explica por que modelo e Harness já podem ser escolhidos separadamente, com um mapa de posicionamento de cinco Harness."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Escolha de ferramenta
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> O argumento central foi publicado primeiro no [X](https://x.com/realchendahuang/status/2093890559874388141); este artigo é a versão completa, com um mapa de posicionamento dos cinco Harness.

A primeira reação da maioria das pessoas ao escolher um Coding Agent é super natural: Claude → Claude Code; GPT → Codex; GLM → ZCode; DeepSeek → obviamente, o próprio Harness da DeepSeek primeiro.

E o instinto é totalmente sensato. A maior vantagem do first-party é conhecer o próprio modelo melhor que ninguém.

## A vantagem first-party é real

Que Prompts o modelo gosta, qual design de Tool Schema é mais estável, como organizar um Context longo, quais capacidades cada versão nova traz, onde ele mais tropeça — o first-party geralmente fica sabendo de tudo isso antes dos terceiros.

Então, em produtos como Claude Code e Codex, em que modelo e Harness iteram juntos no longo prazo, a combinação first-party costuma ser a versão mais forte da resposta. Nisso eu não discuto.

## Mas treinar um modelo e construir um Harness são duas engenharias completamente diferentes

Quando chegamos em modelos abertos como DeepSeek e GLM, a coisa fica interessante — porque treinar um bom modelo e construir um bom Harness são dois tipos de engenharia totalmente diferentes.

Quando um Coding Agent realmente entra em operação, surge um monte de problemas fora do modelo:

- Como ler arquivos, como editar código
- Como controlar o Agent Loop, como comprimir o Context
- Como aproveitar o Cache, como recuperar um Tool Call que falhou
- Como escalonar Subagents, como gerenciar permissões

A qualidade desses pontos decide diretamente se o mesmo modelo vai ser bom de usar no final. O mesmo modelo em outro Harness pode ser uma experiência do dia e da noite.

## O problema maior: os modelos atualizam rápido demais

Hoje a GLM está na frente, mês que vem a DeepSeek talvez lance um Flash ainda mais forte, e um tempo depois outro modelo novo alcança todo mundo.

Se o seu workflow de codagem inteiro estiver preso ao produto first-party de uma única casa, trocar de modelo quase sempre significa trocar também de ferramentas e de hábitos. Meses de configuração, memória e workflow lapidados vão pro chão.

É exatamente aí que os Harness de terceiros ganham o lugar deles: **você pode fixar as ferramentas, Skills, MCP, permissões e workflows que já domina, e trocar só o modelo lá embaixo.** Hoje DeepSeek, amanhã GLM, depois de amanhã outra coisa — o ambiente de trabalho não precisa ser reconstruído do zero.

## Um mapa de posicionamento dos cinco Harness

Onde os cinco grandes estão parados, pela minha experiência até o fim de agosto de 2026:

**Pi**: filosofia minimalista; o Harness interfere o mínimo possível no modelo. Leve, rápido, baixo consumo de Token, moldável ao extremo. Ideal como fundação para o seu agente de longo prazo — simples, limpo, hackeável à vontade.

**OMP**: vai empilhando sobre Pi capacidades pesadas de codagem — LSP, Debugger, Browser, AST — como vestir o agente com um IDE completo. Para quem codifica pesado de verdade e navega repos complexos.

**DeepSeek Harness**: vai mais longe que todo mundo — Everything is Plugin. Agent Loop, ferramentas, permissões, Presets e UI se desmontam e se recombinam. Para quem mexe com arquitetura de agentes, Presets, multi-agente e Runtime de nova geração. Experimente mais o modo PTC — mais rápido e economiza mais token.

**OpenCode**: o mais equilibrado do grupo — open source, muitos Provider, ecossistema grande, Client/Server, app desktop e Subagents maduros. Para quem quer um Coding Agent multi-modelo, generalista e maduro.

**Command Code**: uma rota completamente diferente — ele adora cobrir as lacunas do modelo. Argumentos de Tool Call escritos errado são corrigidos localmente; leitura duplicada de arquivos é deduplicada; sessões longas mantêm um Stable Prefix para subir o Cache Hit; quando o Context está prestes a estourar, faz Compaction. Colocada em modelos de braço como DeepSeek V4 Flash ou GLM-5.3 Flash, essa abordagem vale ouro: quanto mais fraco o modelo, mais o Harness cobre.

## Como eu escolho

Se eu só olhar a moldabilidade de longo prazo, sigo preferindo o Pi. Mas se hoje me pedissem para colocar DeepSeek V4 Flash ou GLM-5.3 pra trabalhar pesado, eu daria uma chance de verdade ao Command Code — a combinação modelo-Harness é montada por tarefa, não por campo.

Na era dos modelos abertos, modelo e Harness já são escolhas totalmente separáveis. **Pare de perguntar "o modelo de quem com a ferramenta de quem" e comece a perguntar "em qual Harness esse modelo rende mais".**
