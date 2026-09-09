---
title: "Estável, rápido, produtivo, barato: meu stack de AI Coding documentado"
description: "OpenCode + OpenChamber + duas assinaturas DeepSeek V4 Flash: 15 projetos rodando código ao mesmo tempo e a cota mal se mexeu. Toda a configuração aberta aqui — poda de Context, memória em camadas, automação de desktop e a lição de 'ficar com a combinação original'."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - Programação IA
  - Configuração
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> O argumento central foi publicado primeiro no [X](https://x.com/realchendahuang/status/2086611065920733305); este artigo é o registro completo da configuração.

A conclusão primeiro: **OpenCode + OpenChamber + assinatura DeepSeek V4 Flash via OpenCode Go + assinatura DeepSeek V4 Flash via Ollama Cloud.**

Uso esse combo em carga pesada há muito tempo, e ele entrega quatro coisas: estável, rápido, produtivo, barato. Cheguei a deixar 15 projetos abertos em sequência, todos rodando código ao mesmo tempo, e a cota mal se moveu.

## Por que OpenCode + OpenChamber

A jornada de seleção está em [outro artigo](/blog/agent-harness-selection); aqui só o raciocínio no nível do resultado. OpenCode é hoje o núcleo multi-modelo mais equilibrado — open source, muitos Provider, Client/Server, app desktop e Subagents maduros. OpenChamber é o Harness GUI open source com o front-end mais bem lapidado que já usei: o autor mantém com um cuidado raro, refinado, estável, e os bugs pequenos ocasionais não atrapalham em nada o uso de longo prazo.

Interface web + PWA — quase indistinguível de um cliente desktop, com atualização que não precisa de esforço manual.

## A configuração gira em torno de três necessidades centrais

Minha configuração do OpenCode é construída em torno de três coisas: gestão de Context, sistema de memória e capacidades externas.

**1. opencode-dcp (open source) — poda dinâmica de Context.** Quando o Context bate um limite, ele comprime automaticamente o conteúdo antigo em resumos técnicos: mantém a informação chave, joga fora o ruído, limpa duplicatas e remove do Context o conteúdo de baixo valor, tipo erro de ferramenta. Sessões longas sem estourar o Context — essa é a fundação que permite uma tarefa longa rodar o dia inteiro.

**2. opencode-goal-plugin — gestão de objetivos.** Adiciona modo Goal às tarefas longas, para puxar o agente de volta quando ele desvia.

**3. Hermes Memory — memória em camadas (se houver demanda, abro o código depois).** Meu plugin mais pesado: portei o mecanismo de memória em camadas do agente Hermes para o OpenCode, que lembra entre sessões as preferências do usuário, as decisões do projeto e as lições do passado. Projeto novo não começa do zero.

**4. context7-MCP.** Consulta a documentação oficial mais recente de bibliotecas e frameworks — sem cavar na mão.

**5. grep-MCP.** Busca usos reais no código do GitHub inteiro — muito mais confiável que escrever de memória.

**6. open-computer-use — automação de desktop.** Faz a IA operar apps do macOS diretamente: clicar, digitar, rolar, arrastar, capturar tela, ler a árvore de acessibilidade. Excelente na fase de teste e aceitação.

## A conta de custo: como gastar duas assinaturas

DeepSeek V4 Flash é o núcleo de custo-benefício deste stack: inteligente de verdade, barato de verdade. A assinatura do OpenCode Go cobre o workflow principal; a do Ollama Cloud faz o papel de segundo canal para dividir a carga — as duas assinaturas somadas custam menos que um plano de codagem first-party mainstream, com produção maior.

A história de que "modelo dentro de casca de terceiro fica burro" precisa ser desmontada: **a raiz da degradação é uma casca que não faz Harness Engineering para o modelo**, não o ato de trocar de casca em si. O suporte do OpenCode a modelos abertos é de primeira linha, e o DeepSeek V4 Flash roda dentro dele estável e rápido — exatamente por isso que eu tenho coragem de empilhar 15 projetos nele.

## A lição: ficar com a combinação original

Nos grupos sempre aparece a pergunta: existe um desktop universal de codagem com IA? Um que conecte todas as assinaturas e não deixe nenhum modelo burro?

Depois de conversar com alguns amigos que mexem nisso intensamente todo dia, a conclusão foi unânime: não existe. Fica com a combinação original.

- GPT → Codex: assinatura oficial em conexão direta, o agendamento nativo mais estável.
- Gemini → AntiGravity: teto de velocidade, janelas longas sem engasgo.
- DeepSeek, GLM e outros modelos abertos → Harness amigável a modelos abertos como OpenCode / ZCode.

Coloque um modelo numa casca que não combina e é praticamente impossível escapar de degradação, lentidão e assinatura que não conecta. **Cada modelo no lugar onde ele fica mais confortável — a combinação é o seu stack.**

## Por fim

Rodo esse stack há meses, e a maior mudança não é quanto dinheiro economizei — é que eu tenho coragem de abrir tarefas. Como é estável e barato, abrir 15 projetos não me assusta. O valor de um stack de ferramentas, no fim, aparece em quanto trabalho você tem coragem de botar nele.
