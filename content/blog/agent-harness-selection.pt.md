---
title: Testei Pi Agent, OMP, Codex, ZCode — no fim escolhi OpenCode + OpenChamber
description: "Retrospectiva da escolha de Agent Harness: critérios de experiência GUI, vendor lock-in e liberdade de customização que eliminaram Pi Agent, OMP, Codex e ZCode, para no fim escolher o núcleo OpenCode + a interface OpenChamber."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Escolha de ferramenta
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original postado no [X](https://x.com/realchendahuang/status/2085410520459604026).

Andei testando Pi Agent, OMP, ZCode, Codex, OpenCode — esses Agent Harness todos. E finalmente entendi o que eu realmente preciso.

## Meus três critérios

### Primeiro: GUI madura e estável

Quem se acostuma com GUI não volta para TUI. Bater papo numa telinha preta é um sofrimento — você precisa decorar um monte de atalhos e comandos para conseguir usar de verdade. Já na GUI é só clicar num ícone aqui, num botão ali, intuitivo.

Então eu precisava de uma GUI madura, estável e bonita.

Esse critério já derrubou o **Pi Agent** e o **OMP**. Não é que o núcleo seja ruim — é que as GUIs da comunidade são porcas demais. Fazer a própria na mão exige um esforço gigantesco, e essas ferramentas são customizáveis demais: sua GUI feita à mão não é portátil — troca de máquina, troca de pessoa, e tudo tem que recomeçar do zero.

### Segundo: sem vendor lock-in, sem puxar saco de fornecedor

O Codex até abriu a configuração para modelos de terceiros, mas configurar é um parto, e modelo de terceiro sempre é "cidadão de segunda classe" — sufocado pelos modelos oficiais, atrasado pelo ritmo de updates. Isso me irrita profundamente.

O ZCode é pior: nem dá para logar via OAuth nos Coding Plan das outras empresas (tipo Kimi For Code, Grok Build), a não ser que você faça gambiarras.

Por isso cortei o ZCode e o Codex — softwares que favorecem um fornecedor específico de modelos.

### Terceiro: open source, customizável

Preciso desenvolver em cima do próprio produto e customizá-lo para entregar algo pronto para usar aos clientes. Então ele precisa ser open source e com licença amigável — bom para eu me divertir, bom para o cliente usar sem dor, sem precisar ficar fazendo hack maluco.

## A resposta final: OpenCode + OpenChamber

Depois de filtrar tudo, o único que sobrou de verdade foi o **OpenCode**.

Mas o OpenCode é só um núcleo de Agent. Para dar a ele uma GUI madura, estável e boa de usar, finalmente achei a resposta definitiva: **OpenChamber**.

- Núcleo: OpenCode, open source, sem lock-in, suporta vários modelos
- Interface: OpenChamber, uma bancada GUI madura
- Combinação: núcleo estável + interface que flui, e dá para customizar quando precisar

Repo open source: <https://github.com/openchamber/openchamber>

## Algumas reflexões

Escolher ferramenta é, no fundo, escolher em quem está o poder de decisão.

Melhor ferramenta fechada que seja: direção de updates, suporte a modelos, política de preço — tudo é decidido por outros, e você só aceita passivamente. Open source + sem lock-in te dá sempre uma saída e sempre a liberdade de mudar.

E a briga TUI vs GUI? Não sofra à toa. Ferramenta serve para trabalhar, não para provar que você domina linha de comando. Interface confortável, que você usa por anos — isso sim importa.

Leitura relacionada: [DeepSeek V4 Flash versão final — experiência aprofundada](/blog/deepseek-v4-flash-review)