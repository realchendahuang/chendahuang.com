---
title: "Bổ sung đa phương thức cho DeepSeek: giải pháp nhận diện ảnh Qwen-3.7-Flash"
description: "DeepSeek V4 Flash không có đa phương thức — cần hiểu ảnh thì phải làm sao? Khảo sát một vòng, giải pháp có hiệu quả chi phí cao nhất hiện nay là Qwen-3.7-Flash: chi phí nhận diện một bức ảnh gần như bằng không, tổ hợp với V4 Flash là vá được điểm yếu."
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - Đa phương thức
  - Đánh giá mô hình
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Bài gốc đăng trên [X](https://x.com/realchendahuang/status/2085265465564336327) — 89 nghìn lượt xem, 600+ lượt thích.

Nhiều người than phiền DeepSeek V4 Flash không có khả năng đa phương thức. Đây đúng là một điểm yếu — nhưng không cần phải chết dính vào một model.

## Vấn đề

Khả năng văn bản của V4 Flash đã đầy tới mức tối đa, nhưng gặp tình huống đọc ảnh là chịu chết: ảnh chụp màn hình, ảnh bảng biểu, bản thiết kế UI, tài liệu quét — không thứ nào xử lý được.

Đa phương thức là cái giá của "rẻ" — model phải làm mã hóa thị giác, tham số phình to, chi phí đội lên.

## Cách giải: tổ hợp model

Tôi khảo sát một vòng mấy model nhận diện ảnh có hiệu quả chi phí cao nhất hiện nay, kết luận là **Qwen-3.7-Flash**.

Chi phí nhận diện một bức ảnh thấp đến mức có thể bỏ qua. Dùng nó làm model thị giác chuyên dụng, suy luận văn bản tiếp tục đi qua V4 Flash, là giữ được cả hai ưu điểm.

## Tổ hợp thế nào

Ý tưởng đơn giản nhất là "routing": input có ảnh → đi qua model thị giác; thuần văn bản → đi qua V4 Flash.

```js
// Mã giả: routing theo nhu cầu
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // nhận diện ảnh + trích xuất thông tin chính
  }
  return deepseekV4Flash(input) // suy luận văn bản
}
```

Cách chơi cao cấp hơn là nhét luôn kết quả nhận diện ảnh vào V4 Flash để tiếp tục suy luận:

1. Dùng Qwen-3.7-Flash nhận diện ảnh, xuất ra mô tả có cấu trúc
2. Giao mô tả + câu hỏi gốc cùng lúc cho DeepSeek V4 Flash
3. V4 Flash dựa trên mô tả suy luận sâu, viết code, tóm tắt

Vừa nhìn được ảnh, lại vừa được cái rẻ và nhanh của V4 Flash.

## Tình huống hợp

- Hỏi đáp bằng ảnh chụp màn hình: ném ảnh chụp lỗi, ảnh chụp hội thoại vào
- Ảnh bảng biểu / tài liệu thành dữ liệu có cấu trúc
- Bản thiết kế UI thành code
- Trích xuất thông tin từ hóa đơn, hợp đồng đã quét
- Tình huống Agent cần "nhìn" màn hình

## Vì sao không phải phương án khác

LLM thị giác thuần túy (như mấy model đa phương thức nhà GPT) rất mạnh, nhưng giá thì vẫn thế — xử lý hàng loạt hằng ngày không kinh tế.

Qwen-3.7-Flash thắng ở hiệu quả chi phí: chất lượng nhận diện đủ dùng, chi phí gần như vô hình, chạy cả đống batch cũng không xót.

## Tổng kết

Tổ hợp model là chuyện thường — đừng trông mong một model làm hết.

V4 Flash làm ngựa thồ văn bản (rẻ, nhanh, context khổng lồ), Qwen-3.7-Flash bổ sung thị giác (rẻ, đủ dùng) — bộ đôi này là phương án có hiệu quả chi phí cao nhất hiện nay. Thiếu gì vá nấy, thực tế hơn nhiều so với chờ một model "toàn năng mà đắt".

Liên quan: [Trải nghiệm sâu bản chính thức DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)
