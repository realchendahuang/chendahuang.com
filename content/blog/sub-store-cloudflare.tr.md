---
title: "Proxy abonelik toplayıcımı Cloudflare'ye taşıdım"
description: "Birden fazla proxy hizmetini ve kendi düğümlerini tek bir abonelikte birleştir, yönlendirme kuralları sunucu tarafında yapılandırılsın—istemciler sadece abone olur."
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Sansürü aşma
  - Açık kaynak proje
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Üç dört yıldır proxy hizmetleri kullanıyorum, arada kendi VPS düğümlerimi de kurdum. Her zaman can sıkan bir şey olmuştur: üç beş abonelik artı kendi kurduğum birkaç makine, istemcide tek tek ekleniyor ve yönlendirme kuralları her istemcide yeniden yapılandırılmak zorunda. Yeni cihaz, yeni istemci ya da aileden birine kurulum—tüm ritüel yeniden başlıyor.

Sonra düşündüm: abonelikleri istemcilerin içinde ayrı ayrı yönetmeye gerek yok. Hepsini tek bir linkte topla, kuralları sunucu tarafında tanımla ve istemci sadece abone olsun—iş temiz. Sub-Store'ın yaklaşımını daha önce kullanmıştım ama kendi sunucunda çalışıyordu ve bakımı zahmetli buluyordum. Bu yüzden bu sefer kendim Cloudflare'de barınan bir sürüm yazdım, adı sub-store-cloudflare, [GitHub](https://github.com/realchendahuang/sub-store-cloudflare)'da açık kaynak.

## Gerçekten tek bir şey yapıyor

Birden fazla abonelik kaynağını tek bir abonelikte birleştirir.

Somut olarak içine birkaç şey atabilirsin:

- Birkaç proxy hizmetinin abonelik linkleri
- Kendi VPS'inden düğüm metni (vless, trojan, ss, vmess—hepsi olur)
- Hatta geçici bir düğüm parçası yapıştırabilirsin

İçeri girdikten sonra Worker bunları çeker ve tekilleştirir, verdiğin kurallara göre filtreler, sonra gerektiğinde yeniden adlandırır, bayrak ekler ve alan adlarını çözümler. Her şey tek bir birleşik abonelikte toplanır—istemciler o tek linke abone olur ve biter.

Kurallar sunucu tarafında yaşar. Birkaç yaygın Mihomo şablonuyla gelir—acl4ssr, Loyalsoldier'ın beyaz/kara listesi, ai-streaming ve benzerleri—yönlendirme grupları ve kural setleri bulutta yapılandırılır. Aboneliği mihomo/clash, surge, sing-box, shadowrocket gibi istemcilere ver; indirilen şey, yönlendirme kuralları içine gömülü hazır bir aboneliktir—o tarafta elle kural yazmaya veya kural seti URL'si bakımına gerek yok.

## Neden özellikle Cloudflare

Pragmatik nedenler:

- **Sunucu yok.** Workers + D1 ve ücretsiz kota kişisel kullanım için yeterli—hem sunucu parası hem bakım kurtarıyor.
- **workers.dev alan adının kendisi duvarın dışında.** İstemcinin aboneliği çekmek için bağlanması kutusundan çıkar çıkmaz çalışır—"sunucu yurt dışında ama düğümün kendi aboneliğini çekmek için hâlâ merdivene ihtiyacı var" gibi iç içe geçmiş saçmalık yok.
- **Bir kez dağıttıktan sonra, bir web yönetim paneli artı bir indirme uç noktasıdır.** Telefonda istemci değiştirsen bile yapılandırmayı değiştirmek için bir web sayfası açabilirsin.

Yığını bilerek küçük tuttum: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron kritik yolda değil—ne kadar az olursa o kadar iyi.

## Bilerek iki dağıtım yolu

Birincisi sadece kullanmak isteyenler için: repodaki Deploy to Cloudflare düğmesine tıkla. Cloudflare repoyu çeker, Worker'ı ve D1'i oluşturur, senden iki token ister ve bitince sana token'lı bir yönetim linki verir. Adım adım, komut satırı yok.

İkincisi benim ve kurcalamayı sevenler için: bir AI agent ile tek tıkla kurulum.

Repo bir agent protokolüyle gelir (AGENTS.md + agent içinde bir SKILL). Abonelik kaynaklarını, istediğin birleşik abonelikleri ve kural şablonlarını yerel bir yapılandırma dosyasına yazarsın, `pnpm run install:cloudflare` çalıştırırsın ve agent Cloudflare girişini kontrol eder, veritabanını oluşturur, secret'ları yazar, migrasyonu yapar, dağıtır, yapılandırmayı içe aktarır, linkleri doğrular ve sonunda sana yönetim linkini ve indirme linkini teslim eder.

Kendi linkimi tam olarak bu şekilde dağıttım, bu yüzden bu rotayı öneriyorum—daha az uğraş. Codex / Claude Code ile kullanırken repodaki `agent/install.prompt.md` dosyasındaki promptu kopyala.

## Kimin için

Dürüst konuşayım: birden fazla proxy hizmetin artı birkaç kendi düğümün varsa ve hepsini kendi kullanımın için tek bir abonelikte birleştirmek istiyorsan—bu senin projen. Tek bir hizmetle mutlu mesut gidiyorsan, buna gerçekten ihtiyacın yok.

Kod tamamen açık kaynak, AGPL. Frontend etkileşimi orijinal Sub-Store'a bir selam; orijinali bir konteynerde çalışıyor ve daha geniş bir istemci ekosistemini kapsıyor. Benimki daha yalın, Cloudflare-native bir form—değiştirmesi ve doğrudan dağıtması daha kolay, satır satır bir klon değil.

İlgilenenler repoya göz atabilir—README oldukça eksiksiz, sadece dağıtım adımlarını izleyin.
