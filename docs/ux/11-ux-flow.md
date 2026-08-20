# 11 — UX Flow: Student Calculator

## 1. Happy Path

```text
Mở Calculator
    ↓
Nhập Số thứ nhất
    ↓
Nhập Số thứ hai
    ↓
Chọn Tính
    ↓
Validation hợp lệ
    ↓
Calculating
    ↓
Hiển thị A + B = Kết quả
    ↓
Tính phép khác / Kết thúc
```

## 2. Validation Flow

```text
Chọn Tính
    ↓
Thiếu hoặc không phải số tự nhiên?
    ├── Có → Không tính
    │         ↓
    │       Hiển thị lỗi tại input liên quan
    │         ↓
    │       Focus về lỗi cần sửa
    │         ↓
    │       Sửa → Tính lại
    │
    └── Không → Thực hiện tính
```

### Validation copy
- Bỏ trống: **Vui lòng nhập số.**
- Không phải số tự nhiên: **Vui lòng nhập số tự nhiên.**

Không quy định lỗi giới hạn độ dài/giá trị vì PRD chưa xác định giới hạn.

## 3. Success Flow

```text
Tính thành công
    ↓
Ghi nhận phép tính thành công
    ↓
Hiển thị:
A + B = RESULT
    ↓
[Tính phép khác]
```

**Tính phép khác:** xóa input, kết quả và lỗi; đưa focus về **Số thứ nhất**.

## 4. System Error Flow

```text
Yêu cầu tính
    ↓
Không thể hoàn thành hoặc ghi nhận?
    ├── Có → Không hiển thị kết quả mới
    │         ↓
    │       Giữ input
    │         ↓
    │       "Không thể tính lúc này. Vui lòng thử lại."
    │         ↓
    │       Người dùng thử lại
    │
    └── Không → Hiển thị kết quả
```

## 5. Interaction rules

- Một màn hình, không chuyển trang trong luồng chính.
- Enter/submit có hành vi tương đương nút **Tính** khi dữ liệu hợp lệ.
- Không xóa input khi validation hoặc system error.
- Không hiển thị kết quả mới trước khi toàn bộ phép tính được xác nhận thành công.
- Sau lỗi, ưu tiên cho phép sửa/thử lại ngay, không bắt nhập lại dữ liệu.
