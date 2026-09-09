---
title: "Harness chính hãng chưa chắc là đáp án đương thời: thời đại mô hình mở, chọn model và Harness riêng biệt"
description: "Dùng Claude thì gắn Claude Code? Thời đại mô hình mở rồi, bản năng đó cần được nâng cấp. Lợi thế chính hãng là có thật, nhưng huấn luyện model tốt và làm Harness tốt là hai ngành kỹ thuật khác nhau — bài này nói rõ vì sao model và Harness giờ đã có thể chọn riêng, kèm bản đồ định vị 5 Harness."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Chọn công cụ
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ý chính lần đầu đăng trên [X](https://x.com/realchendahuang/status/2093890559874388141); bài này là phiên bản lập luận đầy đủ, kèm bản đồ định vị 5 Harness.

Phản xạ đầu tiên của nhiều người khi chọn Coding Agent rất tự nhiên: dùng Claude thì gắn Claude Code; dùng GPT thì gắn Codex; dùng GLM thì gắn ZCode; dùng DeepSeek thì dĩ nhiên ưu tiên Harness của chính DeepSeek.

Cách nghĩ này thực ra hợp lý hoàn toàn. Lợi thế lớn nhất của chính hãng là hiểu model nhà mình nhất.

## Lợi thế chính hãng là có thật

Model thích loại Prompt nào, Tool Schema thiết kế thế nào thì ổn định nhất, Context dài tổ chức ra sao, bản mới thêm năng lực gì, chỗ nào dễ vấp nhất — chính hãng thường biết trước bên thứ ba.

Nên với những sản phẩm như Claude Code và Codex, nơi model và Harness cùng nhau lớn lên dài hạn, tổ hợp chính hãng thường là đáp án đương thời mạnh nhất. Điều này tôi không cãi.

## Nhưng huấn luyện model và làm Harness là hai ngành kỹ thuật hoàn toàn khác nhau

Đến với các mô hình mở như DeepSeek, GLM thì chuyện bắt đầu thú vị — vì huấn luyện một model tốt và làm một Harness tốt thực chất là hai ngành kỹ thuật hoàn toàn khác nhau.

Khi Coding Agent chạy thật, một mớ vấn đề ngoài model xuất hiện:

- File đọc thế nào, code sửa thế nào
- Agent Loop kiểm soát ra sao, Context nén thế nào
- Tận dụng Cache ra sao, Tool Call lỗi thì phục hồi thế nào
- Subagent điều phối thế nào, quyền hạn quản ra sao

Những chỗ này làm tốt hay không, quyết định trực tiếp việc cùng một model cuối cùng dùng có sướng hay không. Cùng một model, đổi Harness, trải nghiệm có thể khác một trời một vực.

## Vấn đề lớn hơn: model cập nhật quá nhanh

Hôm nay GLM mạnh, tháng sau có khi DeepSeek lại thả một con Flash cứng hơn, chốc nữa lại có model mới đuổi kịp.

Nếu cả quy trình làm việc code cột vào sản phẩm chính hãng nào đó, đổi model thường phải đổi luôn tool và thói quen. Mấy tháng vo ve chỉnh config, memory, workflow — dồn một đường.

Giá trị của Harness bên thứ ba nằm ở đây: **bạn ghim lại tool, Skills, MCP, quyền và workflow quen tay, chỉ thay model bên dưới.** Hôm nay chạy DeepSeek, mai đổi GLM, mốt đổi cái khác — môi trường làm việc không phải dọn từ đầu.

## Bản đồ định vị 5 Harness

Chốt lại vị trí của 5 đại gia chính thống (theo trải nghiệm dùng của tôi đến cuối tháng 8/2026):

**Pi**: triết lý tối giản, Harness can thiệp vào model ít nhất có thể. Nhẹ, nhanh, tốn ít Token, dễ tuỳ biến tối đa. Hợp làm nền móng cho Agent dài hạn của chính bạn — gọn, sạch, thoải mái chế.

**OMP**: tiếp tục chất lên Pi các năng lực code nặng như LSP, Debugger, Browser, AST, kiểu như khoác cho agent một bộ IDE đầy đủ. Hợp với ai code thật sự nặng và cần điều hướng Repo phức tạp.

**DeepSeek Harness**: đi xa nhất, Everything is Plugin. Agent Loop, tool, quyền, Preset, UI đều tháo rời gắn lại được. Hợp với ai thích vọc kiến trúc agent, Preset, multi-agent và Runtime thế hệ sau. Thử mode PTC nhiều hơn — nhanh hơn và tiết kiệm token hơn.

**OpenCode**: hiện là mẫu cân bằng nhất; open source, nhiều Provider, hệ sinh thái lớn, Client/Server, app desktop, Subagent đều trưởng thành khá tốt. Hợp với ai muốn một bộ Coding Agent đa model tổng hợp, đã được kiểm chứng.

**Command Code**: lối đi hoàn toàn khác — nó rất thích vá lỗi giúp model. Tham số Tool Call sai thì sửa tại chỗ; đọc file trùng lặp thì khử trùng lặp; session dài giữ Stable Prefix để tăng Cache Hit; Context sắp nổ thì làm Compaction. Cách nghĩ này phát huy giá trị tối đa trên mấy con model xén lưng như DeepSeek V4 Flash, GLM-5.3 Flash: model yếu một chút, Harness bù giúp.

## Cách tôi chọn

Nếu chỉ nhìn độ tuỳ biến dài hạn thì tôi vẫn thích Pi hơn. Nhưng nếu hôm nay bắt tôi quăng DeepSeek V4 Flash hay GLM-5.3 vào việc nặng, tôi sẽ thử Command Code cho thật kỹ — cặp model + Harness được ghép theo từng việc, không ghép theo phe phái.

Thời đại mô hình mở rồi, model và Harness đã hoàn toàn chọn riêng được. **Đừng hỏi “dùng model nhà ai thì dùng tool nhà ai”, hãy hỏi “model này bỏ vào Harness nào thì chạy hiệu quả nhất”.**
