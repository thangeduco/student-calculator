# 06 — Feature Map

> Chỉ đưa vào các feature được suy ra trực tiếp từ User Journey MVP. Không mở rộng theo thông lệ của sản phẩm calculator khác.

| User need | Feature | Business/Product value | Priority | Dependency | MVP / Later |
|---|---|---|---|---|---|
| Hiểu ngay công cụ dùng để làm gì | Mô tả ngắn mục đích: kiểm tra phép cộng | Giảm kỳ vọng sai về sản phẩm | P1 | Không | MVP |
| Bắt đầu kiểm tra ngay | Màn hình tính toán tối giản, sẵn sàng nhập | Tăng tỷ lệ vào được luồng chính | P0 | Ứng dụng tải thành công | MVP |
| Nhập hai số nhanh và rõ | Hai trường nhập số tự nhiên | Cho phép thực hiện tác vụ cốt lõi | P0 | Màn hình tính toán | MVP |
| Biết dữ liệu nhập có hợp lệ | Kiểm tra đầu vào và thông báo lỗi | Giảm lỗi tính do dữ liệu không hợp lệ | P0 | Trường nhập | MVP |
| Yêu cầu hệ thống tính sau khi nhập | Nút **Tính** | Tạo hành động rõ ràng để thực hiện phép cộng | P0 | Hai đầu vào hợp lệ | MVP |
| Nhận kết quả đúng và nhanh | Logic cộng hai số tự nhiên | Cung cấp giá trị cốt lõi của sản phẩm | P0 | Đầu vào hợp lệ | MVP |
| Đối chiếu kết quả dễ dàng | Hiển thị rõ phép tính và kết quả | Tăng khả năng hiểu và độ tin cậy | P0 | Logic tính toán | MVP |
| Biết khi hệ thống không thể xử lý | Trạng thái/thông báo lỗi tính toán | Tránh im lặng hoặc gây hiểu nhầm | P1 | Luồng tính toán | MVP |
| Kiểm tra phép tính tiếp theo nhanh | Xóa/reset dữ liệu để nhập phép tính mới | Hỗ trợ sử dụng liên tiếp, giảm thao tác thừa | P1 | Luồng kết quả | MVP |

## Later

Chưa có feature **Later** cụ thể. Journey xác định các điểm cần research về cách discover, thiết bị, lỗi nhập, cách trình bày kết quả và hành vi sau đối chiếu; chỉ bổ sung feature khi có bằng chứng nhu cầu.

## Chuỗi dependency cốt lõi

**Open → Input → Validate → Calculate → View result → Reset/Continue**
