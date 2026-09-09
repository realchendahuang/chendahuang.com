---
title: "TUI Sedang Membunuh Bandwidth Kognitifmu: Saatnya Filter “Geek” dalam AI Coding Dihancurkan"
description: "Belakangan ini segambreng AI Coding Agent berlomba meluncurkan TUI, mengembalikan interaksi ke paradigma terminal tahun 1980-an, lalu menyebutnya “immersive” dan “menghormati programmer”. Artikel ini membedah tiga mekanisme di balik cara TUI menurunkan bandwidth kognitif secara sistematis, dan mengapa Web UI justru jawaban yang benar."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Pemrograman AI
  - Desain interaksi
  - Esai
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Gagasan utamanya pertama kali dipublikasikan di [X](https://x.com/realchendahuang/status/2087949416808518106); artikel ini adalah versi lengkapnya.

Belakangan ini hampir semua AI Coding Agent leluasa mengeluarkan TUI, dan Claude Code patut menanggung tanggung jawab besar atas tren ini. Ia membuat “ngobrol dengan AI di terminal untuk menulis kode” terasa sangat keren — tapi juga menanamkan selera dan kebiasaan jalur: Coding Agent yang “benar-benar kelas atas” ya harus berbasis terminal; versi web dianggap cuma pelengkap, bahkan diolok-olok “kurang programmer”.

Hasilnya? Bikin dulu TUI yang ribet — penuh warna, status bar, shortcut, ganti mode — lalu kasih label “immersive”, “efisien”, “menghormati programmer”.

Serius?

## Kamu Mengira Sedang Mengobrol, Padahal Sedang Bergulat

Untuk segelintir orang yang hidup di terminal sepanjang hari, oke, TUI memang nyaman. Tapi bagi banyak orang lain, itu gerbang yang sengaja dibikin susah. Saat berkolaborasi dengan agent lewat TUI, sebenarnya kamu terus-menerus melakukan tiga hal:

**Menghafal shortcut dan mode.** Tiap tool punya kebiasaan tombolnya sendiri; pengguna baru bingung, dan pengguna lama pun harus menyesuaikan diri lagi di tiap tool.

**Mencari informasi di dalam arus karakter yang terus bergulir.** Status tidak dibentangkan di depanmu — dia terkubur di timeline yang harus kamu “gali” dengan scroll dan search.

**Berdoa supaya tidak tak sengaja masuk ke mode yang aneh.** Pergantian mode itu tak terlihat; seringnya kamu tidak tahu sedang di mode apa, sampai masalah muncul.

Ini bukan interaksi lagi — ini bergulat dengan antarmuka.

## Kepadatan Informasi Bukan Efisiensi Informasi

Kata favorit pembela TUI adalah “kepadatan informasi”. Tapi begitu kepadatan didorong ke batas maksimal, harganya adalah keterbacaan dan kemampuan pemulihan yang terinjak sampai dasar.

Antarmuka yang benar-benar efisien seharusnya **membentangkan status di depanmu**, menyerahkan pemahamannya ke mata dan rasa spasialmu — task mana yang sedang jalan, sesi mana yang menunggu input, file mana yang berubah — sekali lirik langsung kebaca. Bukan memaksa kamu menjejalkan semuanya ke memori jangka pendek sementara otak merawat peta tak kasatmata “status sistem saat ini”.

Memori kerja manusia cuma punya empat sampai tujuh slot. Model interaksi TUI pada dasarnya membelanjakan sumber daya kognitif paling berharga untuk “mengingat status antarmuka”, bukan untuk “berpikir tentang masalah”.

## Ia Juga Memelihara Kebiasaan Buruk

Lebih parah lagi, ekosistem TUI menanamkan penilaian nilai yang kacau: **menganggap hafal tombol sebuah tool sebagai keahlian itu sendiri.**

Akibatnya orang menghabiskan energi besar untuk menyesuaikan diri dengan antarmuka, bukan untuk berpikir tentang masalah. Tolok ukur programmer berubah jadi “bisakah kamu melafalkan shortcut-shortcut ini” alih-alih “bisakah kamu memecah masalah dengan jelas”.

Tool yang baik seharusnya menurunkan biaya berpikir, bukan memindahkan biaya berpikir ke “cara mengoperasikan antarmuka ini”.

## Web UI Bisa Saja Cepat dan Bersih

Ada yang bilang web lambat dan kurang “native”. Sudah tahun 2026 — argumen itu mati sejak lama.

Web UI bisa saja cepat dan bersih: setelah dipasang sebagai PWA hampir tak ada bedanya dengan aplikasi desktop, pembaruannya pun lebih enak — tanpa upgrade manual, sekali refresh langsung versi terbaru. Sesi panjang, banyak task paralel, visualisasi status task — justru ini kekuatan DOM browser, bukan kekuatan arus karakter.

Setup andalanku sendiri adalah antarmuka web semacam OpenChamber di atas inti OpenCode, dipakai intensif jangka panjang — kokoh. Kalau mau cari-cari kesalahan, bug kecil sesekali di web tidak pernah mengganggu penggunaan jangka panjang; sebaliknya pergantian mode di beberapa TUI sudah berkali-kali menyengatku.

## Tool Dibuat untuk Manusia, Bukan untuk Membuktikan Siapa Lebih “Geek”

Claude Code sendiri memang kuat, itu tidak diperdebatkan. Tapi ia yang memopulerkan selera “TUI adalah jalan yang benar”, dan para peniru setelahnya makin parah — bahkan malas mendesain interaksi, lalu menganggap “hidup di terminal” sebagai bukti kelas.

Membungkus interaksi anti-manusia sebagai sesuatu yang kelas atas — benar-benar lucu.

Tool dibuat untuk manusia. Ukurannya seharusnya selalu satu: **apakah ia menurunkan total biayamu untuk menyelesaikan pekerjaan?** Kalau sebuah antarmuka membuatmu menguras energi untuk “bergulat dengan antarmuka”, seratus persen dia aset negatif berapa pun “geek”-nya.

Lain kali memilih Coding Agent, lepas dulu filter ini.
