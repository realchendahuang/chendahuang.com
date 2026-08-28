---
title: DeepSeek API に組み込みの Web 検索、Responses API で公式の検索能力をタダで使う
description: DeepSeek が公式 API に Web 検索を内蔵。Responses エンドポイントで deepseek-v4-flash を呼び、web_search ツールを宣言するだけでいい。サードパーティの検索エンジンに繋がなくても、検索キーの申請も不要。
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - AI ツール
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> 原文は [X](https://x.com/realchendahuang/status/2084826975102030013) に公開。これがバズって、23 万ビュー、1000+ いいね。ここで詳細をしっかり解説する。

いいもの見つけた：DeepSeek 公式が API に Web 検索を内蔵してた。

## 一言で言うと

**Responses 形式**のエンドポイントで `deepseek-v4-flash` モデルを呼び、リクエストパラメータで `web_search` ツールを宣言するだけで、DeepSeek サーバー側で実行される検索能力がそのまま使える。

自分でサードパーティの検索エンジンに接続する必要も、検索 API キーの追加申請も不要。検索の流れ全体を公式が丸ごとホスティングしてくれる。

## 使い方

公式ドキュメント：<https://api-docs.deepseek.com/zh-cn/guides/responses_api>

要はツールを宣言するだけ：

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
    input: '2026 年 8 月 AI 業界で何が起きた？'
  })
})
```

これだけ。あとの検索、取得、解析、引用は、全部 DeepSeek サーバー側の仕事。

## なぜこれが重要なのか

これまで AI にリアルタイム情報を持たせるには、自分で一連の流れを組む必要があった：検索エンジン選定（SerpAPI、Bing Search など）→ API キー申請 → 取得・解析コードを書く → 検索結果をコンテキストに詰める → 予算管理もする。

この一式、早くても 1〜2 日、長引くと 1 週間。しかもどこの段階も金がかかる：検索 API は呼び出し回数課金、取得はスクレイピング対策の処理も必要。

今は DeepSeek がそのまま内蔵していて、しかも使うのは `deepseek-v4-flash` という値段がぶっ飛んで安いモデル。検索と生成が一本の流れで、コストは水道水みたいに使い放題レベル。

## どんなシーンに向くか

- 鮮度が命の内容を書くとき（業界ニュース、製品比較、政策解説）
- Agent を作るとき：資料を調べてから判断する工程
- カスタマーサポート / 回答システム：答える前に最新情報を検索
- 「モデルの知識カットオフ日」が足を引っ張るシーン全般

## 注意点

1. **Responses エンドポイントを使うこと**。旧式の Chat Completions にはこのツールがない。
2. Web 検索の粒度や引用形式は公式ドキュメントに全部ある。実際に走らせて返ってくる構造を確認するのがおすすめ。
3. キャッシュ割引の仕組みがある。長文コンテキストのシーンでは活用するとかなり節約になる。

これは正真正銘のただ乗り。公式がいちばん面倒な検索インフラを無料でプレゼントしてくれた。必要な人はそのまま真似すればいい。

関連記事：[DeepSeek V4 Flash 正式版を徹底レビュー](/blog/deepseek-v4-flash-review)