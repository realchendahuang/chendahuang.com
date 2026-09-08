---
title: "API của DeepSeek có sẵn tìm kiếm web: xài chùa khả năng tìm kiếm chính thức qua Responses API"
description: "DeepSeek nhúng thẳng tìm kiếm web vào API: gọi deepseek-v4-flash qua giao diện Responses và khai báo tool web_search là xong. Không cần tích hợp công cụ tìm kiếm bên thứ ba, không cần xin key API tìm kiếm."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Công cụ AI
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Bài gốc đăng trên [X](https://x.com/realchendahuang/status/2084826975102030013). Bài này bùng nổ — 230 nghìn lượt xem, 1000+ lượt thích. Ở đây tôi sẽ trình bày rõ chi tiết.

Phát hiện một thứ hay ho: DeepSeek hóa ra nhúng thẳng tìm kiếm web ngay trong API.

## Nói gọn một câu

Gọi model `deepseek-v4-flash` qua giao diện **Responses**. Chỉ cần khai báo tool `web_search` trong tham số request là dùng được ngay khả năng tìm kiếm chạy phía server của DeepSeek.

Không cần tự tích hợp công cụ tìm kiếm bên thứ ba, không cần xin thêm key API tìm kiếm — toàn bộ quy trình tìm kiếm được DeepSeek quản lý hộ.

## Cách dùng

Tài liệu chính thức: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Cốt lõi chỉ là khai báo tool:

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
    input: 'What major things happened in the AI industry in August 2026?'
  })
})
```

Chỉ có vậy. Còn lại tìm kiếm, tải trang, phân tích, trích dẫn — toàn bộ là việc của server DeepSeek.

## Vì sao điều này quan trọng

Trước đây, muốn cho AI thông tin thời gian thực, bạn phải tự dựng cả một chuỗi: chọn công cụ tìm kiếm (SerpAPI, Bing Search, gì cũng được) → xin API Key → viết code tải và phân tích → nhét kết quả vào context → lại còn phải canh chừng ngân sách.

Cả chuỗi này, ít nhất một hai ngày, nhiều thì cả tuần, mà bước nào cũng tốn tiền: search API tính phí theo request, còn scraping thì phải đấu với chống bot.

Giờ DeepSeek nhúng thẳng vào, lại dùng model `deepseek-v4-flash` rẻ đến vô lý. Tìm kiếm và sinh nội dung trong một chuỗi, chi phí thấp đến mức dùng như nước máy.

## Hợp với tình huống nào

- Viết nội dung cần tính thời sự (tin tức ngành, so sánh sản phẩm, giải mã chính sách)
- Làm Agent: những bước cần tra cứu rồi mới quyết định
- Hệ thống hỗ trợ khách hàng / hỏi đáp: tìm thông tin mới nhất trước khi trả lời
- Mọi tình huống bị "ngày cắt kiến thức của model" kéo chân

## Lưu ý

1. **Dùng giao diện Responses**, không phải giao diện Chat Completions cũ. Giao diện cũ không có tool này.
2. Mức độ chi tiết của tìm kiếm web và định dạng trích dẫn đều có trong tài liệu chính thức — nên tự chạy thử một lần để xem cấu trúc trả về.
3. Có cơ chế giảm giá cache — nhớ tận dụng cho tình huống context dài, tiết kiệm được kha khá.

Đây đúng là xài chùa thật: đội ngũ chính thức tặng luôn phần đau đầu nhất của hạ tầng tìm kiếm. Cần thì cứ chép bài.

Liên quan: [Trải nghiệm sâu bản chính thức DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)
