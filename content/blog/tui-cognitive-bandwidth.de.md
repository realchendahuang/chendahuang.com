---
title: "TUI frisst deine kognitive Bandbreite: Der „Geek-Filter“ im AI Coding sollte endlich zerbrechen"
description: "Ein Haufen AI Coding Agents liefert um die Wette TUIs aus, drückt die Interaktion zurück ins Terminal-Paradigma der 80er und nennt das dann „immersive“ und „respektvoll gegenüber Programmierern“. Dieser Artikel zerlegt die drei Mechanismen, mit denen TUI die kognitive Bandbreite systematisch senkt – und warum Web UI die richtige Antwort ist."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - AI-Coding
  - Interaktionsdesign
  - Essay
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Der Kerngedanke erschien zuerst auf [X](https://x.com/realchendahuang/status/2087949416808518106); dieser Artikel ist die ausführliche Fassung.

Zurzeit rüsten sich AI Coding Agents reihenweise mit TUIs aus, und ein gut Teil der Schuld daran trägt Claude Code. Es hat die Idee, im Terminal mit einer AI zu chatten und Code zu schreiben, zur Perfektion getrieben — aber es hat damit auch einen Geschmack und eine Pfadabhängigkeit etabliert: Ein „wirklich hochwertiger“ Coding Agent sei eben per Default ein Terminal-Interface; die Web-Variante sei bloß ein Anhang und wird sogar als „nicht programmierer genug“ verspottet.

Und das Ergebnis? Erst mal ein kompliziertes TUI bauen — lauter Farben, Statusleisten, Shortcuts, Moduswechsel — und das dann „immersive“, „effizient“ und „respektvoll gegenüber Programmierern“ nennen.

Wirklich?

## Du glaubst, du führst ein Gespräch — in Wahrheit ringst du

Für die kleine Schar, die jeden Tag im Terminal lebt, ist TUI tatsächlich angenehm. Für deutlich mehr Leute ist es eine künstlich gebaute Hürde. Wenn du über ein TUI mit einem Agenten arbeitest, machst du ständig drei Dinge:

**Shortcuts und Modi auswendig rufen.** Jedes Tool hat seine eigenen Tastatur-Gepflogenheiten. Neue Nutzer stehen verloren da, und selbst alte Hasen müssen beim Toolwechsel wieder von vorn lernen.

**Sich Informationen aus einem scrollenden Zeichenstrom herauspulen.** Der Zustand ist nicht ausgebreitet für dich sichtbar, sondern in einer Timeline vergraben — du musst per Scrollen und Suchen „Archäologie“ betreiben.

**Dafür beten, nicht versehentlich in einen seltsamen Zustand geraten zu sein.** Der Moduswechsel ist unsichtbar; oft weiß man gar nicht, in welchem Modus man gerade steckt — bis etwas kaputtgeht.

Das ist keine Interaktion mehr. Das ist Ringen mit dem Interface.

## Informationsdichte ist nicht Informationseffizienz

Das Lieblingswort der TUI-Verteidiger ist „Informationsdichte“. Aber treibt man Informationsdichte auf die Spitze, zahlt man dafür, indem Lesbarkeit und Wiederherstellbarkeit auf den Boden getreten werden.

Ein wirklich effizientes Interface sollte **den Zustand offen vor dir ausbreiten**, damit deine Augen und dein Raumgefühl das Verstehen übernehmen — welcher Task läuft, welche Session wartet auf Eingabe, welche Datei wurde geändert, ein Blick genügt. Statt dich zu zwingen, alles ins Kurzzeitgedächtnis zu stopfen und im Kopf eine unsichtbare Karte des „aktuellen Systemzustands“ zu pflegen.

Das Arbeitsgedächtnis des Menschen hat vier bis sieben Slots. Das TUI-Interaktionsmodell verschwendet deine kostbarste kognitive Ressource im Kern für „Interface-Zustand merken“, statt für „über das Problem nachdenken“.

## Es zieht außerdem eine schlechte Angewohnheit heran

Schlimmer noch: Das TUI-Ökosystem kultiviert ein kaputtes Werturteil — **die Beherrschung der Keymap eines Tools als Fähigkeit an sich zu behandeln.**

Die Folge: Menschen stecken enorme Energie in die Anpassung ans Interface statt in das Nachdenken über das Problem. Der Maßstab für einen Programmierer wird zu „Kannst du diese Shortcuts aufsagen?“ statt „Kannst du das Problem sauber zerlegen?“.

Ein gutes Tool sollte die Kosten des Denkens senken, nicht sie auf „Wie bediene ich dieses Interface?“ abwälzen.

## Web UI kann locker schnell und sauber sein

Manche sagen, das Web sei langsam und nicht „nativ“. Es ist 2026 — dieses Argument ist längst tot.

Ein Web UI kann genauso schnell und sauber sein: Als PWA installiert unterscheidet es sich kaum von einer Desktop-App, und Updates sind sogar einfacher — kein manuelles Upgrade, einfach neu laden, fertig. Lange Sessions, parallele Tasks, sichtbare Task-Zustände — genau das sind die Stärken des Browser-DOM, nicht die eines Zeichenstroms.

Mein tägliches Setup ist eine Web-Oberfläche wie OpenChamber auf einem OpenCode-Kern, dauerhaft unter starker Last — absolut stabil. Wenn ich meckern will: Die gelegentlichen kleinen Web-Bugs stören den Langzeitbetrieb nie, während mich bestimmte TUI-Moduswechsel schon oft reingelegt haben.

## Tools sind für Menschen da, nicht um zu beweisen, wer der größere „Geek“ ist

Claude Code selbst ist stark, daran zweifle ich nicht. Aber es hat den „TUI ist der einzig wahre Weg“-Geschmack und die Pfadabhängigkeit popularisiert, und die Nachahmer dahinter sind noch schlimmer — Interaktionsdesign ist ihnen zu mühsam, „im Terminal zu leben“ gilt direkt als Beweis von Hochwertigkeit.

Menschenfeindliche Interaktion als Hochwertigkeit zu verkleiden — das ist wirklich zum Lachen.

Tools sind für Menschen da. Der Maßstab sollte immer sein: **Hat es die Gesamtkosten verringert, deine Arbeit zu erledigen?** Wenn ein Interface deine Energie in „Ringen mit dem Interface“ fließen lässt, ist es ein Negativ-Asset, so „geeky“ es auch aussieht.

Wenn du das nächste Mal einen Coding Agent aussuchst, nimm erst diesen Filter ab.
