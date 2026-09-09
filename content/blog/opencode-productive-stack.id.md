---
title: "Stabil, Cepat, Produktif, Murah: Rekam Lengkap AI Coding Stack-ku"
description: "OpenCode + OpenChamber + dua langganan DeepSeek V4 Flash: 15 proyek jalan kode bersamaan dan kuota cuma bergerak sedikit. Konfigurasi lengkap kubongkar: pemangkasan context, memori berlapis, otomasi desktop, dan pelajaran “tetap pada pasangan aslinya”."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - Pemrograman AI
  - Konfigurasi
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Gagasan utamanya pertama kali dipublikasikan di [X](https://x.com/realchendahuang/status/2086611065920733305); artikel ini adalah catatan lengkap konfigurasinya.

Kesimpulan dulu: **OpenCode + OpenChamber + langganan DeepSeek V4 Flash lewat OpenCode Go + langganan DeepSeek V4 Flash lewat Ollama Cloud.**

Stack ini kupakai intensif jangka panjang, dan empat kata yang merangkumnya: stabil, cepat, produktif, murah. Kutahan 15 proyek beruntun yang semuanya jalan kode bareng, kuotanya cuma tergerus sedikit.

## Kenapa OpenCode + OpenChamber

Proses seleksinya sudah kutulis di [artikel lain](/blog/agent-harness-selection); di sini cuma alasannya di level hasil: OpenCode saat ini inti multi-model paling seimbang — open source, banyak Provider, Client/Server, app desktop, dan subagent semuanya matang; sedangkan OpenChamber adalah Harness GUI open source dengan finishing terbaik yang pernah kupakai, pengelolanya merawatnya dengan sungguh-sungguh, rapi dan stabil, dan bug kecil sesekali sama sekali tak mengganggu pemakaian jangka panjang.

Antarmuka web + PWA, hampir tak ada bedanya dengan aplikasi desktop, dan pembaruan tidak perlu manual.

## Konfigurasi Berputar di Sekitar Tiga Kebutuhan Inti

Konfigurasi OpenCode-ku dibangun di sekitar tiga hal: manajemen context, sistem memori, kemampuan eksternal.

**1. opencode-dcp (open source) — pemangkasan context dinamis.** Saat context menyentuh ambang tertentu, konten lama otomatis dikompres jadi ringkasan teknis: informasi kunci dipertahankan, noise dibuang, duplikat dibersihkan, dan konten bernilai rendah seperti error tool dikeluarkan dari context. Sesi panjang tak membuat context meledak, hemat uang dan token — inilah fondasi agar tugas panjang bisa jalan seharian penuh.

**2. opencode-goal-plugin — manajemen goal.** Menambahkan mode Goal pada tugas panjang, jadi kalau agent melenceng bisa ditarik kembali.

**3. Hermes Memory — memori berlapis (kubuka open source-nya kalau memang dibutuhkan).** Ini plugin terberatku: mekanisme memori berlapis milik Hermes agent kupindahkan ke OpenCode, mengingat preferensi pengguna, keputusan proyek, dan pelajaran masa lalu lintas sesi. Proyek baru tak perlu diajari dari nol.

**4. context7-MCP.** Mencari dokumentasi resmi terbaru untuk library dan framework — tidak perlu menggali sendiri.

**5. grep-MCP.** Mencari pemakaian nyata di seisi kode GitHub — jauh lebih bisa diandalkan daripada menulis dari ingatan.

**6. open-computer-use — otomasi desktop.** Membuat AI langsung mengoperasikan aplikasi macOS: klik, mengetik, scroll, drag, screenshot, membaca accessibility tree. Sangat berguna untuk tahap testing dan acceptance.

## Hitungan Biaya: Bagaimana Dua Langganan Dipakai

DeepSeek V4 Flash adalah inti value-for-money dari stack ini: benar-benar pintar, benar-benar hemat. Langganan OpenCode Go menutupi alur kerja utama; langganan Ollama Cloud jadi kanal kedua untuk membagi beban — dua langganan digabung lebih murah daripada satu Coding Plan pabrikan mainstream, dengan output lebih tinggi.

Klaim bahwa “model di dalam shell pihak ketiga menurun kecerdasannya” perlu dibedah: **akar degradasinya adalah “shell yang tidak melakukan Harness Engineering untuk modelnya”**, bukan tindakan ganti shell-nya. Dukungan OpenCode untuk model terbuka kelas papan atas, dan DeepSeek V4 Flash berjalan di dalamnya stabil dan cepat — justru itulah alasan saya berani menumpuk 15 proyek di atasnya.

## Pelajaran “Tetap pada Pasangan Aslinya”

Teman-teman di grup sering bertanya: ada nggak desktop coding AI universal? Yang bisa nyambung ke semua langganan dan tidak pernah menurunkan kecerdasan model mana pun?

Setelah ngobrol dengan beberapa teman yang tiap hari utak-atik intensif, kesimpulan kami satu: tidak ada. Tetap pada pasangan aslinya.

- GPT → Codex: langganan resmi langsung, penjadwalan native paling stabil.
- Gemini → AntiGravity: langit-langit kecepatan, jendela panjang tanpa tersendat.
- DeepSeek, GLM dan model-model terbuka lain → Harness yang ramah model terbuka seperti OpenCode / ZCode.

Model yang dipaksakan ke shell yang tidak cocok hampir pasti kena penurunan kecerdasan, pelambatan, dan langganan macet. **Tinggalkan tiap model di tempat duduk yang paling nyaman baginya; kombinasilah yang jadi stack-mu.**

## Penutup

Stack ini sudah kujalani berbulan-bulan, dan perubahan terbesarnya bukan soal berapa yang kehemat — tapi “berani membuka tugas”. Karena stabil dan murah, membuka 15 proyek tidak bikin deg-degan. Nilai sebuah tool stack pada akhirnya terlihat dari berapa banyak pekerjaan yang kamu berani taruh di atasnya.
