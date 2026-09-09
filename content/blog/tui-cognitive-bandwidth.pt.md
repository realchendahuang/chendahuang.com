---
title: "A TUI está matando sua banda cognitiva: está na hora de quebrar o “filtro geek” do AI Coding"
description: "Um bando de AI Coding Agents disputando quem sobe TUI primeiro, empurrando a interação de volta ao paradigma de terminal dos anos 80 e ainda chamando isso de “imersivo” e “respeita o programador”. Este artigo disseca os três mecanismos pelos quais a TUI reduz sistematicamente sua banda cognitiva — e por que o Web UI é a resposta certa."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Programação IA
  - Design de interação
  - Ensaio
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> O argumento central foi publicado primeiro no [X](https://x.com/realchendahuang/status/2087949416808518106); este artigo é a versão completa.

Ultimamente um bando de AI Coding Agents está subindo TUI pra todo lado, e Claude Code tem uma boa parte de culpa nessa onda. Ele levou ao extremo a ideia de conversar com a IA no terminal para escrever código, mas também criou um padrão estético e uma dependência de caminho: parece que um Coding Agent de verdade tem que ser, por padrão, interface de terminal; a versão web vira um acessório, e ainda é zoada como “programador de menos”.

E o resultado? Primeiro constroem uma TUI complicada — um monte de cores, barra de status, atalho, troca de modo — e depois chamam de “imersivo”, “eficiente”, “respeita o programador”.

Sério?

## Você acha que está conversando, mas na verdade está lutando

Para a minoria que vive dentro do terminal o dia todo, a TUI é gostosa mesmo. Mas para muita mais gente, é um obstáculo construído de propósito. Quando você colabora com um agente via TUI, na verdade está fazendo três coisas o tempo todo:

**Decorar atalhos e modos.** Cada ferramenta tem seus próprios hábitos de teclas. Novato fica perdido, e até veterano tem que se readaptar ao trocar de ferramenta.

**Localizar informação num fluxo de caracteres rolando.** O estado não fica espalhado na sua frente — fica enterrado numa linha do tempo que você tem que escavar rolando e buscando.

**Rezar para não ter caído em algum estado estranho.** A troca de modo é invisível; muitas vezes você não sabe em que modo está até dar problema.

Isso já não é interação, é briga com a interface.

## Densidade de informação não é eficiência de informação

A palavra favorita dos defensores da TUI é “densidade de informação”. Mas empilhar densidade até o extremo tem um preço: a legibilidade e a recuperabilidade são pisoteadas até o mínimo.

Uma interface realmente eficiente deveria **espalhar o estado na sua frente**, deixando seus olhos e seu senso espacial fazerem o entendimento — qual tarefa está rodando, qual sessão está esperando entrada, qual arquivo foi alterado, tudo visível de relance. Em vez de te obrigar a entupir tudo na memória de curto prazo enquanto seu cérebro mantém um mapa invisível do “estado atual do sistema”.

A memória de trabalho humana tem de quatro a sete slots. O modelo de interação da TUI, na essência, gasta seu recurso cognitivo mais precioso em “lembrar o estado da interface” em vez de “pensar no problema”.

## E ainda cultiva um mau hábito

Pior: o ecossistema TUI cultiva um juízo de valor muito ruim — **tratar o domínio do teclado de uma ferramenta como habilidade em si.**

O resultado é que a pessoa gasta energia demais se adaptando à interface em vez de pensar no problema. A régua do programador virou “sabe recitar esses atalhos?”, e não “sabe decompor bem o problema?”.

Uma boa ferramenta deveria reduzir o custo de pensar, não transferir esse custo para “como operar essa interface”.

## Web UI pode ser rápido e limpo sim

Tem gente que diz que a web é lenta, que não é “nativo”. Estamos em 2026 — esse argumento morreu faz tempo.

Web UI pode ser tão rápido e limpo quanto qualquer coisa: instalado como PWA, quase não se distingue de um cliente desktop, e atualizar é ainda mais fácil — sem upgrade manual, um refresh e você já está na versão mais nova. Sessões longas, tarefas em paralelo, visualização do estado das tarefas: esses são justamente os pontos fortes do DOM do navegador, não de um fluxo de caracteres.

Meu setup principal é uma interface web como OpenChamber em cima de um núcleo OpenCode, uso pesado por muito tempo — firmeza total. Se eu for bem meticuloso: os bugs pequenos ocasionais da web não atrapalham em nada o uso de longo prazo; já certas trocas de modo de certas TUI me pegaram muitas vezes.

## Ferramenta existe para pessoas usarem, não para provar quem é mais “geek”

Claude Code em si é forte, sem discussão. Mas ele popularizou a estética de que “TUI é o ortodoxo”, e a turma que veio atrás copiando ficou pior — nem design de interação fazem, tratam “viver no terminal” como prova de sofisticação.

Embalar interação anti-humana como sofisticação é realmente uma coisa muito cômica.

Ferramenta é para pessoas. O critério deveria ser sempre: **isso reduziu o custo total de você concluir a tarefa?** Se uma interface faz você gastar energia “brigando com a interface”, ela é um passivo, por mais “geek” que pareça.

Da próxima vez que for escolher um Coding Agent, tire esse filtro antes de escolher.
