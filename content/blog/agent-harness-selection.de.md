---
title: "Nach Pi Agent, OMP, Codex und ZCode: Warum ich am Ende OpenCode + OpenChamber gewählt habe"
description: "Meine Retro zur Agent-Harness-Auswahl: Nach den drei Kriterien GUI-Erlebnis, Vendor Lock-in und Freiheit zur Weiterentwicklung flogen Pi Agent, OMP, Codex und ZCode raus – die Wahl fiel schließlich auf den OpenCode-Kernel mit der OpenChamber-Oberfläche."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Tool-Auswahl
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original gepostet auf [X](https://x.com/realchendahuang/status/2085410520459604026).

Ich habe mich in letzter Zeit durch Pi Agent, OMP, ZCode, Codex und OpenCode gewühlt – durch all diese Agent Harnesses – und endlich verstanden, was ich wirklich brauche.

## Meine drei Kriterien

### Erstens: eine ausgereifte, stabile GUI

Wer GUI gewohnt ist, hält TUI einfach nicht aus. Im schwarzen Kasten zu chatten ist die Hölle – du musst Unmengen an Shortcuts und Befehlen auswendig lernen, um wirklich damit arbeiten zu können. Eine GUI dagegen? Einfach intuitiv auf Icons und Buttons klicken, fertig.

Ich brauche also eine ausgereifte, stabile, schicke GUI.

Genau dieses Kriterium killt **Pi Agent** und **OMP**. Nicht, weil ihre Kernel schlecht wären – sondern weil die Community-GUIs dazu grottenschlecht sind. Selbst eine zu bauen, frisst massig Energie, und solche Tools sind so extrem anpassbar, dass deine Eigenbau-GUI nichts taugt – anderer Rechner, andere Person, alles wieder von vorn.

### Zweitens: kein Vendor Lock-in, keine Modell-Vetternwirtschaft

Codex hat zwar Schnittstellen für Drittanbieter-Modelle geöffnet, aber die Konfiguration ist echt nervig, und Drittanbieter-Modelle bleiben für immer "Bürger zweiter Klasse" – vom offiziellen Modell dominiert, vom Update-Rhythmus ausgebremst. Das ging mir mächtig auf den Keks.

ZCode ist noch abgedrehter: Man kann sich bei den Coding-Plänen der Anbieter nicht per OAuth einloggen (Kimi For Code oder Grok Build lassen sich in ZCode zum Beispiel gar nicht nutzen, außer man fummelt sich irgendeinen Workaround zusammen).

Also flogen ZCode & Co. und Codex raus – alles Software mit Modell-Vetternwirtschaft.

### Drittens: Open Source und weiterentwickelbar

Ich will auf Basis meiner eigenen Anforderungen weiterentwickeln und anpassen – damit meine Kunden es möglichst out of the box nutzen können. Es muss also Open Source und lizenzfreundlich sein – damit ich selbst Spaß habe und meine Kunden es einfach nutzen können, ohne sich durch dubiose Hacks zu wühlen.

## Die Antwort: OpenCode + OpenChamber

Am Ende des Ausscheidens bleibt eine echte Option übrig: **OpenCode**.

Aber OpenCode ist nur ein Agent-Kernel. Um ihm eine ausgereifte, stabile, bequeme GUI an die Seite zu stellen, habe ich endlich die wahre Antwort gefunden: **OpenChamber**.

- Kernel: OpenCode – Open Source, kein Vendor Lock-in, unterstützt alle Modelle
- Oberfläche: OpenChamber – eine ausgereifte GUI-Workbench
- Kombination: stabiler Kernel + komfortable Oberfläche, bei Bedarf nach eigenem Gusto erweiterbar

Quellcode: <https://github.com/openchamber/openchamber>

## Ein paar Erkenntnisse

Bei der Tool-Wahl geht es im Kern um eine Frage: Wer hat bei dir das Sagen?

Egal wie gut Closed-Source-Tools sind – Update-Richtung, Modell-Support und Preispolitik bestimmen andere, du kannst nur passiv konsumieren. Mit der Kombination aus Open Source und fehlendem Lock-in hast du immer einen Ausweg und immer die Freiheit, etwas zu verändern.

Und der TUI-vs-GUI-Streit? Nicht um jeden Preis durchhalten. Tools sind zum Arbeiten da, nicht um zu beweisen, dass man die Kommandozeile beherrscht. Eine Oberfläche, in der man sich wohlfühlt und die man lange nutzen kann – das zählt mehr als alles andere.

Weiterlesen: [DeepSeek V4 Flash – der Langzeittest](/blog/deepseek-v4-flash-review)