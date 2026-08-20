# 07 — MVP Scope

> Mục tiêu duy nhất: chứng minh luồng end-to-end **React → Node.js → PostgreSQL → production** với phép cộng hai số tự nhiên. Ưu tiên simplicity, correctness, maintainability.

## MUST

| Scope | Lý do |
|---|---|
| React: màn hình có 2 ô nhập, nút **Tính**, vùng kết quả | Luồng người dùng tối thiểu |
| Validate hai đầu vào là số tự nhiên | Bảo vệ correctness |
| Node.js API nhận 2 số và trả kết quả cộng | Chứng minh frontend → backend |
| PostgreSQL lưu mỗi lần tính: input, result, timestamp | Chứng minh backend → database |
| Hiển thị phép tính và kết quả | Hoàn tất end-to-end product |
| Xử lý lỗi API/DB ở mức cơ bản | Không trả kết quả gây hiểu nhầm |
| Deploy React + Node.js + PostgreSQL lên production | Điều kiện golive |
| Cấu trúc code đơn giản, tách UI / API / DB | Đủ maintainability cho MVP |

## SHOULD

| Scope | Lý do |
|---|---|
| Nút reset / tính phép tiếp theo | Hỗ trợ sử dụng liên tiếp |
| Mô tả ngắn mục đích ứng dụng | Giảm kỳ vọng sai |
| Health check backend | Hỗ trợ vận hành production cơ bản |
| Logging lỗi server cơ bản | Hỗ trợ chẩn đoán sự cố |

## COULD

| Scope | Lý do |
|---|---|
| Loading state khi đang tính | Cải thiện phản hồi UX |
| Giới hạn độ dài/giá trị đầu vào | Tăng robustness nếu cần |

## NOT NOW

- Login / user management.
- AI.
- Microservices.
- Kubernetes.
- Event-driven architecture.
- Complex analytics/dashboard.
- Cá nhân hóa, gamification.
- Lịch sử phép tính cho người dùng.
- Các phép toán ngoài cộng hai số tự nhiên.

## Definition of MVP Go-live

**Nhập 2 số trên React → gọi Node.js API → tính đúng → lưu PostgreSQL → trả và hiển thị kết quả trên production.**

Nếu luồng này ổn định và xử lý được input/error cơ bản, MVP đủ điều kiện golive.
