---
title: Ich habe meine Sub-Abo-Aggregation auf Cloudflare verlegt
description: Mehrere Proxy-Dienste plus eigene Nodes zu einem einzigen Abo verkneten, Routing-Regeln serverseitig konfigurieren – der Client muss nur noch abonnieren.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Zensurumgehung
  - Open-Source-Projekt
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Ich nutze Proxy-Dienste seit drei, vier Jahren und habe zwischendurch auch eigene VPS-Nodes betrieben. Dabei nervte mich immer eins: Ich hatte drei, fünf Abos plus ein paar eigene Server, verstreut im Client, einzeln hinzugefügt – und die Routing-Regeln musste ich in jedem Client einzeln neu einstellen. Neues Gerät, neuer Client, jemanden in der Familie einrichten – und schon ging das ganze Ritual von vorn.

Dann dachte ich mir: Abos muss man gar nicht verstreut im Client pflegen. Zieh alles zu einem Link zusammen, definiere die Regeln serverseitig, und der Client abonniert einfach – fertig, sauber. Den Ansatz von Sub-Store hatte ich früher schon genutzt, aber der lief auf einem eigenen Server, und die Pflege fand ich lästig. Also habe ich diesmal selbst eine Version geschrieben, die auf Cloudflare läuft: sub-store-cloudflare, Open Source auf [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## Es macht eigentlich genau eine Sache

Mehrere Abo-Quellen zu einem einzigen Abo verkneten.

Konkret kannst du ein paar Sachen reinwerfen:

- Abo-Links von mehreren Proxy-Diensten
- Node-Text von deinem eigenen VPS (vless, trojan, ss, vmess – alles geht)
- Auch mal einen temporär eingefügten Batzen Nodes

Im Hintergrund holt der Worker die Quellen, entfernt Duplikate, filtert nach deinen Regeln, benennt um, ergänzt Flaggen und löst Domains auf. Raus kommt ein kombiniertes Abo – und der Client abonniert genau diese eine Adresse.

Die Regeln liegen serverseitig. Eingebaut sind ein paar gängige Mihomo-Templates: acl4ssr, die White-/Blacklist von Loyalsoldier, ai-streaming und Co. – Routing-Gruppen und Regelsets sind komplett in der Cloud konfiguriert. Wirfst du das Abo in Clients wie mihomo / clash, surge, sing-box oder shadowrocket, lädst du dir ein fertiges Abo mit eingebauten Routing-Regeln herunter – kein manuelles Regel-Schreiben, kein Pflegen von Regelset-URLs.

## Warum unbedingt Cloudflare?

Sehr pragmatische Gründe:

- **Kein Server.** Workers + D1, das Gratis-Kontingent reicht für den persönlichen Gebrauch – Serverkosten und Pflege sind gestrichen.
- **Die workers.dev-Domain liegt selbst außerhalb der Mauer.** Dein Client verbindet sich problemlos, um das Abo zu ziehen – kein „Server im Ausland, Node-Abo braucht trotzdem einen Proxy"-Schachtelscheiß.
- **Nach dem Deploy hast du ein Web-Admin-Interface plus einen Download-Endpunkt.** Auch beim Client-Wechsel auf dem Handy kannst du die Config per Browser anpassen.

Den Tech-Stack habe ich bewusst klein gehalten: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron – alles nicht im Kernpfad, so wenig wie möglich ist am besten.

## Zwei Deploy-Wege, extra eingebaut

Der erste für alle, die es einfach nutzen wollen: Den „Deploy to Cloudflare"-Button im Repo klicken, Cloudflare zieht das Repo, legt Worker und D1 an, fragt dich nach zwei Token und liefert dir danach einen Admin-Link mit Token. Schritt für Schritt, keine Kommandozeile nötig.

Der zweite – für mich selbst und alle Bastler: per AI Agent in einem Rutsch.

Im Repo steckt ein Agent-Protokoll (AGENTS.md + SKILL im agent-Verzeichnis). Du schreibst Abo-Quellen, das gewünschte Kombi-Abo und die Regeltemplates in eine lokale Config, rennst `pnpm run install:cloudflare`, und der Agent prüft deinen Cloudflare-Login, legt die Datenbank an, schreibt Secrets, migriert, deployt, importiert die Config, verifiziert die Links – und reicht dir am Ende Admin- und Download-Link.

Ich habe selbst den Weg über die Schiene genommen und empfehle ihn deshalb auch – weniger Fummelei. Für Codex / Claude Code einfach die Prompts aus `agent/install.prompt.md` im Repo kopieren.

## Für wen das ist

Geradewegs gesagt: Wer mehr als einen Proxy-Dienst hat, dazu ein paar eigene Nodes, und das Ganze zu einem einzigen Abo für sich zusammenführen will – genau der ist die Zielgruppe. Kommst du mit einem einzigen Dienst gut zurecht, brauchst du das hier wirklich nicht.

Der Code ist vollständig Open Source, unter AGPL. Das Frontend-Konzept zollt dem Original Sub-Store Respekt; das Original läuft im Container und deckt ein breiteres Client-Ökosystem ab, ich habe die schlankere Cloudflare-native Form gebaut – einfach für mich anzupassen und direkt zu deployen, kein Eins-zu-eins-Nachbau.

Interessierte können im Repo stöbern, die README ist ziemlich komplett – folg einfach der Anleitung zum Deployen.