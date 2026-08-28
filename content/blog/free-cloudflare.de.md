---
title: Wie Gratis-Nutzer Cloudflare bis aufs Blut ausquetschen – wie viel gibt's wirklich umsonst?
description: "Die Cloudflare-Gratisversion trägt eine komplette persönliche Internet-Infrastruktur: DNS, CDN, Pages, Workers, KV, D1, R2, E-Mail, Tunnel, AI Gateway und mehr."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Gratis-Kontingent
  - Deployment
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original veröffentlicht auf [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare kann beinahe eine komplette persönliche Internet-Infrastruktur tragen: Domain, Website, CDN, Objektspeicher, Datenbank, Edge Functions, Tunnel ins Heimnetz, E-Mail-Weiterleitung, Captcha und AI Gateway – alles startet in der Gratisversion.

## Gratis-DNS

Cloudflare ist selbst Domain-Registrar, Preis für Registrierung und Verlängerung ist transparent. Du kannst die Domain auch bei Plattformen wie Spaceship kaufen und das DNS zu Cloudflare migrieren.

Hängst du deine Domain bei Cloudflare an, bekommst du ein rundes DNS-Managment-System.

Der Clou: Auflösung wird nicht nach Anfragen abgerechnet. Anders als manche großen China-Hoster, die widerlich genug sind, pro DNS-Auflösung zu kassieren? Peinlich, so eine Fressgier.

Cloudflare eignet sich damit perfekt für viele Domains, viele Subdomains und kleine Projekt-Cluster.

Du kannst dir bauen:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Eine Domain kaufen, verschiedene Dienste auf verschiedene Subdomains verteilen – die DNS-Auflösung selbst kostet nichts extra.

Web-Traffic, der einen Proxy braucht, kannst du durch die kleine Orange-Cloud schicken und Cloudflare Proxy, Cache und HTTPS-Zertifikate übernehmen lassen.

## Gratis-CDN

Der CDN-Cache ist das geilste Ding an Cloudflare. Viele kennen Cloudflare genau dadurch. Für Blogs, Websites und Doku-Sites ist der direkte Wert:

Etwas schnellere Zugriffe, etwas entlastete Origin, etwas gesparte Bandbreite. Vor allem wenn dein VPS billig ist, fühlt sich die Sache mit Cloudflare davor deutlich besser an.

## Gratis Pages

Pages hostet gratis statische Websites und Frontend-Projekte.

- Persönlicher Blog
- Produkt-Website
- Doku-Site
- Landing Pages
- Startseite für Open-Source-Projekte
- Kurs-Materialseiten
- Wartelisten-Seiten
- Download-Anleitungsseiten
- E-Book-Werbe Seiten

Solche Seiten lassen sich direkt hosten, ohne eigenen Server. Mit eigener Domain dran wird daraus eine langfristig gepflegte persönliche Site oder Projekt-Startseite.

## Gratis Workers

Braucht die Website API, Auth oder andere dynamische Logik, kommen die Workers ins Spiel. Der Code läuft im Cloudflare-Netzwerk, keinen Server selbst pflegen; neben JavaScript/TypeScript werden auch WebAssembly und mehr unterstützt.

Die Gratisversion bietet täglich 100.000 Requests. Schafft dein Projekt das stabil zu übertreffen, ist noch früh genug, auf Paid zu wechseln.

Workers Paid startet bei 5 US-Dollar pro Monat.

Viele kleine Projekte brauchen gar kein komplettes Backend. Ein einziger Worker reicht.

## Gratis KV

KV passt zu Daten, die schnell gelesen werden müssen, aber keine strikte Konsistenz erfordern – zum Beispiel Konfiguration, Feature-Flags und gecachte Ergebnisse. Es ist kein vollwertiger Redis-Ersatz, aber für viele einfache Anforderungen in Privatprojekten reicht es.

## Gratis D1

D1 ist die von Cloudflare gehostete SQLite-Datenbank, gut für relationale Daten. Die Gratisversion hat insgesamt 5 GB Storage-Kontingent, dazu separate Tagesquoten für Reads und Writes.

## Gratis R2

R2 ist Objektspeicher mit S3-kompatibler API – gut für Bilder, Anhänge und Backups. Der größte Vorteil: Egress aus R2 kostet keine Bandbreitengebühr, abgerechnet wird vor allem Speicher und Anzahl der Operationen; auch die Gratisversion hat ein Storage- und Request-Kontingent.

Du kannst dort ablegen:

- Bilder
- Anhänge
- PDFs
- Kursmaterial
- Softwarepakete
- Backup-Dateien
- Nutzer-Avatare
- Markdown-Bilder
- Statische Assets
- Datensätze
- Audiodateien
- Kleine Video-Dateien

## Gratis Email Routing

Email Routing leitet Mails an deine Custom Domain an einen bestehenden Posteingang weiter – das geht in der Gratisversion. Cloudflare hat inzwischen auch Email Sending (transaktionale Mails via Workers), aber für Mails an beliebige Empfänger braucht es Workers Paid – nicht mit dem kostenlosen Empfangs-Routing verwechseln.

## Gratis Turnstile

Turnstile ist die Menschen-Verifikation von Cloudflare – meist ganz ohne die üblichen "finde die Ampeln/verzerrten Buchstaben"-Übungen. Passt an:

- Login
- Registrierung
- Kommentare
- Kontaktformulare
- Wartelisten
- Download-Seiten
- E-Mail-Abos

## Gratis Tunnel

Willst du die NAS zu Hause, das lokale Dev-System oder einen Gameserver ins Internet bringen, baust du mit Tunnel einen aktiven Kanal vom Heimnetz zu Cloudflare.

Deine NAS, deine lokale Dev-Maschine, deine Intranet-Dienste lassen sich über Cloudflare Tunnel nach außen bringen. Der Kernwert:

- Kein öffentliches IP nötig
- Kein Port-Forwarding am Router
- Keine Origin-IP-Exposition
- Eigene Domain dranhängbar

Zum Beispiel:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Für Home-Server-Fans ist das Teil einfach nur geil.

## Gratis Access

Access stellt sich vor Backend, Testumgebung und interne Tools und lässt erst nach Identitätsprüfung rein. E-Mail-Codes, Google, GitHub oder Team-Identitätsanbieter – alles anschließbar, kein eigenes Register-/Login-System nötig, nur weil es eine interne Seite gibt. Zum Beispiel:

- Nur mit bestimmter E-Mail rein
- Nur mit Google-Login rein
- Nur mit GitHub-Login rein
- Nur Teammitglieder rein

Das schützt Backend, Testumgebung und interne Tools sehr gut.

## Gratis AI Gateway

AI Gateway kannst du vor verschiedene Modell-Anbieter schalten, um Requests, Latenz, Fehler und Cache-Hits zentral zu erfassen – plus Rate Limiting und Fallback. Wer früh am AI-Produkt arbeitet, spart mit einem einzigen Eingang für mehrere kompatible APIs einiges.

Damit kannst du beobachten:

- Request-Volumen
- Latenz
- Fehler
- Cache-Hits
- Modell-Aufrufe
- Rate Limits
- Fallback

Ob OpenAI, Anthropic, Workers AI oder andere kompatible APIs – du legst einfach eine Schicht davor.

Für den frühen AI-Tool-Start eignet es sich perfekt als zentraler Eingang.

## Gratis Browser Run

Cloudflare nennt diese Fähigkeit inzwischen Browser Run. Es startet komplette Browser-Sessions in der Cloud, steuerbar per Code oder AI.

Geeignet für:

- Webscreenshots
- Web → Markdown
- Automatisierte Web-Tests
- Page-Content-Scraping
- Dynamische-Webseiten-Parsing
- Web → PDF

Täglich gibt es ein Gratis-Kontingent.

## Gratis Images Transform

Cloudflare Images hat ein Transform-Kontingent: Skalieren, Croppen, Konvertieren. Bei hohem Volumen fällt es separat ins Gewicht; alternativ lässt sich auf Paid-Workers ein eigener Transcode-Service per Container fahren.

Das lässt sich nett mit R2 kombinieren:

- R2 für Originale
- Images für Thumbnails und Formatkonvertierung
- Cloudflare cachet für die Auslieferung

Passt für Blog-Cover, Avatare, Produktbilder, Artikel-Illustrationen.

Die Gratis-Kontingente von Cloudflare decken inzwischen erstaunlich viele Privatprojekte ab. Wer wirklich höhere Request-Zahlen, Rechenzeit oder Bezahl-Features braucht, schichtet ab 5 US-Dollar im Monat für Workers Paid drauf.

An der Stelle: Cloudflare, bitte zahle mir Geld!!