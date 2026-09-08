---
title: "Setelah mencoba Pi Agent, OMP, Codex, dan ZCode, inilah mengapa saya akhirnya memilih OpenCode + OpenChamber"
description: "Rekap pemilihan Agent Harness: tiga kriteria — pengalaman GUI, vendor lock-in, dan kebebasan pengembangan lanjutan — menyingkirkan Pi Agent, OMP, Codex, dan ZCode, dan pada akhirnya jatuh pada inti OpenCode + antarmuka OpenChamber."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Pemilihan alat
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Awalnya diposting di [X](https://x.com/realchendahuang/status/2085410520459604026).

Belakangan ini saya terus mencoba-coba berbagai Agent Harness seperti Pi Agent, OMP, ZCode, Codex, dan OpenCode — dan akhirnya saya paham apa kebutuhan saya yang sesungguhnya.

## Tiga kriteria saya

### Pertama: GUI yang matang dan stabil

Saya sudah terbiasa dengan GUI dan benar-benar tidak tahan dengan TUI. Ngobrol di dalam kotak terminal hitam itu terlalu menyiksa — Anda harus menghafal segudang pintasan (shortcut) dan perintah agar benar-benar bisa menggunakannya. Sebaliknya, GUI cukup Anda klik intuitif pada ikon dan tombol saja.

Jadi saya butuh halaman GUI yang matang, stabil, dan enak dipandang.

Kriteria yang satu ini langsung menyingkirkan **Pi Agent** dan **OMP**. Bukan berarti inti (core) mereka jelek — melainkan GUI komunitas yang menyertainya memang buruk sekali. Membuat sendiri dari nol juga menyedot banyak tenaga, dan alat semacam ini begitu mudah dikustomisasi sehingga GUI buatan tangan tidak punya portabilitas — ganti mesin atau ganti orang, semuanya roboh dan diulang dari awal.

### Kedua: tanpa vendor lock-in, tanpa keberpihakan ke vendor model

Codex memang membuka antarmuka konfigurasi untuk model pihak ketiga, tetapi mengonfigurasinya benar-benar merepotkan, dan model pihak ketiga selamanya menjadi "warga kelas dua" — ditekan oleh model resmi dan tertahan oleh ritme pembaruan. Ini sangat membuat saya kesal.

ZCode bahkan lebih keterlaluan: tidak ada cara masuk (login) lewat OAuth ke Coding Plan masing-masing vendor (misalnya Kimi For Code dan Grok Build sama sekali tidak bisa dipakai di ZCode, kecuali Anda nekat menempuh cara-cara hack yang aneh).

Jadi saya menyingkirkan ZCode dan Codex — perangkat lunak yang berat sebelah kepada vendor model tertentu.

### Ketiga: open source dan terbuka untuk pengembangan lanjutan

Saya perlu melakukan pengembangan dan kustomisasi lebih lanjut berdasarkan kebutuhan saya sendiri, supaya lebih mudah memberikan pengalaman siap pakai (out of the box) kepada klien. Jadi produknya harus open source dan ramah lisensi — nyaman buat saya nikmati, dan nyaman juga buat klien saya pakai dengan sederhana, tanpa utak-atik hack yang penuh misteri.

## Jawaban akhir: OpenCode + OpenChamber

Setelah semuanya disisihkan, satu-satunya pilihan yang benar-benar tersisa adalah **OpenCode**.

Tetapi OpenCode hanyalah sebuah inti Agent. Untuk memasangkannya dengan GUI yang matang, stabil, dan mudah digunakan, akhirnya saya menemukan jawaban sesungguhnya: **OpenChamber**.

- Inti: OpenCode — open source, tanpa vendor lock-in, mendukung model dari berbagai vendor
- Antarmuka: OpenChamber — workbench GUI yang matang
- Kombinasi: inti yang stabil + antarmuka yang nyaman, plus kemampuan pengembangan lanjutan sesuai kebutuhan

Open source: <https://github.com/openchamber/openchamber>

## Beberapa catatan renungan

Memilih alat pada dasarnya adalah memilih "siapa yang memegang kendali atas Anda".

Secanggih apa pun alat bersumber tertutup, arah pembaruannya, dukungan modelnya, dan strategi harganya ditentukan oleh pihak lain — Anda hanya bisa menerimanya secara pasif. Dengan kombinasi open source + tanpa lock-in, Anda selalu punya jalan keluar dan selalu punya kebebasan untuk mengubah-ubah.

Soal perdebatan TUI vs GUI, jangan memaksakan diri. Alat itu untuk menyelesaikan pekerjaan, bukan untuk membuktikan bahwa Anda jago baris perintah. Antarmuka yang nyaman dan bisa dipakai dalam jangka panjang itulah yang paling penting.

Bacaan terkait: [Ulasan mendalam rilis resmi DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)
