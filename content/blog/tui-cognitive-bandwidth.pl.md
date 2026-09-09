---
title: "TUI zabija twoją przepustowość poznawczą: czas rozbić „geekowy filtr” w AI Coding"
description: "Coraz więcej agentów kodujących z AI ściga się w wypuszczaniu TUI, wpychając interakcję z powrotem w terminalowy paradygmat z lat 80. i nazywając to „immersywnym” i „szanującym programistów”. Ten artykuł rozbiera na części trzy mechanizmy, którymi TUI systematycznie obniża przepustowość poznawczą — i wyjaśnia, dlaczego właściwym rozwiązaniem jest Web UI."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Programowanie z AI
  - Projektowanie interakcji
  - Esej
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Główny argument po raz pierwszy ukazał się na [X](https://x.com/realchendahuang/status/2087949416808518106); to pełna wersja rozważań.

Coraz więcej agentów kodujących z AI bez opamiętania wprowadza TUI, i to Claude Code ponosi dużą część winy za tę modę. Dopracował sprawę „rozmawiania z AI w terminalu przy pisaniu kodu” do granic możliwości, ale przy okazji zaszczepił pewien gust i uzależnienie od ścieżki: naprawdę klasowy Coding Agent ma domyślnie wyglądać jak terminal; wersja webowa to co najwyżej dodatek, a bywa wyśmiewana jako „nie wystarczająco programistyczna”.

Efekt? Najpierw buduje się skomplikowane TUI — kolory, paski statusu, skróty, przełączanie trybów — a potem nazywa to „immersywnym”, „wydajnym” i „szanującym programistów”.

Serio?

## Wydaje ci się, że rozmawiasz, a w istocie zmagasz się

Dla niewielkiej grupy osób żyjących cały dzień w terminalu — jasne, TUI daje frajdę. Ale dla znacznie większej liczby ludzi to próg postawiony celowo. Współpracując z agentem przez TUI, tak naprawdę non stop robisz trzy rzeczy:

**Przypominasz sobie skróty i tryby.** Każde narzędzie ma własne nawyki klawiszowe; nowi użytkownicy są zagubieni, a nawet weterani muszą się przestawiać przy każdej zmianie narzędzia.

**Odnajdujesz informacje w przewijającym się strumieniu znaków.** Stan nie jest rozłożony przed tobą — jest pogrzebany w osi czasu, którą „wykopywasz” przewijaniem i szukaniem.

**Modlisz się, żeby przypadkiem nie wpaść w jakiś dziwny tryb.** Przełączanie trybów jest niewidoczne; często nie wiesz, w którym trybie jesteś, dopóki coś nie pójdzie nie tak.

To już nie jest interakcja — to zapasy z interfejsem.

## Gęstość informacji to nie wydajność informacji

Ulubione słowo obrońców TUI to „gęstość informacji”. Ale gdy wypchniesz gęstość do granic, płacisz za to zadeptaniem czytelności i odtwarzalności do minimum.

Naprawdę wydajny interfejs powinien **rozłożyć stan przed twoimi oczami** i pozwolić, by rozumiały go wzrok i zmysł przestrzeni — które zadanie działa, która sesja czeka na input, który plik się zmienił — jedno spojrzenie i wszystko jasne. Zamiast zmuszać cię do upychania wszystkiego w pamięci krótkotrwałej, podczas gdy twój mózg utrzymuje niewidzialną mapę „bieżącego stanu systemu”.

Pamięć robocza człowieka ma od czterech do siedmiu slotów. Model interakcji TUI w istocie wydaje najcenniejszy zasób poznawczy na „zapamiętywanie stanu interfejsu”, a nie na „myślenie o problemie”.

## Przy okazji wychowuje zły nawyk

Co gorsza, ekosystem TUI hoduje wypaczony osąd wartości: **za umiejętność uważa się biegłość w klawiszach konkretnego narzędzia.**

W efekcie ludzie przelewają ogrom energii na adaptację do interfejsu zamiast na myślenie o problemie. Miarą programisty staje się „czy umiesz wyrecytować te skróty”, a nie „czy umiesz klarownie rozłożyć problem na części”.

Dobre narzędzie powinno obniżać koszt myślenia, a nie przenosić koszt myślenia na „jak obsługiwać ten interfejs”.

## Web UI może być szybki i czysty jednocześnie

Niektórzy mówią, że web jest wolny i nie „natywny”. Jest 2026 — ten argument umarł dawno temu.

Web UI może być naprawdę szybki i czysty: po zainstalowaniu jako PWA prawie nie różni się od klienta desktopowego, a aktualizacje są jeszcze wygodniejsze — bez ręcznych upgrade'ów, jedno odświeżenie i masz najnowszą wersję. Długie sesje, równoległe zadania, wizualizacja statusu zadań — to akurat mocne strony DOM w przeglądarce, a nie strumienia znaków.

Mój codzienny zestaw to webowy interfejs typu OpenChamber na rdzeniu OpenCode, używany długo i intensywnie — stabilny jak skała. Gdybym miał się przyczepić, drobne wpadki weba nigdy nie przeszkadzają w długoterminowym użytkowaniu, natomiast przełączanie trybów w niektórych TUI-ach ugryzło mnie już nie raz.

## Narzędzia są dla ludzi, nie do udowadniania, kto jest bardziej „geekowy”

Claude Code samo w sobie jest mocne, o tym nie dyskutuję. Ale to ono spopularyzowało gust „TUI to jedyna słuszna droga”, a naśladowcy, którzy pociągnęli za nim, są jeszcze gorsi — nie starczą się nawet na projektowanie interakcji, a „mieszkanie w terminalu” traktują jako dowód klasy.

Pakowanie interakcji wrogiej człowiekowi w kostium wyrafinowania — to naprawdę komiczne.

Narzędzia są dla ludzi. Kryterium powinno być zawsze jedno: **czy obniżyło całkowity koszt wykonania twojej pracy?** Jeśli interfejs zmusza cię do wydawania energii na „zmagania z interfejsem”, to pasyw, jakby nie był „geekowy”.

Następnym razem, gdy wybierasz Coding Agent, zdejmij najpierw ten filtr.
