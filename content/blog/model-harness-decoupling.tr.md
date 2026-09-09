---
title: "Birinci taraf Harness her zaman sürümün cevabı değil: açık model çağında modeli ve Harness'i ayrı seçin"
description: "Claude kullanıyorsan Claude Code mu? Açık model çağında bu içgüdünün güncellenmesi gerekiyor. Birinci tarafın avantajı gerçek, ama iyi bir model eğitmek ve iyi bir Harness inşa etmek tamamen farklı iki mühendislik alanı — bu yazı model ve Harness'in artık neden ayrı seçilebildiğini anlatıyor, artı beş Harness'in konumlandırma haritası."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Araç seçimi
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ana fikir ilk olarak [X](https://x.com/realchendahuang/status/2093890559874388141)'te yayınlandı; bu yazı argümanın tam hâli, beş Harness'in konumlandırma haritasıyla birlikte.

Coding Agent seçerken çoğu insanın ilk refleksi gayet doğal: Claude kullanıyorsan Claude Code; GPT kullanıyorsan Codex; GLM kullanıyorsan ZCode; DeepSeek kullanıyorsan elbette önce DeepSeek'in kendi Harness'ine bakılır.

Bu düşünce aslında gayet makul. Birinci tarafın en büyük avantajı, kendi modelini en iyi bilmesi.

## Birinci tarafın avantajı gerçek

Model ne tür Prompt'ları seviyor, hangi Tool Schema tasarımı en stabil çalışıyor, uzun Context nasıl organize edilmeli, yeni sürüm hangi yetenekleri getiriyor, en çok nerede zorlanıyor — bunların hepsini birinci taraf genelde üçüncü taraflardan önce bilir.

Bu yüzden model ve Harness'in uzun vadeli birlikte geliştiği Claude Code ve Codex gibi ürünlerde birinci taraf kombosu genelde en güçlü “sürüm cevabı” oluyor. Bu noktada itirazım yok.

## Ama model eğitmek ve Harness yapmak tamamen farklı iki mühendislik alanı

DeepSeek, GLM gibi açık modellere gelince işler ilginçleşmeye başlıyor — çünkü iyi bir model eğitmek ile iyi bir Harness yapmak aslında tamamen farklı iki mühendislik alanı.

Coding Agent gerçekten çalışmaya başladıktan sonra modelin dışında kocaman bir sorun yığını beliriyor:

- Dosyalar nasıl okunacak, kod nasıl düzenlenecek
- Agent Loop nasıl kontrol edilecek, Context nasıl sıkıştırılacak
- Cache nasıl kullanılacak, Tool Call hatasından sonra nasıl toparlanılacak
- Subagent'ler nasıl planlanacak, izinler nasıl yönetilecek

Buraların ne kadar iyi yapıldığı, aynı modelin sonunda ne kadar iyi kullanıldığını doğrudan belirliyor. Aynı model, başka bir Harness'te, deneyim yerle gök kadar farklı olabilir.

## Daha Büyük Sorun: Modeller Çok Hızlı Güncelleniyor

Bugün GLM güçlü; gelecek ay DeepSeek daha da vurucu bir Flash çıkarabilir; bir süre sonra da başka yeni bir model yetişir.

Tüm Coding iş akışın tek bir birinci taraf ürününe bağlıysa, model değiştirmek çoğu zaman araçları ve alışkanlıkları da değiştirmek demek. Aylarca ayarladığın konfigürasyonlar, bellekler, iş akışları — hepsi baştan.

Üçüncü taraf Harness'lerin değeri tam burada: **Bildiğin araçları, Skills'leri, MCP'leri, izinleri ve iş akışlarını sabitleyip altındaki yalnızca modeli değiştirebiliyorsun.** Bugün DeepSeek, yarın GLM, öbür gün başkası — çalışma ortamı baştan kurulmuyor.

## Beş Harness'in Konumlandırma Haritası

Ana akımdaki beşlinin konumunu netleştirelim (Ağustos 2026 sonu itibarıyla benim kullanım deneyimime göre):

**Pi**: felsefe son derece sade; Harness modele olabildiğince az müdahale ediyor. Hafif, hızlı, Token gideri düşük, biçimlendirmeye son derece açık. Kendi uzun vadeli Agent'ının temeli için ideal — basit, temiz, keyfine göre modlanır.

**OMP**: Pi'nin üstüne LSP, Debugger, Browser, AST gibi ağır Coding yetenekleri yığmaya devam ediyor; sanki Agent'a tam takım bir IDE takmışlar. Gerçekten yoğun kod yazan ve karmaşık Repo gezinmesi gereken senaryolara uygun.

**DeepSeek Harness**: en uzağa giden — Everything is Plugin. Agent Loop, araçlar, izinler, Preset ve UI'nin hepsi sökülüp yeniden birleştirilebiliyor. Agent mimarisiyle, Preset'lerle, çoklu-Agent ve yeni nesil Runtime ile uğraşanlara uygun. PTC modunu daha çok dene — daha hızlı, daha Token tasarruflu.

**OpenCode**: şu an en dengeli sınıf; açık kaynak, çok sayıda Provider, büyük ekosistem, Client/Server, masaüstü uygulaması ve Subagent'ler olgunlaşmış. Olgun, genel amaçlı, çok modelli bir Coding Agent isteyenler için.

**Command Code**: bütünüyle başka bir yol — modelin açığını kapatmayı çok seviyor. Hatalı Tool Call parametreleri yerelde düzeliyor; dosyaların tekrar tekrar okunması tekilleştiriliyor; uzun oturumlar Cache Hit'i yükseltmek için Stable Prefix tutuyor; Context patlamak üzereyken Compaction yapıyor. Bu anlayış, DeepSeek V4 Flash, GLM-5.3 Flash gibi hamal modellerde en büyük değeri üretiyor: model biraz zayıfsa, Harness telafi ediyor.

## Benim Seçimim

Sadece uzun vadeli esnekliğe bakacaksam ben hâlâ Pi'yi tercih ediyorum. Ama bugün benden DeepSeek V4 Flash ya da GLM-5.3 ile ciddi iş yaptırmamı isterlerse, Command Code'un tadına doyasıya bakardım — model ve Harness eşleşmesi göreve göre ayarlanır, kampa göre değil.

Açık model çağında model ve Harness artık tamamen ayrı seçilebiliyor. **“Kimin modeline kimin aracı” sorusunu bırak; “bu model hangi Harness'te en iyi işi çıkarır” diye sormaya başla.**
