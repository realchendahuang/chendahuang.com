---
title: "Harness pabrikan tidak selalu jadi jawaban terbaik: di era model terbuka, pilih model dan Harness secara terpisah"
description: "Pakai Claude ya langsung Claude Code? Di era model terbuka, insting itu perlu di-upgrade. Keunggulan pabrikan itu nyata, tapi melatih model yang bagus dan membangun Harness yang bagus adalah dua bidang rekayasa yang berbeda — artikel ini menjelaskan kenapa pilihan model dan Harness kini bisa dipisahkan, plus peta posisi lima Harness."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Pemilihan alat
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Gagasan utamanya pertama kali dipublikasikan di [X](https://x.com/realchendahuang/status/2093890559874388141); artikel ini adalah versi lengkapnya, lengkap dengan peta posisi lima Harness.

Reaksi pertama kebanyakan orang saat memilih Coding Agent wajar-wajar saja: pakai Claude ya Claude Code; pakai GPT ya Codex; pakai GLM ya ZCode; pakai DeepSeek, tentu saja pertimbangkan Harness buatan DeepSeek sendiri.

Cara berpikir ini sebenarnya masuk akal sepenuhnya. Keunggulan terbesar pabrikan adalah ia yang paling paham modelnya sendiri.

## Keunggulan Pabrikan Itu Nyata

Prompt macam apa yang disukai model, desain Tool Schema seperti apa yang paling stabil, bagaimana menyusun context panjang, kemampuan apa yang ditambah versi baru, di mana paling mudah tersandung — pabrikan biasanya tahu lebih dulu daripada pihak ketiga.

Maka untuk produk seperti Claude Code dan Codex, di mana model dan Harness beriterasi bersama dalam jangka panjang, kombinasi resmi pabrikan memang sering kali jadi jawaban terbaik di versi sekarang. Di titik ini saya tidak bantah.

## Tapi Melatih Model dan Membangun Harness Itu Dua Rekayasa yang Sama Sekali Berbeda

Begitu sampai pada model terbuka seperti DeepSeek dan GLM, urusannya jadi menarik — karena melatih model yang bagus dan membangun Harness yang bagus sebenarnya dua bidang rekayasa yang sama sekali berbeda.

Begitu Coding Agent benar-benar jalan, muncul banyak sekali persoalan di luar model:

- Cara membaca file, cara mengedit kode
- Cara mengendalikan Agent Loop, cara mengompres Context
- Cara memanfaatkan cache, cara pulih dari kegagalan tool call
- Cara menjadwalkan Subagent, cara mengelola izin

Seberapa baik hal-hal ini dikerjakan langsung menentukan seberapa enak model yang sama dipakai di ujungnya. Model yang sama, beda Harness, pengalamannya bisa beda langit dan bumi.

## Masalah yang Lebih Besar: Model Diperbarui Terlalu Cepat

Hari ini GLM unggul; bulan depan DeepSeek bisa saja meluncurkan Flash yang lebih nendang; beberapa saat kemudian ada model baru yang menyusul lagi.

Kalau seluruh alur kerja coding terikat pada produk satu pabrikan, ganti model sering kali berarti ikut mengganti tool dan kebiasaan. Konfigurasi, memori, dan alur kerja yang sudah kamu asah berbulan-bulan, semua dibongkar total.

Di sinilah nilai Harness pihak ketiga: **kamu bisa mengunci tool, Skills, MCP, izin, dan alur kerja yang sudah akrab bagimu, lalu hanya menukar model di bawahnya.** Hari ini jalan pakai DeepSeek, besok ganti GLM, lusa ganti yang lain — lingkungan kerja tidak dibongkar dari nol.

## Peta Posisi Lima Harness

Mari luruskan posisi lima pemain utama (berdasarkan pengalaman pakai saya sampai akhir Agustus 2026):

**Pi**: filosofinya minimalis; Harness campur tangan pada model sekecil mungkin. Ringan, cepat, konsumsi Token rendah, sangat mudah dibentuk. Cocok jadi fondasi agent jangka panjang milikmu sendiri — sederhana, bersih, bebas dimodifikasi.

**OMP**: terus menumpuk kapabilitas coding berat di atas Pi — LSP, Debugger, Browser, AST — seperti memasangkan IDE lengkap untuk si agent. Cocok untuk yang benar-benar coding berat dan butuh navigasi repo yang kompleks.

**DeepSeek Harness**: paling jauh melangkah, Everything is Plugin. Agent Loop, tool, izin, Preset, dan UI semuanya bisa dibongkar-pasang ulang. Cocok untuk yang suka utak-atik arsitektur agent, Preset, multi-agent, dan Runtime generasi berikutnya. Lebih sering coba mode PTC — lebih cepat dan lebih hemat token.

**OpenCode**: yang paling seimbang saat ini; open source, banyak Provider, ekosistem besar, Client/Server, aplikasi desktop, dan Subagent semuanya cukup matang. Cocok untuk yang menginginkan satu set Coding Agent serbaguna multi-model yang matang.

**Command Code**: jalurnya beda total — ia doyan menambal kekurangan model. Parameter tool call yang salah diperbaiki lokal; pembacaan file yang duplikat dideduplikasi; sesi panjang dijaga Stable Prefix-nya untuk menaikkan Cache Hit; saat Context hampir meledak, dilakukan Compaction. Pendekatan ini memberi nilai maksimal pada model kerja rodi seperti DeepSeek V4 Flash dan GLM-5.3 Flash: modelnya agak lemah? Harness yang menambal.

## Pilihan Saya

Kalau hanya melihat fleksibilitas jangka panjang, saya tetap lebih suka Pi. Tapi kalau hari ini saya diminta menyuruh DeepSeek V4 Flash atau GLM-5.3 kerja keras beneran, saya akan serius mencicipi Command Code — pasangan model dan Harness disusun per tugas, bukan per kubu.

Di era model terbuka, model dan Harness sudah sepenuhnya bisa dipilih terpisah. **Berhenti bertanya “pakai model siapa harus pakai tool siapa”, dan mulai bertanya “di Harness mana model ini bekerja paling maksimal”.**
