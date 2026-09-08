---
title: Tôi đã chuyển công cụ gộp subscription proxy lên Cloudflare
description: Gộp nhiều dịch vụ proxy cộng với node tự dựng thành một subscription duy nhất, quy tắc định tuyến cấu hình ở phía server — client chỉ việc subscribe.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Vượt tường lửa
  - Dự án mã nguồn mở
minRead: 4
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

Tôi dùng dịch vụ proxy đã ba bốn năm rồi, giữa chừng cũng tự dựng VPS node. Luôn có một chuyện khá phiền: trên tay ba năm subscription, cộng thêm vài máy tự dựng, nằm rải rác trong client phải thêm từng cái một, còn quy tắc định tuyến thì client nào cũng phải cấu hình lại từ đầu. Đổi máy, đổi client, lắp đặt cho người nhà một lần — là lại làm lại cả nghi thức.

Sau này tôi nghĩ, chuyện subscription không cần phải quản rải rác trong client. Gom nó lại thành một link, quy tắc chốt chết ở phía server, client chỉ việc subscribe, mọi chuyện gọn gàng. Cách làm của Sub-Store trước đây tôi cũng dùng, nhưng nó chạy trên server của mình, tôi thấy nuôi nó phiền phức. Nên lần này tôi tự viết một bản chạy trên Cloudflare, tên là sub-store-cloudflare, mã nguồn mở trên [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## Nó thật ra chỉ làm một việc

Gộp nhiều nguồn subscription thành một subscription.

Nói cụ thể, bạn có thể nhét vài thứ vào:

- Link subscription của vài dịch vụ proxy
- Text node trên VPS của mình (vless, trojan, ss, vmess — đều được)
- Dán tạm một đoạn node vào cũng được

Vào trong rồi, Worker sẽ tải về, khử trùng lặp, lọc theo quy tắc bạn đưa, rồi tùy nhu cầu mà đổi tên, thêm cờ, phân giải domain. Đầu ra là một subscription tổng hợp duy nhất — client subscribe đúng một link đó là xong.

Phần quy tắc tôi đặt phía server. Kèm sẵn vài template Mihomo thông dụng — acl4ssr, whitelist/blacklist của Loyalsoldier, ai-streaming và mấy cái tương tự — nhóm định tuyến, bộ quy tắc đều cấu hình sẵn trên cloud. Bạn đưa subscription vào mấy client như mihomo / clash, surge, sing-box, shadowrocket, tải về là bản hoàn chỉnh đã kèm sẵn quy tắc định tuyến — bên đó không cần tự viết quy tắc, không cần duy trì URL bộ quy tắc.

## Vì sao nhất định phải Cloudflare

Nguyên nhân rất thực tế:

- **Không cần server.** Workers + D1, hạn mức miễn phí đủ cho nhu cầu cá nhân — tiết kiệm cả tiền server lẫn công bảo trì.
- **Domain workers.dev bản thân nó đã nằm ngoài tường lửa.** Client của bạn kết nối để tải subscription là thông ngay — không có chuyện "server ở nước ngoài mà node kéo subscription của chính nó cũng phải cần thang" kiểu búp bê lồng nhau.
- **Triển khai xong là một bảng quản trị web cộng một endpoint tải xuống.** Đổi client trên điện thoại vẫn mở trang web ra đổi cấu hình được.

Tech stack tôi cố tình giữ nhỏ: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron đều không nằm trong đường chính — bớt được thứ nào là bớt.

## Cố ý làm hai đường triển khai

Đường thứ nhất dành cho người chỉ muốn dùng: bấm nút Deploy to Cloudflare trong repo. Cloudflare tự kéo repo, tạo Worker, tạo D1, hỏi bạn hai cái token, xong xuôi trao cho bạn một link quản trị kèm token. Làm từng bước, không cần đụng command line.

Đường thứ hai dành cho tôi và những người thích nghịch: cài đặt một chạm bằng AI Agent.

Trong repo có kèm giao thức agent (AGENTS.md + một SKILL bên trong agent). Bạn ghi nguồn subscription, subscription tổng hợp muốn làm, template quy tắc muốn dùng vào một file cấu hình local, chạy `pnpm run install:cloudflare`, agent sẽ thay bạn kiểm tra đăng nhập Cloudflare, tạo database, ghi secret, migrate, deploy, import cấu hình, xác minh link, cuối cùng trao tận tay link quản trị và link tải xuống.

Chính tôi cũng lên link theo đường này, nên tôi khuyên dùng đường này — đỡ tốn tâm sức. Khi dùng với Codex / Claude Code, chỉ cần copy đoạn prompt trong `agent/install.prompt.md` ở repo là được.

## Hợp với ai

Nói thẳng: nếu trong tay bạn không chỉ một dịch vụ proxy, lại có thêm vài node tự dựng, muốn gộp thành một subscription để tự dùng — đây chính là dự án dành cho bạn. Nếu bạn chỉ có một dịch vụ dùng tạm được rồi, thì thật sự không cần thứ này.

Code hoàn toàn mã nguồn mở, AGPL. Ý tưởng tương tác frontend có chút tri ân bản Sub-Store gốc; bản gốc chạy trong container, bao phủ hệ sinh thái client rộng hơn. Bản của tôi là một dạng Cloudflare-native gọn hơn, tiện sửa và triển khai trực tiếp, không phải bản sao từng dòng.

Ai quan tâm có thể vào repo xem — README viết khá đầy đủ, cứ theo các bước triển khai mà làm.
