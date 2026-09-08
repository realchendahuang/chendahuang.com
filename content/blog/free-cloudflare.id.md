---
title: "Bagaimana pengguna gratis bisa memeras Cloudflare sampai kering — sejauh apa tier gratis sebenarnya bisa membawa Anda?"
description: "Tier gratis Cloudflare mampu menopang hampir seluruh infrastruktur internet pribadi: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway, dan lain-lain."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Tier gratis
  - Deployment
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Awalnya diterbitkan di [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare nyaris bisa menopang hampir seluruh infrastruktur internet pribadi: domain, situs web, CDN, penyimpanan objek, database, fungsi edge, tunneling, penerusan email, CAPTCHA, dan AI gateway — semuanya bisa dimulai dari tier gratis.

## DNS gratis

Cloudflare sendiri juga merupakan registrar domain, dengan harga registrasi dan perpanjangan yang cukup transparan. Anda juga bisa membeli domain di platform seperti Spaceship lalu memindahkan hosting DNS ke Cloudflare.

Begitu domain Anda masuk Cloudflare, Anda langsung mendapat sistem manajemen DNS yang solid.

Poin kuncinya: resolusi DNS tidak ditagih per kueri. Tidak seperti sebagian penyedia besar dalam negeri yang keterlaluan sampai menagih berdasarkan jumlah kueri resolusi — sungguh tidak tahu malu.

Cloudflare sangat cocok untuk matriks multi-domain, multi-subdomain, dan proyek-proyek kecil.

Anda bisa membuat:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Beli satu domain, tetapkan subdomain berbeda ke layanan berbeda, dan resolusi DNS itu sendiri tidak memakan biaya tambahan.

Untuk lalu lintas web yang perlu di-proxy, aktifkan awan oranye dan biarkan Cloudflare menangani proxying, caching, dan sertifikat HTTPS.

## CDN gratis

Caching CDN adalah hal paling keren yang dimiliki Cloudflare — dari sinilah kebanyakan orang pertama kali mengenal perusahaan ini. Untuk blog, situs resmi, dan situs dokumentasi, nilainya jelas:

Kunjungan lebih cepat, origin server lebih ringan, dan bandwidth lebih hemat. Apalagi jika Anda memakai VPS murah, memasang Cloudflare di depannya membuat perbedaan yang sangat terasa.

## Pages gratis

Pages bisa menghosting situs statis dan proyek frontend secara gratis.

- Blog pribadi
- Situs web produk
- Situs dokumentasi
- Landing page
- Halaman proyek open source
- Halaman materi kursus
- Halaman waitlist
- Halaman petunjuk unduhan
- Halaman promosi ebook

Halaman-halaman semacam ini bisa langsung di-hosting, tanpa perlu membeli server terpisah. Ikat domain Anda sendiri dan itu menjadi situs pribadi atau beranda proyek jangka panjang.

## Workers gratis

Ketika situs Anda membutuhkan API, autentikasi, atau logika dinamis lainnya, gunakan Workers. Kode Anda berjalan di jaringan Cloudflare — tanpa perawatan server di pihak Anda. Selain JavaScript/TypeScript, ia juga mendukung WebAssembly dan runtime lain.

Tier gratis mencakup 100 ribu permintaan per hari. Jika sebuah proyek pribadi benar-benar melampaui angka itu, naik ke versi berbayar saja — tidak perlu buru-buru.

Workers Paid mulai dari $5/bulan.

Banyak proyek kecil sama sekali tidak butuh backend penuh. Satu Worker saja sudah cukup.

## KV gratis

KV cocok untuk data yang butuh pembacaan cepat tetapi tidak menuntut konsistensi kuat — konfigurasi, feature flag, hasil cache. Ia bukan pengganti Redis sepenuhnya, tetapi menutupi banyak kebutuhan sederhana di proyek pribadi.

## D1 gratis

D1 adalah database SQLite terkelola milik Cloudflare, cocok untuk data relasional. Tier gratis mencakup total penyimpanan 5 GB, ditambah kuota baca/tulis harian.

## R2 gratis

R2 adalah penyimpanan objek yang kompatibel dengan API S3, cocok untuk gambar, lampiran, dan cadangan. Keunggulan terbesarnya: tidak ada biaya bandwidth saat menyajikan konten langsung dari R2 — Anda terutama membayar untuk penyimpanan dan operasi. Ada juga tier gratis dengan kuota untuk keduanya.

Anda bisa menyimpan di dalamnya:

- Gambar
- Lampiran
- PDF
- Materi kursus
- Paket perangkat lunak
- File cadangan
- Avatar pengguna
- Gambar Markdown
- Aset statis
- Dataset
- File audio
- Aset video kecil

## Email Routing gratis

Email Routing meneruskan email yang dikirim ke domain kustom Anda ke mailbox yang sudah ada — tersedia di tier gratis. Cloudflare juga punya Email Sending untuk email transaksional lewat Workers, tetapi mengirim ke penerima sembarang memerlukan Workers Paid, jadi jangan tertukar dengan penerusan masuk yang gratis.

## Turnstile gratis

Turnstile adalah verifikasi manusia milik Cloudflare, dan biasanya pengguna tidak perlu mengidentifikasi lampu lalu lintas atau huruf-huruf yang terdistorsi. Cocok untuk:

- Login
- Registrasi
- Komentar
- Formulir kontak
- Waitlist
- Halaman unduhan
- Langganan email

## Tunnel gratis

Ingin mengekspos NAS rumah, mesin dev lokal, atau server game ke internet? Gunakan Tunnel untuk membangun pipa yang menghubungkan dari jaringan internal Anda keluar ke Cloudflare, secara aktif.

NAS Anda, mesin dev lokal, layanan internal — semuanya bisa diekspos lewat Cloudflare Tunnel. Nilai intinya:

- Tanpa perlu IP publik
- Tanpa perlu port forwarding di router
- Tanpa mengekspos IP origin
- Bisa dipasangi domain sendiri

Misalnya:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Benda ini benar-benar anugerah bagi para penghobi home server.

## Access gratis

Access berdiri di depan panel admin, lingkungan staging, dan tool internal, memverifikasi identitas sebelum mengizinkan masuk. OTP email, Google, GitHub, atau identity provider tim semuanya bisa dipakai — tanpa perlu menulis sistem registrasi/login lagi hanya untuk sebuah halaman internal. Misalnya:

- Hanya email tertentu yang boleh masuk
- Hanya login Google yang boleh masuk
- Hanya login GitHub yang boleh masuk
- Hanya anggota tim yang boleh masuk

Ini sangat berguna untuk melindungi backend, staging, dan tool internal.

## AI Gateway gratis

AI Gateway bisa berdiri di depan banyak provider model, mencatat permintaan, latensi, error, dan cache hit secara seragam, plus rate limiting dan fallback. Ketika membangun produk AI di tahap awal, mengelola banyak API yang kompatibel lewat satu pintu masuk menghemat banyak kerumitan.

Ia memungkinkan Anda mengamati:

- Volume permintaan
- Latensi
- Error
- Cache hit
- Pemanggilan model
- Rate limiting
- Fallback

Baik Anda memakai OpenAI, Anthropic, Workers AI, atau berbagai API yang kompatibel, Anda bisa membungkus satu lapisan di depannya.

Untuk produk AI tahap awal, ia sangat cocok dijadikan pintu masuk terpadu.

## Browser Run gratis

Cloudflare kini menyebut kemampuan ini sebagai Browser Run. Ia meluncurkan sesi browser penuh di cloud, dapat dikendalikan lewat kode atau AI.

Cocok untuk:

- Screenshot halaman web
- Konversi halaman web ke Markdown
- Pengujian otomasi halaman web
- Scraping konten halaman
- Parsing halaman dinamis
- Konversi halaman web ke PDF

Ada kuota gratis harian.

## Images Transform gratis

Cloudflare Images punya kuota transformasi untuk mengubah ukuran, memotong, dan konversi format. Pemakaian berat ditagih terpisah, atau Anda bisa menjalankan layanan transcoding sendiri di Workers berbayar dengan Containers.

Bisa dipadukan dengan R2:

- R2 menyimpan gambar asli
- Images membuat thumbnail dan konversi format
- Cache Cloudflare yang mendistribusikan

Cocok untuk sampul blog, avatar, gambar produk, dan ilustrasi artikel.

Kuota gratis Cloudflare sudah menutupi banyak proyek pribadi. Jika Anda benar-benar butuh volume permintaan, waktu komputasi, atau fitur berbayar yang lebih tinggi, naik dari tier Workers Paid $5/bulan dan terus tingkatkan.

Dan di sini saya ingin bilang: Cloudflare, tolong transfer uangnya ke saya!!
