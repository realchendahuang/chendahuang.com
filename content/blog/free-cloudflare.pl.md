---
title: Jak darmowy użytkownik wycisnąć z Cloudflare wszystko — na ile realnie starcza darmowy plan?
description: "Darmowy plan Cloudflare może unieść całą prywatną infrastrukturę internetową: DNS, CDN, Pages, Workers, KV, D1, R2, e-mail, Tunnel, AI Gateway i więcej."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Darmowy plan
  - Wdrożenie
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Pierwotnie opublikowano na [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare może unieść niemal całą prywatną infrastrukturę internetową: domeny, strony, CDN, storage obiektów, bazy danych, funkcje brzegowe, tunelowanie, przekazywanie e-maili, CAPTCHA i bramę AI — wszystko to może wystartować na darmowym planie.

## Darmowy DNS

Cloudflare jest sam w sobie rejestratorem domen, z dość przejrzystymi cenami rejestracji i odnowienia. Możesz też kupić domenę na platformach typu Spaceship i przenieść hosting DNS na Cloudflare.

Gdy domena trafi na Cloudflare, dostajesz solidny system zarządzania DNS.

Kluczowa kwestia: rozwiązywanie DNS nie jest rozliczane za każde zapytanie. Inaczej niż u niektórych dużych krajowych dostawców, którzy mają czelność liczyć opłaty od liczby zapytań o rozwiązywanie — bezczelność bez granic.

Cloudflare świetnie sprawdza się przy matrycy wielu domen, wielu subdomen i małych projektów.

Możesz uruchomić:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Kup jedną domenę, przypisz różne subdomeny do różnych usług, a samo rozwiązywanie DNS nie kosztuje nic ekstra.

Dla ruchu webowego, który potrzebuje proxy, włącz pomarańczową chmurkę i pozwól Cloudflare zająć się proxy, cache i certyfikatami HTTPS.

## Darmowe CDN

Caching CDN to najfajniejsza rzecz, jaką ma Cloudflare — to dzięki niemu większość ludzi po raz pierwszy słyszy o tej firmie. Dla blogów, stron oficjalnych i stron dokumentacji wartość jest prosta:

Szybsze odwiedziny, lżejszy serwer źródłowy i mniejsze zużycie pasma. Zwłaszcza jeśli siedzisz na tanim VPS-ie, postawienie Cloudflare z przodu robi ogromną odczuwalną różnicę.

## Darmowe Pages

Pages może za darmo hostować statyczne strony i projekty frontendowe.

- Blogi prywatne
- Strony produktowe
- Strony dokumentacji
- Strony lądowania
- Strony projektów open source
- Strony z materiałami kursowymi
- Strony listy oczekujących
- Strony z instrukcją pobierania
- Strony promocyjne e-booków

Takie strony można hostować bezpośrednio, bez kupowania osobnego serwera. Podepnij własną domenę, a stanie się długoterminową stroną prywatną lub stroną główną projektu.

## Darmowe Workers

Gdy Twoja strona potrzebuje API, uwierzytelniania lub innej logiki dynamicznej, użyj Workers. Twój kod działa w sieci Cloudflare — bez utrzymywania serwera po Twojej stronie. Oprócz JavaScript/TypeScript obsługuje też WebAssembly i inne środowiska uruchomieniowe.

Darmowy plan obejmuje 100 tys. żądań dziennie. Jeśli projekt prywatny naprawdę wyrośnie ponad to, przejdź na wersję płatną — nie ma pośpiechu.

Workers Paid zaczyna się od 5 USD miesięcznie.

Wiele małych projektów w ogóle nie potrzebuje pełnego backendu. Wystarczy jeden Worker.

## Darmowe KV

KV pasuje do danych, które wymagają szybkiego odczytu, ale nie silnej spójności — konfiguracja, flagi funkcji, wyniki cache. To nie jest pełny zamiennik Redisa, ale pokrywa sporo prostych potrzeb w projektach prywatnych.

## Darmowe D1

D1 to zarządzana przez Cloudflare baza SQLite, dobra do danych relacyjnych. Darmowy plan obejmuje łącznie 5 GB pamięci plus dzienne limity odczytu/zapisu.

## Darmowe R2

R2 to storage obiektów zgodny z API S3, dobry do obrazów, załączników i kopii zapasowych. Jego największa zaleta: brak opłat za pasmo przy serwowaniu z R2 — płacisz głównie za przechowywanie i operacje. Jest też darmowy plan z limitem na jedno i drugie.

Możesz tam włożyć:

- Obrazy
- Załączniki
- PDF-y
- Materiały kursowe
- Pakiety oprogramowania
- Pliki kopii zapasowych
- Avatary użytkowników
- Obrazy do Markdowna
- Statyczne zasoby
- Zbiory danych
- Pliki audio
- Niewielkie materiały wideo

## Darmowy Email Routing

Email Routing przekazuje e-maile wysyłane na Twoją własną domenę do istniejącej skrzynki — dostępny na darmowym planie. Cloudflare ma też Email Sending do e-maili transakcyjnych przez Workers, ale wysyłanie do dowolnych odbiorców wymaga Workers Paid, więc nie myl tego z darmowym przekazywaniem przychodzącym.

## Darmowy Turnstile

Turnstile to weryfikacja człowieczeństwa od Cloudflare, a użytkownicy zwykle nie muszą rozpoznawać świateł ani zniekształconych liter. Dobry do:

- Logowania
- Rejestracji
- Komentarzy
- Formularzy kontaktowych
- List oczekujących
- Stron pobierania
- Subskrypcji e-mailowych

## Darmowy Tunnel

Chcesz wystawić domowego NAS-a, lokalną maszynę deweloperską albo serwer gier do internetu? Użyj Tunnel, żeby zbudować aktywne połączenie z Twojej sieci wewnętrznej do Cloudflare.

Twój NAS, lokalne maszyny dev, usługi wewnętrzne — wszystko to można wystawić przez Cloudflare Tunnel. Podstawowa wartość:

- Bez publicznego IP
- Bez przekierowania portów na routerze
- Bez ujawniania IP źródła
- Można podpiąć własną domenę

Na przykład:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

To prawdziwy dar dla majsterkowiczów z serwerami domowymi.

## Darmowy Access

Access staje przed panelami administracyjnymi, środowiskami staging i narzędziami wewnętrznymi, weryfikując tożsamość, zanim wpuści ludzi do środka. Działają e-mail OTP, Google, GitHub i dostawcy tożsamości zespołowej — bez pisania kolejnego systemu rejestracji/logowania tylko dla jednej wewnętrznej strony. Na przykład:

- Wchodzą tylko określone adresy e-mail
- Wchodzi tylko logowanie przez Google
- Wchodzi tylko logowanie przez GitHub
- Wchodzą tylko członkowie zespołu

To bardzo przydatne do ochrony backendów, środowisk staging i narzędzi wewnętrznych.

## Darmowa brama AI Gateway

AI Gateway może stanąć przed wieloma dostawcami modeli, jednolicie logując żądania, opóźnienia, błędy i trafienia cache, a także robiąc rate limiting i fallback. Przy wczesnym budowaniu produktu AI zarządzanie wieloma kompatybilnymi API przez jeden punkt wejścia oszczędza sporo zachodu.

Dzięki niemu możesz obserwować:

- Wolumen żądań
- Opóźnienia
- Błędy
- Trafienia cache
- Wywołania modeli
- Rate limiting
- Fallback

Niezależnie od tego, czy używasz OpenAI, Anthropic, Workers AI czy różnych kompatybilnych API, możesz owinąć to jedną warstwą.

Dla wczesnych produktów AI świetnie nadaje się na jednolity punkt wejścia.

## Darmowy Browser Run

Cloudflare nazywa teraz tę funkcję Browser Run. Uruchamia pełne sesje przeglądarki w chmurze, sterowalne kodem lub przez AI.

Dobry do:

- Zrzutów ekranu stron
- Konwersji strony do Markdowna
- Automatycznego testowania stron
- Zbierania treści stron
- Parsowania stron dynamicznych
- Konwersji strony do PDF

Jest dzienny darmowy limit.

## Darmowy Images Transform

Cloudflare Images ma limit transformacji do skalowania, przycinania i konwersji formatów. Intensywne użycie rozliczane jest osobno, albo możesz uruchomić własną usługę transkodowania na płatnych Workers z Containers.

Połącz to z R2:

- R2 przechowuje oryginały
- Images robi miniatury i konwersje formatów
- Cache Cloudflare dystrybuuje

Dobre do okładek blogów, avatarów, zdjęć produktów i ilustracji do artykułów.

Darmowy limit Cloudflare pokrywa już sporo projektów prywatnych. Jeśli naprawdę potrzebujesz większego wolumenu żądań, czasu obliczeń lub płatnych funkcji, zacznij od 5 USD/mies. za Workers Paid i skaluj w górę.

I tutaj chcę powiedzieć: Cloudflare, przelej mi pieniądze!!
