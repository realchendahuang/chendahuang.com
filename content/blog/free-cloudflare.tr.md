---
title: "Ücretsiz kullanıcılar Cloudflare'yi nasıl sömürür—ücretsiz katman aslında ne kadar ileri gider?"
description: "Cloudflare'nin ücretsiz katmanı koca bir kişisel internet altyapısını taşıyabilir: DNS, CDN, Pages, Workers, KV, D1, R2, e-posta, Tunnel, AI Gateway ve daha fazlası."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Ücretsiz katman
  - Dağıtım
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Aslen [X Articles](https://x.com/realchendahuang/article/2066528625378443300)'ta yayınlandı.

Cloudflare neredeyse koca bir kişisel internet altyapısını taşıyabilir: alan adları, web siteleri, CDN, nesne depolama, veritabanları, edge fonksiyonları, tünel, e-posta yönlendirme, CAPTCHA ve bir AI ağ geçidi—hepsi ücretsiz katmandan başlayabilir.

## Ücretsiz DNS

Cloudflare kendisi de bir alan adı kayıt kuruluşudur; kayıt ve yenileme fiyatları oldukça şeffaftır. Alan adlarını Spaceship gibi platformlarda satın alıp DNS barındırmayı Cloudflare'ye taşıyabilirsin.

Alan adın Cloudflare'ye girdiğinde sağlam bir DNS yönetim sistemi elde edersin.

Kilit nokta: DNS çözümlemesi sorgu başına faturalandırılmaz. Bazı büyük yerli sağlayıcıların aksine—çözümleme sayısına göre ücret alacak kadar utanmazlar, söylemesi bile ayıp.

Cloudflare, çok alan adlı, çok alt alan adlı ve küçük proje matrisleri için harikadır.

Şunları çalıştırabilirsin:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Bir alan adı al, farklı hizmetlere farklı alt alan adları ata; DNS çözümlemesinin kendisi ekstra bir şeye mal olmaz.

Proxy gerektiren web trafiği için turuncu bulutu aç ve Cloudflare'nin proxy'lemeyi, cache'i ve HTTPS sertifikalarını üstlenmesine izin ver.

## Ücretsiz CDN

CDN cache, Cloudflare'nin en havalı şeyidir—çoğu insan şirketi böyle duyar. Bloglar, resmi siteler ve dokümantasyon siteleri için değer açıktır:

Daha hızlı ziyaretler, daha hafif bir kaynak sunucu ve daha az bant genişliği. Özellikle ucuz bir VPS kullanıyorsan, önüne Cloudflare koymak hissedilir bir fark yaratır.

## Ücretsiz Pages

Pages, statik siteleri ve frontend projelerini ücretsiz barındırabilir.

- Kişisel bloglar
- Ürün web siteleri
- Dokümantasyon siteleri
- Landing page'ler
- Açık kaynak proje sayfaları
- Kurs materyali sayfaları
- Bekleme listesi sayfaları
- İndirme talimatı sayfaları
- E-kitap tanıtım sayfaları

Bunlar doğrudan barındırılabilir, ayrı bir sunucu satın almaya gerek yok. Kendi alan adını bağla ve uzun vadeli bir kişisel siteye veya proje ana sayfasına dönüşsün.

## Ücretsiz Workers

Siten API, kimlik doğrulama veya başka dinamik mantık gerektirdiğinde Workers kullan. Kodun Cloudflare'nin ağında çalışır—kendi tarafında sunucu bakımı yok. JavaScript/TypeScript dışında WebAssembly ve diğer çalışma zamanlarını da destekler.

Ücretsiz katman günde 100 bin istek içerir. Kişisel bir proje gerçekten bunu aşarsa, ücretliye geç—acelesi yok.

Workers Paid ayda 5 dolardan başlar.

Birçok küçük proje tam bir backend'e hiç ihtiyaç duymaz. Tek bir Worker yeter.

## Ücretsiz KV

KV, hızlı okuma gerektiren ama güçlü tutarlılık gerektirmeyen veriler için uygundur—yapılandırma, özellik bayrakları, cache'lenmiş sonuçlar. Tam bir Redis yedeği değildir ama kişisel projelerdeki birçok basit ihtiyacı karşılar.

## Ücretsiz D1

D1, Cloudflare'nin yönetilen SQLite veritabanıdır, ilişkisel veriler için uygundur. Ücretsiz katman toplam 5 GB depolama ve ayrıca günlük okuma/yazma kotaları içerir.

## Ücretsiz R2

R2, S3 API uyumlu bir nesne deposudur; görseller, ekler ve yedekler için uygundur. En büyük avantajı: R2'den sunum yaparken bant genişliği ücreti yok—temelde depolama ve işlem sayısı için ödersin. Ücretsiz katmanda her ikisi için de bir kota vardır.

İçine şunları koyabilirsin:

- Görseller
- Ekler
- PDF'ler
- Kurs materyalleri
- Yazılım paketleri
- Yedek dosyaları
- Kullanıcı avatarları
- Markdown görselleri
- Statik varlıklar
- Veri setleri
- Ses dosyaları
- Küçük video varlıkları

## Ücretsiz Email Routing

Email Routing, özel alan adına gönderilen e-postaları mevcut bir posta kutusuna iletir—ücretsiz katmanda kullanılabilir. Cloudflare'nin ayrıca Workers üzerinden işlemsel e-posta gönderen Email Sending'i de var, ama rastgele alıcılara gönderim Workers Paid gerektirir; o yüzden bunu ücretsiz gelen iletmeyle karıştırmayın.

## Ücretsiz Turnstile

Turnstile, Cloudflare'nin insan doğrulamasıdır ve kullanıcılar genellikle trafik ışığı veya bozuk harf tanımak zorunda kalmaz. Şunlar için uygundur:

- Giriş
- Kayıt
- Yorumlar
- İletişim formları
- Bekleme listeleri
- İndirme sayfaları
- E-posta abonelikleri

## Ücretsiz Tunnel

Evdeki NAS'ını, yerel geliştirme makinanı veya oyun sunucunu internete açmak mı istiyorsun? Tunnel ile iç ağından Cloudflare'ye doğru aktif olarak bağlanan bir boru kur.

NAS'ın, yerel geliştirme makinelerin, iç hizmetlerin—hepsi Cloudflare Tunnel üzerinden açılabilir. Temel değer:

- Genel IP gerekmez
- Yönlendiricide port yönlendirme gerekmez
- Kaynak IP'ler açığa çıkmaz
- Kendi alan adını bağlayabilirsin

Örneğin:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Bu şey, ev sunucusu meraklıları için bir nimet.

## Ücretsiz Access

Access, yönetim panellerinin, staging ortamlarının ve iç araçların önünde durur, içeri almadan önce kimliği doğrular. E-posta OTP, Google, GitHub veya ekip kimlik sağlayıcıları çalışır—sadece bir iç sayfa için yeni bir kayıt/giriş sistemi yazmana gerek yok. Örneğin:

- Yalnızca belirli e-postalar girebilir
- Yalnızca Google girişi girebilir
- Yalnızca GitHub girişi girebilir
- Yalnızca ekip üyeleri girebilir

Backend'leri, staging'i ve iç araçları korumak için çok kullanışlı.

## Ücretsiz AI Gateway

AI Gateway, birden fazla model sağlayıcısının önünde durarak istekleri, gecikmeyi, hataları ve cache isabetlerini tek tip olarak kaydedebilir; ayrıca hız sınırlama ve fallback yapabilir. Bir AI ürününü erken kurarken, birden fazla uyumlu API'yi tek bir giriş noktasından yönetmek çok iş kurtarır.

Şunları gözlemlemeni sağlar:

- İstek hacmi
- Gecikme
- Hatalar
- Cache isabetleri
- Model çağrıları
- Hız sınırlama
- Fallback

OpenAI, Anthropic, Workers AI veya çeşitli uyumlu API'ler kullanıyor olsan da, önlerine bir katman sarabilirsin.

Erken AI ürünleri için harika bir birleşik giriş noktası yapar.

## Ücretsiz Browser Run

Cloudflare bu yeteneğe artık Browser Run diyor. Bulutta tam tarayıcı oturumları başlatır, kod veya AI ile kontrol edilebilir.

Şunlar için uygundur:

- Web sayfası ekran görüntüleri
- Web sayfasını Markdown'a çevirme
- Web sayfası otomasyon testi
- Sayfa içeriği kazıma
- Dinamik sayfa ayrıştırma
- Web sayfasını PDF'e çevirme

Günlük ücretsiz bir kota vardır.

## Ücretsiz Images Transform

Cloudflare Images, yeniden boyutlandırma, kırpma ve format dönüştürme için bir dönüştürme kotasına sahiptir. Yoğun kullanım ayrıca faturalandırılır veya Containers'lı ücretli Workers üzerinde kendi dönüştürme hizmetini çalıştırabilirsin.

R2 ile eşleştir:

- R2 orijinalleri saklar
- Images küçük resimleri ve format dönüşümlerini yapar
- Cloudflare cache dağıtır

Blog kapakları, avatarlar, ürün görselleri ve makale illüstrasyonları için uygundur.

Cloudflare'nin ücretsiz kotası zaten birçok kişisel projeyi kapsar. Gerçekten daha yüksek istek hacmine, hesaplama süresine veya ücretli özelliklere ihtiyacın olursa, ayda 5 dolarlık Workers Paid katmanından başlayıp yukarı ölçeklen.

Ve burada şunu söylemek istiyorum: Cloudflare, lütfen paramı gönder!!
