---
title: "Stabil, schnell, produktiv, günstig: Mein AI-Coding-Stack, vollständig dokumentiert"
description: "OpenCode + OpenChamber + zwei DeepSeek V4 Flash Abos: 15 Projekte laufen gleichzeitig Code, und das Kontingent bewegt sich kaum. Der komplette Aufbau offengelegt — Context-Beschneidung, gestufte Memory, Desktop-Automatisierung und die Lektion „beim Original bleiben“."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - AI-Coding
  - Konfiguration
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Der Kerngedanke erschien zuerst auf [X](https://x.com/realchendahuang/status/2086611065920733305); dieser Artikel ist die komplette Dokumentation meines Setups.

Vorab das Fazit: **OpenCode + OpenChamber + ein DeepSeek V4 Flash Abo über OpenCode Go + ein DeepSeek V4 Flash Abo über Ollama Cloud.**

Dieses Setup läuft bei mir dauerhaft unter Volllast, und es liefert vier Dinge: stabil, schnell, produktiv, günstig. 15 Projekte gleichzeitig am Laufen, alle schreiben Code — das Kontingent hat sich kaum bewegt.

## Warum OpenCode + OpenChamber

Die Auswahl-Odyssee steht in [einem anderen Artikel](/blog/agent-harness-selection); hier nur die Gründe auf Ergebnis-Ebene. OpenCode ist derzeit der ausgewogenste Multi-Model-Kern — Open Source, viele Provider, ausgereiftes Client/Server, Desktop-App und Subagents. OpenChamber ist das am besten polierte Frontend, das ich in einem Open-Source-Harness-GUI je benutzt habe: ein Maintainer, der sich wirklich Mühe gibt, fein, stabil, und die gelegentlichen kleinen Bugs stehen dem Dauerbetrieb nie im Weg.

Web-Oberfläche + PWA — kaum von einer Desktop-App zu unterscheiden, Updates ganz ohne Handarbeit.

## Das Setup dreht sich um drei Kernbedürfnisse

Meine OpenCode-Konfiguration baut auf drei Säulen: Context-Management, Memory-System, externe Fähigkeiten.

**1. opencode-dcp (Open Source) — dynamisches Context-Pruning.** Wenn der Context einen Schwellwert erreicht, komprimiert es ältere Inhalte automatisch zu technischen Zusammenfassungen: Schlüsselinfos bleiben, Rauschen fliegt, Duplikate werden bereinigt, niedrigwertige Inhalte wie Tool-Fehler werden aus dem Context entfernt. Lange Sessions ohne Context-Explosion — das Fundament dafür, dass Langzeit-Tasks tagelang durchlaufen können.

**2. opencode-goal-plugin — Zielmanagement.** Fügt langen Tasks einen Goal-Modus hinzu, damit man den Agenten zurückziehen kann, wenn er abdriftet.

**3. Hermes Memory — gestufte Memory (auf Nachfrage mache ich es später Open Source).** Mein gewichtigstes Plugin: Ich habe die gestufte Memory-Mechanik des Hermes-Agenten auf OpenCode portiert; Nutzerpräferenzen, Projektentscheidungen und frühere Lektionen werden sitzungsübergreifend gespeichert. Neue Projekte starten nicht bei null.

**4. context7-MCP.** Aktuelle offizielle Doku von Bibliotheken und Frameworks nachschlagen — ohne eigenes Gesuche.

**5. grep-MCP.** Reale Nutzungsmuster im gesamten GitHub-Code durchsuchen — deutlich verlässlicher, als aus dem Gedächtnis zu schreiben.

**6. open-computer-use — Desktop-Automatisierung.** Lässt die AI macOS-Apps direkt bedienen: Klicken, Tippen, Scrollen, Ziehen, Screenshots, den Accessibility-Tree lesen. Besonders gut für Tests und Abnahme.

## Die Kostenrechnung: Wie zwei Abos verbraucht werden

DeepSeek V4 Flash ist der Preis-Leistungs-Kern dieses Stacks: wirklich klug, wirklich billig. Das OpenCode Go-Abo deckt den Haupt-Workflow ab, das Ollama Cloud-Abo ist der zweite Kanal zur Lastverteilung — zusammen kosten beide Abos weniger als ein einziger mainstream First-Party-Coding-Plan, bei höherem Output.

Die Behauptung, „Modelle in Fremd-Shells werden dümmer“, muss man auseinandernehmen: **Die Ursache der Degradierung ist eine Shell, die kein Harness Engineering fürs Modell betreibt** — nicht der Akt des Shell-Wechsels selbst. OpenCodes Unterstützung offener Modelle gehört in die erste Liga; DeepSeek V4 Flash läuft darin stabil und schnell — genau deshalb traue ich mich, 15 Projekte darauf zu stapeln.

## Die Lektion: Beim Original bleiben

In Gruppenchats fragen oft Freunde: Gibt es einen universellen AI-Coding-Desktop? Einen, der alle Abos verbindet und kein Modell abstumpfen lässt?

Nach Gesprächen mit ein paar Freunden, die täglich intensiv basteln, war die Schlussfolgerung einstimmig: Den gibt es nicht. Bleib beim Original.

- GPT → Codex: direktes offizielles Abo, die stabilste native Steuerung.
- Gemini → AntiGravity: die Geschwindigkeits-Obergrenze, lange Fenster ohne Ruckler.
- DeepSeek, GLM und andere offene Modelle → offene-Modelle-freundliche Harnesses wie OpenCode / ZCode.

Ein Modell in eine unpassende Shell gesteckt, und Abstumpfen, Verlangsamung und inkompatible Abos sind praktisch garantiert. **Jedes Modell bleibt dort sitzen, wo es sich am wohlsten fühlt — die Kombination daraus ist dein Stack.**

## Zum Schluss

Dieser Stack läuft seit Monaten, und das größte Gefühl ist nicht, wie viel Geld ich gespart habe — es ist, dass ich mich traue, Tasks aufzumachen. Weil es stabil und billig ist, macht mir das Öffnen von 15 Projekten keine Angst. Der Wert eines Tool-Stacks zeigt sich letztlich darin, wie viel Arbeit man ihm zuzumuten bereit ist.
