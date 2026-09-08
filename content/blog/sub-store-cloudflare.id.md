---
title: "Saya memindahkan agregasi langganan proxy ke Cloudflare"
description: "Gabungkan beberapa layanan proxy plus node Anda sendiri menjadi satu langganan tunggal, dengan aturan routing dikonfigurasi di sisi server — klien tinggal berlangganan."
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Menembus blokir
  - Proyek open source
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Saya sudah memakai layanan proxy selama tiga atau empat tahun, dan kadang-kadang menjalankan node VPS sendiri. Selalu ada satu hal yang menyebalkan: tiga atau lima langganan ditambah beberapa box self-hosted berserakan di klien, ditambahkan satu per satu, dengan aturan routing yang harus dikonfigurasi ulang di setiap klien. Ganti perangkat, ganti klien, atau menyiapkan untuk anggota keluarga — ritualnya harus diulang lagi.

Lalu saya berpikir: tidak ada alasan untuk mengelola langganan secara terpisah di dalam klien. Tarik semuanya menjadi satu tautan, definisikan aturannya di sisi server, dan biarkan klien tinggal berlangganan — bersih. Saya pernah memakai pendekatan Sub-Store sebelumnya, tetapi ia berjalan di server sendiri dan saya merasa perawatannya merepotkan. Jadi kali ini saya menulis sendiri versi yang di-hosting di Cloudflare, namanya sub-store-cloudflare, dan saya buka sumbernya di [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## Sebenarnya ia cuma melakukan satu hal

Menggabungkan beberapa sumber langganan menjadi satu langganan.

Secara konkret, Anda bisa memasukkan beberapa hal ke dalamnya:

- Tautan langganan dari beberapa layanan proxy
- Teks node dari VPS sendiri (vless, trojan, ss, vmess — semuanya bisa)
- Bahkan menempelkan potongan node sementara

Begitu masuk, Worker akan menarik dan melakukan de-duplikasi, menyaring sesuai aturan yang Anda berikan, lalu mengganti nama, menambah bendera, dan me-resolve domain sesuai kebutuhan. Semuanya keluar tergabung menjadi satu langganan gabungan — klien berlangganan ke satu tautan itu dan selesai.

Aturan berada di sisi server. Ia sudah dibekali beberapa template Mihomo umum — acl4ssr, whitelist/blacklist milik Loyalsoldier, ai-streaming dan semacamnya — dengan grup routing dan rule set semuanya dikonfigurasi di cloud. Masukkan langganan ke klien seperti mihomo/clash, surge, sing-box, shadowrocket, dan yang terunduh adalah langganan jadi dengan aturan routing yang sudah terpasang — tanpa perlu menulis aturan manual atau merawat URL rule set di sisi itu.

## Mengapa justru di Cloudflare

Alasannya pragmatis:

- **Tanpa server.** Workers + D1, dan kuota gratisnya cukup untuk penggunaan pribadi — menghemat biaya server sekaligus perawatannya.
- **Domain workers.dev itu sendiri sudah berada di luar tembok.** Klien Anda terhubung untuk mengambil langganan langsung jalan tanpa hambatan — tidak ada omong kosong "server di luar negeri tapi node masih perlu tangga untuk menarik langganannya sendiri" yang seperti boneka bersarang (nesting doll).
- **Setelah ter-deploy, ia adalah panel admin web plus satu endpoint unduhan.** Ganti klien di ponsel pun Anda masih bisa membuka halaman web untuk mengubah konfigurasi.

Saya sengaja menjaga tumpukan teknologinya tetap kecil: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron semuanya di luar jalur kritis — semakin sedikit semakin baik.

## Dua jalur deploy, dengan sengaja

Jalur pertama untuk orang yang hanya ingin memakai: klik tombol Deploy to Cloudflare di repo. Cloudflare menarik repo, membuat Worker dan D1, meminta dua token, dan menyerahkan tautan manajemen ber-token saat selesai. Langkah demi langkah, tanpa baris perintah.

Jalur kedua untuk saya sendiri dan orang yang suka utak-atik: instal sekali klik dengan AI agent.

Repo ini menyertakan protokol agent (AGENTS.md + SKILL di dalam agent). Anda menulis sumber langganan, langganan gabungan yang diinginkan, dan template aturan ke dalam file konfigurasi lokal, jalankan `pnpm run install:cloudflare`, dan agent akan memeriksa login Cloudflare Anda, membuat database, menulis secret, migrasi, deploy, impor konfigurasi, verifikasi tautan, dan akhirnya menyerahkan tautan manajemen dan tautan unduhan ke tangan Anda.

Saya men-deploy tautan saya sendiri persis dengan cara ini, jadi saya merekomendasikan jalur ini — lebih sedikit repot. Saat memakainya dengan Codex / Claude Code, cukup salin prompt dari `agent/install.prompt.md` di repo.

## Untuk siapa

Terus terang: jika Anda punya lebih dari satu layanan proxy plus beberapa node self-hosted dan ingin menggabungkannya menjadi satu langganan untuk dipakai sendiri — ini proyek Anda. Jika Anda sudah nyaman dengan satu layanan saja, Anda sebenarnya tidak butuh ini.

Kodenya sepenuhnya open source, AGPL. Interaksi frontend-nya memberi penghormatan pada Sub-Store asli; yang asli berjalan dalam container dan mencakup ekosistem klien yang lebih luas. Milik saya adalah bentuk yang lebih ramping dan Cloudflare-native — lebih mudah dimodifikasi dan langsung di-deploy, bukan klon baris per baris.

Yang berminat bisa menjelajahi repo — README-nya cukup lengkap, tinggal ikuti langkah-langkah deploy-nya.
