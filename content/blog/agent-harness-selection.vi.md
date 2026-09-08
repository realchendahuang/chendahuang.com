---
title: "Sau khi nghịch Pi Agent, OMP, Codex và ZCode, vì sao cuối cùng tôi chọn OpenCode + OpenChamber"
description: "Bài tổng kết chọn lựa Agent Harness: ba tiêu chí — trải nghiệm GUI, khoá nhà cung cấp và quyền tự do phát triển thứ cấp — đã loại Pi Agent, OMP, Codex và ZCode, cuối cùng chốt lõi OpenCode + giao diện OpenChamber."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Chọn công cụ
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Bài gốc đăng trên [X](https://x.com/realchendahuang/status/2085410520459604026).

Dạo gần đây tôi cứ nghịch Pi Agent, OMP, ZCode, Codex, OpenCode mấy cái Agent Harness này, cuối cùng cũng hiểu được nhu cầu thật sự của mình là gì.

## Ba tiêu chí của tôi

### Một: GUI chín muồi và ổn định

Tôi quen dùng GUI rồi, thật sự không chịu nổi TUI. Tán chuyện trong cái ô terminal đen thui quá mệt — phải nhớ cả đống phím tắt, cả đống lệnh mới dùng được cho ra hồn. Còn GUI thì chỉ cần trực quan bấm vào icon, bấm nút là xong.

Nên tôi cần một GUI chín muồi, ổn định và đẹp mắt.

Riêng tiêu chí này đã loại thẳng **Pi Agent** và **OMP**. Không phải lõi của chúng kém — mà là GUI cộng đồng dựng quanh chúng quá dở. Tự tay xây một cái thì tốn cả đống công sức, mà mấy công cụ này tùy biến quá mạnh, GUI tự mày mò không có tính phổ dụng — đổi máy, đổi người là lại đập đi xây lại từ đầu.

### Hai: không khoá nhà cung cấp, không thiên vị nhà cung cấp

Codex quả thật có mở giao diện cấu hình cho model bên thứ ba, nhưng cấu hình thật sự rất phiền, mà model bên thứ ba luôn là "công dân hạng hai" — bị model chính thức đè, bị nhịp cập nhật kéo chân, khiến tôi khó chịu vô cùng.

ZCode còn vô lý hơn: không có cách nào đăng nhập Coding Plan của từng nhà cung cấp qua OAuth (ví dụ Kimi For Code, Grok Build đều không dùng được trong ZCode, trừ khi tự hack mò ra đường tắt).

Nên tôi loại ZCode, Codex — mấy phần mềm thiên vị nhà cung cấp model.

### Ba: mã nguồn mở và cho phép phát triển thứ cấp

Tôi cần dựa trên nhu cầu của mình mà phát triển thứ cấp và tùy biến, để dễ mang đến cho khách hàng trải nghiệm dùng là xong ngay. Nên nó nhất định phải là sản phẩm mã nguồn mở, thân thiện với giấy phép — để mình dùng sướng, cũng để khách hàng dùng đơn giản tiện lợi, không cần nghịch đủ thứ hack ma thuật.

## Câu trả lời cuối cùng: OpenCode + OpenChamber

Loại hết một vòng, thứ thật sự chọn được chỉ còn **OpenCode**.

Nhưng OpenCode chỉ là một lõi Agent. Muốn ghép cho nó một GUI chín muồi, ổn định, dễ dùng, cuối cùng tôi đã tìm ra đáp án đúng nghĩa: **OpenChamber**.

- Lõi: OpenCode, mã nguồn mở, không khoá nhà cung cấp, hỗ trợ model của mọi hãng
- Giao diện: OpenChamber, bộ công cụ GUI chín muồi
- Tổ hợp: lõi ổn định + giao diện thuận tay, lại còn phát triển thứ cấp tùy ý

Địa chỉ mã nguồn mở: <https://github.com/openchamber/openchamber>

## Vài điều ngẫm lại

Chuyện chọn công cụ, về bản chất là chọn "tiếng nói của bạn nằm trong tay ai".

Công cụ mã đóng dù có ngon đến mấy, hướng cập nhật, hỗ trợ model, chiến lược giá đều do người khác quyết — bạn chỉ có thể bị động chấp nhận. Còn tổ hợp mã nguồn mở + không khoá, bạn luôn có đường lui, luôn có tự do cải tạo.

Còn về chuyện tranh cãi TUI với GUI, đừng cố cứng đầu. Công cụ là để làm việc, không phải để chứng minh bạn biết dùng command line. Giao diện dùng thoải mái, dùng lâu được, quan trọng hơn tất cả.

Đọc thêm: [Trải nghiệm sâu bản chính thức DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)
