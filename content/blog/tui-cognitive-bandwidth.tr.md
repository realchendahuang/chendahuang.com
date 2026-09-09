---
title: "TUI bilişsel bant genişliğini öldürüyor: AI Coding'daki “geek filtresi”nin paramparça olma zamanı"
description: "Sayısız AI Coding Agent TUI çıkarma yarışında; etkileşimi 1980'lerin terminal paradigmasına geri tıkıp buna “immersive” ve “programcıya saygılı” diyorlar. Bu yazı, TUI'nin bilişsel bant genişliğini sistematik biçimde düşüren üç mekanizmayı çözümleyip Web UI'nin neden doğru cevap olduğunu anlatıyor."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - AI ile kodlama
  - Etkileşim tasarımı
  - Deneme
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ana fikir ilk olarak [X](https://x.com/realchendahuang/status/2087949416808518106)'te yayınlandı; bu yazı argümanın tam uzunluktaki hâli.

Son günlerde neredeyse her AI Coding Agent TUI çıkarıyor; bu modanın sorumluluğunun büyük kısmı Claude Code'a ait. “Terminalde AI ile konuşup kod yazmayı” dibe vurana kadar mükemmelleştirdi ama beraberinde bir zevk ve alışkanlık da getirdi: gerçekten “üst düzey” bir Coding Agent varsayılan olarak terminalde olmalı; Web tarafı zaten ikinci planda, hatta “yeterince programcı işi değil” diye alay konusu bile.

Sonuç? Önce renkli, durum çubuklu, kısayollu, mod geçişli karmaşık bir TUI yapıyorsun; sonra adını koyuyorsun “immersive”, “verimli”, “programcıya saygılı”.

Gerçekten mi?

## Konuştuğunu Sanıyorsun, Aslında Boğuşuyorsun

Bütün gün terminalde yaşayan küçük bir grup için pekâlâ, TUI keyifli. Ama çok daha fazla insan için bilerek örülmüş bir duvar. Bir ajanla TUI üzerinden çalışırken aslında durmadan üç şey yapıyorsun:

**Kısayolları ve modları hatırlamak.** Her aracın kendi tuş alışkanlığı var; yeni kullanıcı şaşkın, eski kullanıcı bile her araç için yeniden uyum sağlıyor.

**Kayan karakter akışının içinde bilgiyi bulmaya çalışmak.** Durum önüne serilmiyor; zaman çizgisine gömülü ve onu kaydırarak, arayarak “kazman” gerekiyor.

**Yanlışlıkla tuhaf bir moda düşmemiş olmak için dua etmek.** Mod geçişleri görünmez; genelde hangi modda olduğunu bir şey bozulana kadar bilmiyorsun.

Artık bu etkileşim değil — bu bir arayüzle boğuşmak.

## Bilgi Yoğunluğu Bilgi Verimliliği Değildir

TUI savunucularının gözdesi kelime: “bilgi yoğunluğu”. Ama yoğunluğu zirveye itersen bedelini okunabilirlik ve geri kazanılabilirlik ayaklar altında alınarak ödersin.

Gerçekten verimli bir arayüz **durumu önüne sermeli**, anlamayı gözüne ve mekânsal hissine bırakmalı — hangi görev çalışıyor, hangi oturum girdi bekliyor, hangi dosya değişti — tek bakışta belli. Her şeyi kısa süreli belleğe tıkıştırmayı ve beynin “sistemin o anki durumu”nun görünmez haritasını tutmayı dayatmak yerine.

İnsanın çalışma belleğinde dört ile yedi yuva var. TUI'nin etkileşim modeli özünde en değerli bilişsel kaynağı “arayüz durumunu hatırlamaya” harcıyor, “problemi düşünmeye” değil.

## Bir Kötü Alışkanlık da Yetiştiriyor

Daha kötüsü, TUI ekosistemi bozuk bir değer yargısı yetiştiriyor: **bir aracın tuşlarını bilmenin başlı başına bir yetenek sayılması.**

Sonuç: insanlar problemi düşünmek yerine arayüze uyum sağlamaya kocaman enerji harcıyor. Bir programcının ölçüsü “bu kısayolları ezbere sayabilir misin” oldu; “problemi net biçimde parçalayabilir misin” değil.

İyi bir araç düşünme maliyetini düşürmeli; düşünme maliyetini “bu arayüzü nasıl kullanırım”a kaydırmamalı.

## Web UI Hem Hızlı Hem Temiz Olabilir

Web yavaş, “native” değil der bazıları. 2026'dayız; bu argüman çoktan öldü.

Web UI hem hızlı hem temiz olabilir: PWA olarak kurulunca masaüstü uygulamasından farksız, güncellemesi de kolay — elle yükseltme yok, bir yenileme en güncel sürüm demek. Uzun oturumlar, paralel görevler, görev durumlarının görselleşmesi — bunlar tarayıcı DOM'unun güçlü yanları, karakter akışının değil.

Benim ana kurulumum OpenCode çekirdeği üstünde OpenChamber gibi bir Web arayüzü; uzun süre yoğun kullanıyorum — kaymak gibi. İğnelemem gerekirse webin arada bir uğradığı ufak aksaklıklar uzun vadeli kullanımı hiç etkilemiyor; buna karşılık bazı TUI'lerin mod geçişleri beni defalarca ısırdı.

## Araçlar İnsanlar İçindir, Kimin Daha “Geek” Olduğunu Kanıtlamak İçin Değil

Claude Code kendi başına güçlü, buna itiraz yok. Ama “TUI tek doğru yol” zevkini o yaydı ve peşine takılan taklitçiler daha beter — etkileşim tasarımıyla uğraşmaya bile üşeniyorlar, “terminalde yaşamayı” ustalık kanıtı sayıyorlar.

İnsan düşmanı etkileşimi rafine görünümlü paketlemek — gerçekten komik bir durum.

Araçlar insanlar içindir. Ölçü her zaman şu olmalı: **işini bitirmenin toplam maliyetini düşürdü mü?** Bir arayüz enerjini “arayüzle boğuşmaya” harcatıyorsa, ne kadar “geek” görünürse görünsün ortada zarar var.

Bir dahaki sefere Coding Agent seçerken önce bu filtreyi çıkar.
