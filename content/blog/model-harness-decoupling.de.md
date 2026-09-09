---
title: "Das First-Party-Harness ist nicht immer die beste Wahl: In der Ära offener Modelle wählt man Modell und Harness getrennt"
description: "Claude? Dann Claude Code. In der Ära offener Modelle verdient dieser Instinkt ein Upgrade. Der First-Party-Vorteil ist echt, aber ein gutes Modell zu trainieren und ein gutes Harness zu bauen sind zwei verschiedene Ingenieurskünste — dieser Artikel erklärt, warum sich Modell und Harness heute getrennt wählen lassen, plus eine Positionierungskarte von fünf Harnesses."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Tool-Auswahl
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Der Kerngedanke erschien zuerst auf [X](https://x.com/realchendahuang/status/2093890559874388141); dieser Artikel ist die ausführliche Fassung, inklusive einer Positionierungskarte von fünf Harnesses.

Bei der Wahl eines Coding Agent ist die erste Intuition der meisten Leute völlig naheliegend: Claude → Claude Code; GPT → Codex; GLM → ZCode; DeepSeek → natürlich erst mal das eigene Harness von DeepSeek.

Und die Intuition ist völlig solide. Der größte Vorteil des Herstellers ist, dass er sein eigenes Modell am besten kennt.

## Der First-Party-Vorteil ist echt

Welche Prompts das Modell mag, wie man das Tool Schema am stabilsten gestaltet, wie man langen Context organisiert, welche Fähigkeiten ein neues Release bringt, wo es am ehesten stolpert — der First Party weiß all das meist früher als Dritte.

Deshalb ist bei Produkten wie Claude Code und Codex, bei denen Modell und Harness langfristig zusammen iterieren, die First-Party-Kombination oft die stärkste Antwort der aktuellen Version. Dagegen sage ich nichts.

## Aber ein Modell trainieren und ein Harness bauen sind zwei grundverschiedene Ingenieursdisziplinen

Bei offenen Modellen wie DeepSeek und GLM wird es erst richtig interessant — denn ein gutes Modell zu trainieren und ein gutes Harness zu bauen sind zwei völlig verschiedene Arten von Ingenieurskunst.

Sobald ein Coding Agent wirklich läuft, taucht ein Berg von Nicht-Modell-Problemen auf:

- Wie Dateien gelesen, wie Code geändert wird
- Wie der Agent Loop gesteuert, wie der Context komprimiert wird
- Wie der Cache genutzt, wie Fehler bei Tool Calls behoben werden
- Wie Subagents eingeplant, wie Berechtigungen verwaltet werden

Wie gut das alles gelingt, entscheidet direkt darüber, wie sich dasselbe Modell am Ende anfühlt. Dasselbe Modell in einem anderen Harness kann ein himmelweiter Unterschied sein.

## Das größere Problem: Modelle aktualisieren sich zu schnell

Heute ist GLM vorne, nächsten Monat bringt DeepSeek vielleicht einen noch stärkeren Flash, und eine Weile später holt wieder ein neues Modell auf.

Wenn der ganze Coding-Workflow an das Produkt eines Herstellers gebunden ist, bedeutet ein Modellwechsel oft auch Toolwechsel und Gewohnheitswechsel. Monate lang feingeschliffene Konfigs, Erinnerungen und Workflows werden plattgemacht.

Genau hier verdienen Third-Party-Harnesses ihren Platz: **Du kannst deine gewohnten Tools, Skills, MCP, Berechtigungen und Workflows festzurren und darunter nur das Modell austauschen.** Heute DeepSeek, morgen GLM, übermorgen etwas anderes — die Arbeitsumgebung muss nicht neu gebaut werden.

## Eine Positionierungskarte von fünf Harnesses

Wo die großen fünf stehen, nach meinem Stand Ende August 2026:

**Pi**: minimalistische Philosophie; das Harness mischt sich so wenig wie möglich ins Modell ein. Leicht, schnell, niedriger Token-Overhead, extrem formbar. Am besten als Fundament für den eigenen Langzeit-Agenten — simpel, sauber, endlos hackbar.

**OMP**: stapelt auf Pi weiter schwere Coding-Fähigkeiten — LSP, Debugger, Browser, AST — wie die Montage einer kompletten IDE am Agenten. Für wirklich Heavy-Coding und komplexe Repo-Navigation.

**DeepSeek Harness**: geht am weitesten — Everything is Plugin. Agent Loop, Tools, Berechtigungen, Presets und UI lassen sich alle zerlegen und neu kombinieren. Für Leute, die an Agent-Architektur, Presets, Multi-Agent-Setups und Runtimes der nächsten Generation basteln. Probiert öfter den PTC-Modus — schneller und tokensparsamer.

**OpenCode**: die ausgewogenste Sorte — Open Source, viele Provider, großes Ökosystem, ausgereiftes Client/Server, Desktop-App und Subagents. Für alle, die einen reifen, universellen Multi-Model-Coding-Agent wollen.

**Command Code**: ein völlig anderer Weg — es liebt es, für das Modell einzuspringen. Fehlerhafte Tool-Call-Argumente werden lokal repariert; doppelte Datei-Lesevorgänge werden dedupliziert; lange Sessions halten einen Stable Prefix, um Cache Hits zu erhöhen; kurz vor dem Context-Bersten wird kompaktiert. Auf Maloche-Modelle wie DeepSeek V4 Flash oder GLM-5.3 Flash angewandt, entfaltet das maximalen Wert: Je schwächer das Modell, desto mehr fängt das Harness auf.

## Wie ich wähle

Wenn es mir nur um langfristige Formbarkeit geht, bleibe ich bei Pi. Aber sollte man mich heute anweisen, mit DeepSeek V4 Flash oder GLM-5.3 hart arbeiten zu gehen, würde ich Command Code wirklich kosten — Modell-Harness-Kombinationen werden pro Task konfiguriert, nicht pro Lager.

In der Ära offener Modelle sind Modell und Harness komplett getrennt wählbar. **Hör auf zu fragen „wessen Modell mit wessen Tool“, und frag stattdessen „in welchem Harness leistet dieses Modell seine beste Arbeit“.**
