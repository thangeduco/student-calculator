# 10 — Screen Map: Student Calculator

## 1. Screen Map

MVP dùng **1 màn hình duy nhất**, thay đổi theo trạng thái để giảm thao tác.

```text
Calculator
├── Default
├── Validation Error
├── Calculating
├── Result
└── System Error
```

## 2. Screen specification

### S01 — Calculator

**Mục tiêu:** học sinh hiểu ngay nhiệm vụ và hoàn thành phép kiểm tra trên cùng một màn hình.

**Thứ tự mobile-first:**
1. Tiêu đề: **Kiểm tra phép cộng**
2. Mô tả ngắn: **Nhập hai số em đã tính để kiểm tra kết quả.**
3. Input **Số thứ nhất**
4. Dấu **+**
5. Input **Số thứ hai**
6. Nút chính **Tính**
7. Khu vực validation/error
8. Khu vực kết quả
9. Nút phụ **Tính phép khác** khi có kết quả

### States

| State | Hiển thị |
|---|---|
| Default | 2 input + nút Tính |
| Validation Error | Giữ dữ liệu; lỗi đặt cạnh input tương ứng; không có kết quả mới |
| Calculating | Giữ dữ liệu; thể hiện đang xử lý; tránh gửi lặp |
| Result | Hiển thị rõ `A + B = Kết quả`; có **Tính phép khác** |
| System Error | Giữ dữ liệu; thông báo **Không thể tính lúc này. Vui lòng thử lại.**; không hiển thị kết quả mới |

## 3. Responsive & Accessibility

- Mobile: một cột, input và action full-width.
- Màn hình rộng: giữ vùng tính toán gọn, không kéo input theo toàn chiều ngang.
- Label luôn hiển thị; không dùng placeholder thay label.
- Input hỗ trợ nhập số và thứ tự focus tự nhiên.
- Có focus state rõ cho input/button.
- Validation không chỉ dựa vào màu; có text mô tả lỗi.
- Kết quả và lỗi phải được công nghệ hỗ trợ đọc màn hình nhận biết khi thay đổi.
- Vùng bấm đủ lớn cho thao tác cảm ứng.
- Text và control có độ tương phản dễ đọc.

## 4. Không có screen riêng

Không thiết kế login, history, dashboard, profile, settings hoặc phép toán khác.
