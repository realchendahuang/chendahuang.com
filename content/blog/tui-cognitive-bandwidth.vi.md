---
title: "TUI đang giết băng thông nhận thức của bạn: đến lúc đập vỡ “bộ lọc geek” trong AI Coding"
description: "Hàng loạt AI Coding Agent đang đua nhau thả TUI, nhồi tương tác trở lại mô hình terminal thập niên 1980 rồi gọi đó là “đắm chìm”, “tôn trọng lập trình viên”. Bài này mổ xẻ ba cơ chế khiến TUI làm giảm băng thông nhận thức một cách hệ thống, và vì sao Web UI mới là lời giải đúng."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Lập trình AI
  - Thiết kế tương tác
  - Tản văn
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Ý chính lần đầu đăng trên [X](https://x.com/realchendahuang/status/2087949416808518106); bài này là phiên bản lập luận đầy đủ.

Dạo này cứ nhích là lại có một AI Coding Agent thêm TUI, và Claude Code phải chịu phần trách nhiệm lớn cho trào lưu này. Nó làm cho việc “ngồi terminal trò chuyện với AI để viết code” trở nên thật đỉnh — nhưng cũng gây hẳn một gu và lệ thuộc lối mòn: Coding Agent “xịn thật sự” thì mặc định phải là giao diện terminal; bản Web thành phần phụ, thậm chí còn bị chế là “không đủ chất programmer”.

Kết quả? Xây trước một cái TUI rối rắm — màu mè, thanh trạng thái, phím tắt, chuyển mode — rồi gắn nhãn “đắm chìm”, “hiệu quả”, “tôn trọng lập trình viên”.

Thật à?

## Bạn tưởng đang trò chuyện, thực ra đang vật lộn

Với nhóm nhỏ sống cả ngày trong terminal thì OK, TUI đã thật sự sướng. Nhưng với nhiều người hơn, đó là rào cản được cố ý dựng lên. Khi cộng tác với agent qua TUI, thực ra bạn đang liên tục làm ba việc:

**Nhớ phím tắt và mode.** Mỗi tool có một bộ thói quen phím riêng; người mới choáng, còn người cũ đổi tool cũng phải làm quen lại từ đầu.

**Dò tìm thông tin trong dòng ký tự cuộn không ngừng.** Trạng thái không được trải ra cho bạn xem — nó bị chôn trong timeline, phải “khai quật” bằng scroll và search.

**Cầu nguyện là mình không lỡ tay rơi vào một mode kỳ quặc nào đó.** Việc chuyển mode vô hình; thường bạn không biết đang ở mode nào, cho đến khi có chuyện.

Đó không còn là tương tác nữa — đó là vật lộn với giao diện.

## Mật độ thông tin không phải hiệu suất thông tin

Từ được fan TUI nhắc nhiều nhất là “mật độ thông tin”. Nhưng đẩy mật độ lên tận đỉnh thì cái giá phải trả là khả năng đọc và khả năng phục hồi bị giẫm nát xuống đáy.

Một giao diện thực sự hiệu quả phải **trải trạng thái ra trước mắt bạn**, giao việc hiểu cho mắt và cảm giác không gian — task nào đang chạy, session nào đang chờ input, file nào vừa bị sửa — liếc một cái là biết hết. Thay vì ép bạn nhét tất cả vào bộ nhớ ngắn hạn, trong khi não phải giữ tấm bản đồ vô hình “trạng thái hiện tại của hệ thống”.

Bộ nhớ làm việc của con người chỉ có bốn đến bảy ô. Mô hình tương tác của TUI về bản chất đang tiêu xài nguồn tài nguyên nhận thức quý nhất vào “nhớ trạng thái giao diện”, thay vì “suy nghĩ về vấn đề”.

## Nó còn nuôi một thói quen xấu

Tệ hơn, hệ sinh thái TUI đang nuôi một thước đo giá trị lệch lạc: **coi việc thuộc bàn phím của một công cụ nào đó là năng lực đích thực.**

Hệ quả là người ta đổ rất nhiều năng lực vào việc theo kịp giao diện thay vì nghĩ về vấn đề. Thước đo một lập trình viên trở thành “có thuộc lòng bộ phím tắt này không” thay vì “có mổ xẻ vấn đề cho ra hồn không”.

Một công cụ tốt phải giảm chi phí suy nghĩ, chứ không dồn chi phí suy nghĩ sang “cách thao tác với cái giao diện này”.

## Web UI hoàn toàn có thể vừa nhanh vừa gọn

Có người nói Web chậm, không “native”. Năm 2026 rồi, lập luận đó chết từ lâu rồi.

Web UI hoàn toàn có thể vừa nhanh vừa gọn: cài thành PWA thì gần như chẳng khác gì app desktop, cập nhật còn tiện hơn — không cần nâng cấp tay, refresh một cái là bản mới nhất. Session dài, nhiều task chạy song song, trực quan hóa trạng thái task — đó chính là thế mạnh của DOM trong trình duyệt, chứ không phải của dòng ký tự.

Setup chính của tôi là giao diện Web dạng OpenChamber trên lõi OpenCode, dùng nặng kéo dài — chắc như đinh đóng cột. Nếu soi kỹ thì mấy lỗi vặt thi thoảng của Web chẳng bao giờ cản trở việc dùng lâu dài, ngược lại cái chuyển mode của một số TUI đã cắn tôi không biết bao lần.

## Tool là để phục vụ con người, không phải để chứng minh ai “geek” hơn

Claude Code vốn mạnh, điều đó không tranh cãi. Nhưng chính nó làm lan cái gu “TUI mới là chính đạo”, còn đám bắt chước phía sau còn lố hơn — lười đến mức chẳng thèm làm thiết kế tương tác, cứ coi “sống trong terminal” là bằng chứng cho sự thượng lưu.

Gói món tương tác ngược đời thành thứ sang chảnh — đúng là nực cười thật.

Tool là để dùng cho con người. Thước đo mãi mãi phải là: **nó có giảm tổng chi phí để bạn hoàn thành việc không?** Nếu một giao diện bắt bạn tiêu năng lực vào “vật lộn với chính nó” thì nó càng “geek” cỡ nào cũng chỉ là tài sản âm.

Lần sau chọn Coding Agent, nhớ tháo cái bộ lọc này ra trước đã.
