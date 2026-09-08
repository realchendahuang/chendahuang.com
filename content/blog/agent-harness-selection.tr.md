---
title: "Pi Agent, OMP, Codex ve ZCode ile uğraştıktan sonra neden sonunda OpenCode + OpenChamber'ı seçtim"
description: "Agent Harness seçiminin muhasebesi: GUI deneyimi, satıcı kilidi ve ikincil geliştirme özgürlüğü olmak üzere üç kriter Pi Agent, OMP, Codex ve ZCode'u eledi ve sonunda OpenCode çekirdeği + OpenChamber arayüzüne karar verdim."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Araç seçimi
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Aslen [X](https://x.com/realchendahuang/status/2085410520459604026)'te yayınlandı.

Son zamanlarda Pi Agent, OMP, ZCode, Codex ve OpenCode gibi Agent Harness'lerle uğraşıyorum ve sonunda gerçekten neye ihtiyacım olduğunu anladım.

## Üç kriterim

### Birincisi: olgun ve istikrarlı bir GUI

GUI'ye alıştım, TUI'ye dayanamıyorum. Siyah bir terminal kutusunda sohbet etmek çok zor—onu gerçekten kullanılır kılmak için tonlarca kısayol ve komut ezberlemen gerekiyor. Oysa bir GUI'de sadece sezgisel olarak simgelere ve düğmelere tıklaman yeterli.

Bu yüzden olgun, istikrarlı ve şık bir GUI'ye ihtiyacım var.

Bu kriter tek başına **Pi Agent** ve **OMP**'yi eledi. Çekirdekleri kötü olduğu için değil, çevrelerindeki topluluk GUI'leri gerçekten berbat olduğu için. Kendi başına sıfırdan yapmak çok emek ister ve bu araçlar o kadar özelleştirilebilir ki, elde yaptığın GUI'nin taşınabilirliği olmaz—makine değiştir, kişi değiştir, her şey sıfırdan başlar.

### İkincisi: satıcı kilidi yok, satıcı kayırmacılığı yok

Codex üçüncü taraf modeller için yapılandırma arayüzleri açmış olsa da, yapılandırmak gerçekten zahmetli ve üçüncü taraf modeller her zaman "ikinci sınıf vatandaş" olarak kalıyor—resmi modeller tarafından bastırılıyor, güncelleme temposu tarafından yavaşlatılıyor ve bu beni gerçekten rahatsız ediyor.

ZCode daha da uç: OAuth ile her satıcının Coding Plan'ına giriş yapmanın yolu yok (örneğin Kimi For Code ve Grok Build ZCode'da hiç kullanılamıyor, tabii korsan yollara başvurmadıkça).

Bu yüzden ZCode ve Codex gibi model satıcısı kayırmacılığı olan yazılımları eledim.

### Üçüncüsü: açık kaynak ve ikincil geliştirmeye açık

Kendi ihtiyaçlarıma göre ikincil geliştirme ve özelleştirme yapmam gerekiyor, müşterilerime kutusundan çıkar çıkmaz kullanılabilir bir deneyim sunmayı kolaylaştırmak için. Bu yüzden açık kaynaklı ve lisans dostu bir ürün olmalı—hem benim rahatça keyif almam için hem de müşterilerimin o kara büyü hack'lerine girmeden basitçe kullanabilmesi için.

## Nihai cevap: OpenCode + OpenChamber

Her şeyi eledikten sonra geriye kalan tek gerçek seçenek **OpenCode**.

Ama OpenCode sadece bir Agent çekirdeği. Ona olgun, istikrarlı ve kullanımı kolay bir GUI eşlik etmesi için nihayet gerçek cevabı buldum: **OpenChamber**.

- Çekirdek: OpenCode, açık kaynak, satıcı kilidi yok, tüm satıcıların modellerini destekliyor
- Arayüz: OpenChamber, olgun bir GUI çalışma tezgahı
- Kombinasyon: istikrarlı çekirdek + rahat arayüz, ayrıca ihtiyaca göre ikincil geliştirme imkanı

Açık kaynak: <https://github.com/openchamber/openchamber>

## Bazı gözlemler

Araç seçmek aslında "söz hakkının kimin elinde olduğunu" seçmektir.

Kapalı kaynak bir araç ne kadar iyi olursa olsun, güncelleme yönü, model desteği ve fiyatlandırma stratejisi başkaları tarafından belirlenir—sen sadece pasif olarak kabul edebilirsin. Açık kaynak + kilitlenmemiş kombinasyonda her zaman bir çıkış yolun vardır ve her zaman değiştirme özgürlüğün vardır.

TUI ve GUI tartışmasına gelince, zorlama. Araçlar iş yapmak içindir, komut satırını bildiğini kanıtlamak için değil. Uzun süre kullanabileceğin rahat bir arayüz her şeyden önemlidir.

İlgili okuma: [DeepSeek V4 Flash resmi sürüm derinlemesine incelemesi](/blog/deepseek-v4-flash-review)
