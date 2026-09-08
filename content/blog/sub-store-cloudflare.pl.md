---
title: Przeniosłem agregację subskrypcji proxy na Cloudflare
description: Połącz wiele usług proxy plus własne węzły w jedną subskrypcję, z regułami routingu skonfigurowanymi po stronie serwera — klient po prostu subskrybuje.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Obejście cenzury
  - Projekt open source
minRead: 4
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

Korzystam z usług proxy od trzech, czterech lat i przez jakiś czas prowadziłem też własne węzły VPS. Zawsze było jedno irytujące: trzy czy pięć subskrypcji plus kilka własnych serwerów rozsianych w kliencie, dodawane jedna po drugiej, a reguły routingu trzeba było konfigurować od nowa w każdym kliencie. Nowe urządzenie, nowy klient albo zakładanie komuś z rodziny — i przechodzisz przez cały rytuał od nowa.

Potem pomyślałem: nie ma powodu, żeby zarządzać subskrypcjami osobno wewnątrz klientów. Zbierz je wszystkie w jeden link, zdefiniuj reguły po stronie serwera i pozwól klientowi po prostu subskrybować — czysto. Wcześniej korzystałem z podejścia Sub-Store, ale działało na własnym serwerze, a utrzymanie uważałem za uciążliwe. Więc tym razem napisałem własną wersję hostowaną na Cloudflare, nazwaną sub-store-cloudflare, open source na [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## Naprawdę robi tylko jedną rzecz

Łączy wiele źródeł subskrypcji w jedną subskrypcję.

Konkretnie możesz do niego wrzucić kilka rzeczy:

- Linki subskrypcji z kilku usług proxy
- Tekst węzłów z własnego VPS (vless, trojan, ss, vmess — wszystko gra)
- Można nawet wkleić tymczasową porcję węzłów

Po wejściu Worker je pobiera i usuwa duplikaty, filtruje według reguł, które mu podasz, a następnie w razie potrzeby zmienia nazwy, dodaje flagi i rozwiązuje domeny. Wszystko wychodzi połączone w jedną zbiorczą subskrypcję — klient subskrybuje ten jeden link i gotowe.

Reguły mieszkają po stronie serwera. W zestawie jest kilka popularnych szablonów Mihomo — acl4ssr, whitelist/blacklist Loyalsoldiera, ai-streaming i tym podobne — z grupami routingu i zestawami reguł skonfigurowanymi w chmurze. Wrzuć subskrypcję do klientów takich jak mihomo/clash, surge, sing-box, shadowrocket, a pobierzesz gotową subskrypcję z wbudowanymi regułami routingu — bez ręcznego pisania reguł i bez utrzymywania URL-i zestawów reguł po tej stronie.

## Dlaczego akurat Cloudflare

Pragmatyczne powody:

- **Bez serwera.** Workers + D1, a darmowy limit wystarcza do użytku prywatnego — oszczędzasz i pieniądze na serwer, i utrzymanie.
- **Domena workers.dev sama jest poza murem.** Twoje połączenie klienta po subskrypcję działa od razu — bez tej chorej matrioszki, gdzie „serwer jest za granicą, ale węzeł i tak potrzebuje drabiny, żeby ściągnąć własną subskrypcję".
- **Po wdrożeniu to panel administracyjny w sieci plus endpoint do pobierania.** Zmieniasz klienta na telefonie i wciąż możesz otworzyć stronę, żeby zmienić konfigurację.

Świadomie utrzymałem mały stos: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron są poza ścieżką krytyczną — im mniej, tym lepiej.

## Celowo dwie ścieżki wdrożenia

Pierwsza jest dla ludzi, którzy po prostu chcą używać: kliknij przycisk Deploy to Cloudflare w repozytorium. Cloudflare pobiera repo, tworzy Workera i D1, prosi o dwa tokeny i na koniec wręcza link zarządzania z tokenem. Krok po kroku, bez wiersza poleceń.

Druga jest dla mnie i dla ludzi, którzy lubią majsterkować: instalacja jednym kliknięciem z agentem AI.

Repo zawiera protokół agenta (AGENTS.md + SKILL w środku). Wpisujesz źródła subskrypcji, pożądane połączone subskrypcje i szablony reguł do lokalnego pliku konfiguracyjnego, uruchamiasz `pnpm run install:cloudflare`, a agent sprawdza Twój login do Cloudflare, tworzy bazę danych, zapisuje sekrety, migruje, wdraża, importuje konfigurację, weryfikuje linki i na koniec wręcza link zarządzania i link pobierania.

Swoją subskrypcję wdrożyłem dokładnie tą ścieżką, więc polecam tę drogę — mniej zachodu. Przy użyciu z Codex / Claude Code po prostu skopiuj prompt z `agent/install.prompt.md` w repozytorium.

## Dla kogo to jest

Mówiąc wprost: jeśli masz więcej niż jedną usługę proxy plus kilka własnych węzłów i chcesz połączyć je w jedną subskrypcję do własnego użytku — to jest projekt dla ciebie. Jeśli dobrze ci się żyje z jedną usługą, naprawdę tego nie potrzebujesz.

Kod jest w pełni open source, AGPL. Interakcja frontendowa to ukłon w stronę oryginalnego Sub-Store; oryginał działa w kontenerze i pokrywa szerszy ekosystem klientów. Moja wersja to szczuplejsza forma natywna dla Cloudflare — łatwiejsza do modyfikacji i bezpośredniego wdrożenia, nie klon linia po linii.

Zainteresowani mogą przejrzeć repo — README jest dość kompletne, po prostu postępuj według kroków wdrożenia.
