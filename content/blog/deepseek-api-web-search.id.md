---
title: "API DeepSeek punya pencarian web bawaan — manfaatkan cuma-cuma kemampuan pencarian resmi lewat Responses API"
description: "DeepSeek membangun pencarian web langsung di dalam API-nya: panggil deepseek-v4-flash lewat antarmuka Responses dan deklarasikan tool web_search. Tanpa integrasi mesin pencari pihak ketiga, tanpa perlu kunci API pencarian."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Alat AI
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Awalnya diposting di [X](https://x.com/realchendahuang/status/2084826975102030013). Posting ini meledak — 230 ribu tayangan, 1000+ suka. Detailnya akan saya uraikan di sini.

Menemukan sesuatu yang bagus: DeepSeek ternyata benar-benar mengirimkan pencarian web langsung di dalam API-nya.

## Dalam satu kalimat

Panggil model `deepseek-v4-flash` lewat antarmuka **Responses**. Cukup deklarasikan tool `web_search` di parameter permintaan, dan Anda langsung mendapat kemampuan pencarian yang dieksekusi di sisi server DeepSeek.

Tanpa mengintegrasikan mesin pencari pihak ketiga, tanpa mengajukan kunci API pencarian terpisah — seluruh alur pencarian di-hosting langsung oleh DeepSeek.

## Cara menggunakannya

Dokumentasi resmi: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Intinya cuma mendeklarasikan tool-nya:

```js
const response = await fetch('https://api.deepseek.com/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
  },
  body: JSON.stringify({
    model: 'deepseek-v4-flash',
    tools: [{ type: 'web_search' }],
    input: 'Apa peristiwa besar yang terjadi di industri AI pada Agustus 2026?'
  })
})
```

Ya, hanya itu. Mencari, mengambil, mem-parse, dan menyitir — semuanya dikerjakan di sisi server DeepSeek.

## Mengapa ini penting

Dulu, untuk memberi AI informasi real-time, Anda harus membangun sendiri seluruh alurnya: pilih mesin pencari (SerpAPI, Bing Search, dan sebagainya) → ajukan kunci API → tulis kode untuk mengambil dan mem-parse → masukkan hasilnya ke konteks → lalu awasi anggaran.

Itu minimal satu-dua hari, bisa seminggu kalau mentok, dan setiap langkahnya butuh uang: API pencarian ditagih per permintaan, dan scraping berarti berhadapan dengan mekanisme anti-bot.

Sekarang DeepSeek tinggal menyematkannya langsung, memakai model `deepseek-v4-flash` yang harganya murah gila-gilaan. Pencarian dan generasi dalam satu alur, biayanya cukup rendah untuk dipakai seperti air keran.

## Kasus penggunaan yang cocok

- Menulis konten yang sensitif terhadap waktu (berita industri, perbandingan produk, penjelasan kebijakan)
- Membangun agent: langkah-langkah yang perlu mencari tahu dulu sebelum memutuskan
- Sistem dukungan pelanggan / tanya-jawab: cari informasi terbaru sebelum menjawab
- Skenario apa pun yang terhambat oleh batas pengetahuan (knowledge cutoff) model

## Catatan

1. **Gunakan antarmuka Responses**, bukan antarmuka Chat Completions yang lama. Yang lama tidak punya tool ini.
2. Granularitas pencarian web dan format sitasinya ada di dokumentasi resmi — ada baiknya dijalankan sekali untuk melihat struktur responsnya.
3. Ada mekanisme diskon cache — manfaatkan untuk skenario konteks panjang, bisa menghemat banyak.

Ini gratisan yang sesungguhnya: tim resmi menyerahkan bagian paling menyebalkan dari infrastruktur pencarian. Kalau Anda membutuhkannya, tinggal salin pekerjaan rumahnya.

Terkait: [DeepSeek V4 Flash — ulasan langsung rilis stabil](/blog/deepseek-v4-flash-review)
