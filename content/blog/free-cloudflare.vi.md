---
title: "Người dùng miễn phí vắt kiệt Cloudflare như thế nào — bản miễn phí thật sự xài chùa được đến đâu?"
description: "Bản miễn phí của Cloudflare chống lưng được cả một hạ tầng internet cá nhân: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway và hơn thế nữa."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Hạn mức miễn phí
  - Triển khai
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> Bài gốc đăng trên [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare gần như chống lưng được cả một hạ tầng internet cá nhân: tên miền, website, CDN, lưu trữ đối tượng, cơ sở dữ liệu, hàm biên (edge), tunnel xuyên mạng, chuyển tiếp email, CAPTCHA và cổng AI — tất cả đều bắt đầu từ bản miễn phí.

## DNS miễn phí

Bản thân Cloudflare cũng là nhà đăng ký tên miền, giá đăng ký và gia hạn khá minh bạch. Bạn cũng có thể mua tên miền trên các nền tảng như Spaceship rồi chuyển DNS sang Cloudflare.

Tên miền vào Cloudflare là bạn có ngay một hệ quản lý DNS xịn sò.

Điểm mấu chốt: phân giải DNS không tính phí theo số truy vấn. Không như mấy nhà cung cấp lớn trong nước, trơ trẽn đến mức tính phí theo số lần phân giải — đúng là vô sỉ không ai bằng.

Cloudflare rất hợp với ma trận nhiều tên miền, nhiều subdomain, nhiều dự án nhỏ.

Bạn có thể chạy:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Mua một tên miền, gán subdomain khác nhau cho dịch vụ khác nhau, còn phân giải DNS thì không tốn thêm gì.

Với web traffic cần proxy, bật đám mây màu cam lên, để Cloudflare lo phần proxy, cache và chứng chỉ HTTPS.

## CDN miễn phí

Cache CDN là thứ ngầu nhất mà Cloudflare có — đa số mọi người biết đến công ty này qua nó. Với blog, trang chính thức và trang tài liệu, giá trị rất rõ ràng:

Truy cập nhanh hơn, origin server nhẹ hơn, tiết kiệm băng thông. Nhất là khi bạn dùng VPS giá rẻ, đặt Cloudflare phía trước cảm nhận khác hẳn.

## Pages miễn phí

Pages có thể lưu trữ miễn phí site tĩnh và dự án frontend.

- Blog cá nhân
- Website sản phẩm
- Trang tài liệu
- Trang landing
- Trang dự án mã nguồn mở
- Trang tài liệu khóa học
- Trang danh sách chờ
- Trang hướng dẫn tải
- Trang quảng bá ebook

Những trang này có thể lưu trữ thẳng, không cần mua server riêng. Gắn tên miền của mình là thành trang cá nhân hoặc trang chủ dự án duy trì lâu dài.

## Workers miễn phí

Khi site cần API, xác thực hoặc logic động khác, dùng Workers. Code của bạn chạy trên mạng lưới của Cloudflare — không cần tự bảo trì server. Ngoài JavaScript/TypeScript, nó còn hỗ trợ WebAssembly và nhiều runtime khác.

Bản miễn phí gồm 100 nghìn request mỗi ngày. Dự án cá nhân thật sự vượt mức đó thì nâng cấp lên bản trả phí — không vội gì.

Workers Paid khởi điểm 5 đô/tháng.

Nhiều dự án nhỏ chẳng cần backend hoàn chỉnh. Một Worker là đủ.

## KV miễn phí

KV hợp với dữ liệu cần đọc nhanh nhưng không đòi hỏi nhất quán mạnh — cấu hình, cờ tính năng, kết quả cache. Nó không phải bản thay thế hoàn toàn cho Redis, nhưng che được nhiều nhu cầu đơn giản trong dự án cá nhân.

## D1 miễn phí

D1 là cơ sở dữ liệu SQLite do Cloudflare quản lý, hợp với dữ liệu quan hệ. Bản miễn phí gồm 5 GB tổng lưu trữ, cộng hạn mức đọc/ghi theo ngày.

## R2 miễn phí

R2 là kho lưu trữ đối tượng tương thích API S3, hợp với ảnh, tệp đính kèm và sao lưu. Ưu điểm lớn nhất: phục vụ từ R2 không mất phí băng thông — bạn trả tiền chủ yếu cho lưu trữ và số thao tác. Bản miễn phí cũng có hạn mức cho cả hai.

Bạn có thể đặt vào đó:

- Ảnh
- Tệp đính kèm
- PDF
- Tài liệu khóa học
- Gói phần mềm
- File sao lưu
- Avatar người dùng
- Ảnh trong Markdown
- Tài nguyên tĩnh
- Bộ dữ liệu
- File âm thanh
- Video nhỏ

## Email Routing miễn phí

Email Routing chuyển tiếp email gửi tới tên miền tùy chỉnh của bạn sang một hộp thư có sẵn — dùng được trên bản miễn phí. Cloudflare hiện cũng có Email Sending để gửi email giao dịch qua Workers, nhưng gửi tới người nhận bất kỳ cần Workers Paid, đừng nhầm với chuyển tiếp thư đến miễn phí.

## Turnstile miễn phí

Turnstile là lớp xác minh con người của Cloudflare, người dùng thường không phải nhận diện đèn giao thông hay ký tự méo mó. Hợp đặt ở:

- Đăng nhập
- Đăng ký
- Bình luận
- Form liên hệ
- Danh sách chờ
- Trang tải xuống
- Đăng ký nhận email

## Tunnel miễn phí

Muốn cho NAS ở nhà, máy dev local hay game server phơi ra internet? Dùng Tunnel để dựng một đường ống chủ động nối từ mạng nội bộ ra Cloudflare.

NAS của bạn, máy dev local, dịch vụ nội bộ — đều có thể phơi ra qua Cloudflare Tunnel. Giá trị cốt lõi:

- Không cần IP công khai
- Không cần mở port trên router
- Không lộ IP origin
- Có thể gắn tên miền riêng

Ví dụ:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Thứ này quá đã với dân chơi server tại nhà.

## Access miễn phí

Access chắn trước bảng quản trị, môi trường staging và công cụ nội bộ, xác minh danh tính trước khi cho vào. OTP email, Google, GitHub hay nhà cung cấp danh tính của team đều dùng được — không cần viết thêm hệ đăng ký/đăng nhập chỉ vì một trang nội bộ. Ví dụ:

- Chỉ email được chỉ định mới vào được
- Chỉ đăng nhập Google mới vào được
- Chỉ đăng nhập GitHub mới vào được
- Chỉ thành viên team mới vào được

Rất tiện để bảo vệ backend, staging và công cụ nội bộ.

## AI Gateway miễn phí

AI Gateway có thể đặt trước nhiều nhà cung cấp model, thống nhất ghi log request, độ trễ, lỗi và trúng cache, cộng thêm giới hạn tốc độ (rate limiting) và fallback. Giai đoạn đầu làm sản phẩm AI, quản lý nhiều API tương thích qua một điểm vào duy nhất tiết kiệm được khối phiền phức.

Nó giúp bạn quan sát:

- Lượng request
- Độ trễ
- Lỗi
- Trúng cache
- Lời gọi model
- Giới hạn tốc độ
- Fallback

Dù bạn dùng OpenAI, Anthropic, Workers AI hay đủ loại API tương thích, đều có thể bọc một lớp lên phía trước.

Với sản phẩm AI giai đoạn đầu, nó là một điểm vào thống nhất rất tốt.

## Browser Run miễn phí

Giờ Cloudflare gọi khả năng này là Browser Run. Nó khởi động phiên trình duyệt đầy đủ trên cloud, điều khiển được bằng code hoặc AI.

Hợp cho:

- Chụp màn hình trang web
- Chuyển trang web sang Markdown
- Test tự động hóa trang web
- Thu thập nội dung trang
- Phân tích trang động
- Chuyển trang web sang PDF

Có hạn mức miễn phí theo ngày.

## Images Transform miễn phí

Cloudflare Images có hạn mức biến đổi ảnh: co giãn, cắt xén và chuyển đổi định dạng. Dùng nhiều thì tính phí riêng, hoặc bạn tự chạy dịch vụ chuyển mã trên Workers trả phí với Containers.

Có thể phối hợp với R2:

- R2 lưu ảnh gốc
- Images tạo thumbnail và chuyển đổi định dạng
- Cache Cloudflare phân phối

Hợp cho ảnh bìa blog, avatar, ảnh sản phẩm, minh họa bài viết.

Hạn mức miễn phí của Cloudflare đã che được khối dự án cá nhân. Nếu thật sự cần lượng request, thời gian tính toán cao hơn hoặc tính năng trả phí, hãy nâng cấp từ bậc Workers Paid 5 đô/tháng rồi tăng dần.

Và ở đây tôi muốn nói: Cloudflare ơi, chuyển khoản cho tôi đi!!
