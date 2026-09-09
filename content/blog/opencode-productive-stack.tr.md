---
title: "Kararlı, Hızlı, Üretken, Ucuz: AI Coding Setimin Tam Kaydı"
description: "OpenCode + OpenChamber + iki DeepSeek V4 Flash aboneliği: 15 proje aynı anda kod çalıştırıyor, kota ancak biraz aşındı. Tüm kurulumu seriyorum: bağlam budama, katmanlı bellek, masaüstü otomasyonu ve “orijinal ikiliyle devam et” dersi."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - AI ile kodlama
  - Yapılandırma
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ana fikir ilk olarak [X](https://x.com/realchendahuang/status/2086611065920733305)'te yayınlandı; bu yazı konfigürasyonun tam kaydı.

Önce sonuç: **OpenCode + OpenChamber + OpenCode Go üzerinden DeepSeek V4 Flash aboneliği + Ollama Cloud üzerinden DeepSeek V4 Flash aboneliği.**

Bu kurulumu uzun süredir yoğun kullanıyorum; dört kelimeyle özet: kararlı, hızlı, üretken, ucuz. Peş peşe 15 proje açık durdu, hepsi aynı anda kod çalıştırdı, kota ancak biraz tırmandı.

## Neden OpenCode + OpenChamber

Seçim sürecini [başka bir yazıda](/blog/agent-harness-selection) anlattım; burada sadece sonuç düzeyindeki gerekçeler: OpenCode şu an en dengeli çoklu model çekirdeği — açık kaynak, çok sayıda Provider, Client/Server, masaüstü uygulaması ve Subagent'ler olgun; OpenChamber ise açık kaynak projelerde kullandığım en iyi cilalı Harness GUI'si, geliştiricisi gerçekten titizlikle bakıyor, zarif ve kararlı, arada bir uğrayan küçük aksaklıklar uzun vadeli kullanımı hiç etkilemiyor.

Web arayüzü + PWA, masaüstü uygulamasından neredeyse farksız, güncellemeleri de elle yapılmıyor.

## Kurulum Üç Temel İhtiyacın Etrafında Kuruldu

OpenCode kurulumum üç şeyin etrafında: bağlam yönetimi, bellek sistemi, dış yetenekler.

**1. opencode-dcp (açık kaynak) — dinamik bağlam budama.** Bağlam bir eşiğe ulaşınca eski içerik otomatik olarak teknik özetlere sıkıştırılıyor: kritik bilgi korunuyor, gürültü atılıyor, tekrarlar temizleniyor, araç hataları gibi düşük değerli içerik bağlamdan çıkarılıyor. Uzun oturumlarda bağlam patlamıyor, para ve Token tasarrufu — uzun görevlerin bütün gün çalışabilmesinin temeli bu.

**2. opencode-goal-plugin — hedef yönetimi.** Uzun görevlere Goal modu ekliyor, ajan saptığında geri çekilebiliyor.

**3. Hermes Memory — katmanlı bellek (ihtiyaç olursa ileride açık kaynak yaparım).** En ağır eklentim: Hermes ajanının katmanlı bellek mekanizmasını OpenCode'a taşıdım; oturumlar arası kullanıcı tercihlerini, proje kararlarını ve geçmiş dersleri hatırlıyor. Yeni projeler sıfırdan öğretme gerektirmiyor.

**4. context7-MCP.** Kütüphane ve framework'lerin güncel resmi dokümanlarına bak; kendin kazmaya gerek yok.

**5. grep-MCP.** GitHub'ın tüm kodunda gerçek kullanımları ara; hafızadan yazmaktan çok daha güvenilir.

**6. open-computer-use — masaüstü otomasyonu.** AI'nin macOS uygulamalarını doğrudan kullanmasını sağlıyor: tıklama, yazma, kaydırma, sürükleme, ekran görüntüsü, erişilebilirlik ağacını okuma. Test ve kabul aşamalarında özellikle işe yarıyor.

## Maliyet Hesabı: İki Abonelik Nasıl Harcanıyor

DeepSeek V4 Flash bu stack'in fiyat-performans çekirdeği: gerçekten zeki, gerçekten ucuz. OpenCode Go aboneliği ana iş akışını karşılıyor; Ollama Cloud aboneliği yükü bölen ikinci kanal — iki abonelik toplamda ana akım bir birinci taraf Coding Plan'dan ucuz, çıktısı daha yüksek.

“Model üçüncü taraf kabuğa girince aptallaşır” iddiasını açmak gerek: **Bozulmanın kökü, “kabuğun modele özel Harness Engineering yapmaması”**; kabuk değiştirmek değil. OpenCode'un açık modellere desteği birinci lig; DeepSeek V4 Flash içinde kararlı ve hızlı koşuyor — tam da bu yüzden üzerine 15 proje yükleme cesaretini buldum.

## “Orijinal İkiliyle Devam Et” Dersi

Gruplarda arkadaşlar sık soruyor: evrensel bir AI kodlama masaüstü var mı? Her aboneliğe bağlanan, hiçbir modeli aptallaştırmayan?

Her gün yoğun uğraşan birkaç arkadaşla konuştuktan sonra ortak sonucumuz: yok. Orijinal ikiliyle devam et.

- GPT → Codex: resmi abonelik doğrudan, en kararlı native planlama.
- Gemini → AntiGravity: hız tavanı, uzun pencerelerde takılmıyor.
- DeepSeek, GLM ve diğer açık modeller → OpenCode / ZCode gibi açık model dostu Harness'ler.

Modeli uymayan kabuğa sok, ortalama aptallaşma, yavaşlama ve abonelik tıkanıklığından kurtulamazsın. **Her modeli en rahat ettiği koltukta tut; birleşimi senin setin olur.**

## Son Olarak

Bu kurulumu aylardır çalıştırıyorum; en büyük his para biriktirmek değil, “görev açma cesareti” — kararlı ve ucuz olduğu için 15 proje açmak içimi ürpertmiyor. Bir araç setinin değeri en sonunda üzerine ne kadar iş yükleme cesaretinde belli olur.
