---
title: "Ổn định, nhanh, hiệu suất, rẻ: ghi chép trọn bộ AI Coding stack của tôi"
description: "OpenCode + OpenChamber + hai gói đăng ký DeepSeek V4 Flash: 15 dự án cùng lúc chạy code, hạn mức chỉ xụi chút xíu. Trải hết cấu hình ra: cắt tỉa context, bộ nhớ phân tầng, tự động hóa desktop, và bài học “giữ nguyên cặp gốc”."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - Lập trình AI
  - Cấu hình
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ý chính lần đầu đăng trên [X](https://x.com/realchendahuang/status/2086611065920733305); bài này là bản ghi cấu hình đầy đủ.

Kết luận trước: **OpenCode + OpenChamber + gói DeepSeek V4 Flash qua OpenCode Go + gói DeepSeek V4 Flash qua Ollama Cloud.**

Bộ này tôi dùng nặng dài hạn, gói lại bằng bốn chữ: ổn, nhanh, ra nghề, rẻ. Mở liên tục 15 dự án cùng lúc chạy code, hạn mức chỉ tụt tí xíu.

## Vì sao là OpenCode + OpenChamber

Hành trình chọn đã kể ở [bài khác](/blog/agent-harness-selection); đây chỉ nêu lý do ở mức kết quả: OpenCode hiện là lõi đa model cân bằng nhất — open source, nhiều Provider, Client/Server, app desktop, Subagent đều chín; còn OpenChamber là Harness GUI open source được chăm chút nhất tôi từng dùng, tác giả giữ gìn cực kỳ cẩn thận, tinh xảo, ổn định, mấy lỗi vặt thi thoảng chẳng hề cản dùng lâu dài.

Giao diện Web + PWA, gần như chẳng khác app desktop, cập nhật còn chẳng cần tay.

## Cấu hình xoay quanh ba nhu cầu lõi

Cấu hình OpenCode của tôi dựng trên ba thứ: quản lý context, hệ thống bộ nhớ, năng lực bên ngoài.

**1. opencode-dcp (mã nguồn mở) — cắt tỉa context động.** Khi context chạm ngưỡng, tự động nén nội dung cũ thành bản tóm tắt kỹ thuật: giữ thông tin then chốt, vứt nhiễu, dọn trùng lặp, và loại mấy thứ ít giá trị như lỗi tool ra khỏi context. Session dài không nổ context, tiết kiệm tiền lẫn token — đây là móng để task dài chạy được cả ngày liền.

**2. opencode-goal-plugin — quản lý mục tiêu.** Thêm mode Goal vào task dài, để agent đi lệch thì kéo lại được.

**3. Hermes Memory — bộ nhớ phân tầng (cần thì tôi sẽ open source sau).** Đây là plugin nặng nhất của tôi: tôi port cơ chế bộ nhớ phân tầng của Hermes agent sang OpenCode, ghi nhớ sở thích người dùng, quyết định dự án và bài học xưa qua các session. Dự án mới khỏi dạy từ đầu.

**4. context7-MCP.** Tra tài liệu chính thức mới nhất của library và framework, khỏi phải tự lục.

**5. grep-MCP.** Tìm cách dùng thật trong toàn bộ code trên GitHub, đáng tin hơn nhiều so với viết theo trí nhớ.

**6. open-computer-use — tự động hóa desktop.** Cho AI trực tiếp điều khiển app macOS: click, gõ, cuộn, kéo thả, chụp màn hình, đọc cây accessibility. Hợp nhất ở khâu test và nghiệm thu.

## Sổ chi phí: hai gói đăng ký tiêu thế nào

DeepSeek V4 Flash là lõi hiệu quả chi phí của bộ này: thông minh thiệt, rẻ thiệt. Gói OpenCode Go phủ quy trình chính, gói Ollama Cloud làm kênh hai phân tải — cộng hai gói lại còn rẻ hơn một Coding Plan chính hãng đại trà, mà sản lượng cao hơn.

Lời đồn “model bỏ vào vỏ bên thứ ba là bị dở” phải mổ ra xem: **gốc rễ của việc dở là “cái vỏ không làm Harness Engineering riêng cho model”**, chứ không phải động tác đổi vỏ. OpenCode hỗ trợ model mở hàng đầu, DeepSeek V4 Flash chạy trong đó vừa ổn vừa nhanh — chính vì thế tôi mới dám dồn 15 dự án lên nó.

## Bài học “giữ nguyên cặp gốc”

Trong group hay có người hỏi: có desktop lập trình AI nào vạn năng không? Cắm được đủ loại gói đăng ký, mà không làm model nào dở đi?

Nói chuyện với mấy ông bạn ngày ngày nghịch nặng xong, kết luận của tụi tôi thống nhất: không tồn tại. Giữ nguyên cặp gốc.

- GPT → Codex: gói chính hãng nối thẳng, điều phối native ổn nhất.
- Gemini → AntiGravity: trần tốc độ, cửa sổ dài không nghẹn.
- DeepSeek, GLM và mấy model mở khác → Harness thân thiện model mở như OpenCode / ZCode.

Model ném vào vỏ không hợp thì gần như khỏi thoát cảnh dở đi, chậm đi và gói đăng ký kẹt. **Mỗi model để yên ở chỗ ngồi dễ chịu nhất của nó, ghép lại mới thành bộ đồ nghề của bạn.**

## Cuối cùng

Bộ này chạy mấy tháng rồi, cảm giác lớn nhất không phải tiết kiệm được bao nhiêu, mà là “dám mở việc” — vì ổn và rẻ nên mở 15 dự án chẳng run tay. Giá trị của một bộ tool, rốt cuộc nằm ở chỗ bạn dám đè lên nó bao nhiêu việc.
