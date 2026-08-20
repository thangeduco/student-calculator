# 05 — User Journeys

> Journey MVP bám đúng luồng chính của Product Vision: nhập → tính → nhận kết quả. Các tình huống lỗi dưới đây là yêu cầu UX cần kiểm chứng/thiết kế, không phải hành vi người dùng đã được research xác nhận.

| Giai đoạn | User action | System response | User expectation | Error situation |
|---|---|---|---|---|
| **Discover** | Biết/nhận ra có công cụ để kiểm tra phép cộng. | Cung cấp điểm truy cập vào ứng dụng. | Hiểu đây là công cụ kiểm tra kết quả, không phải công cụ dạy hoặc làm bài thay. | Không hiểu mục đích ứng dụng hoặc kỳ vọng chức năng ngoài phạm vi. |
| **Open application** | Mở ứng dụng. | Hiển thị giao diện tính toán tối giản, sẵn sàng nhập. | Có thể bắt đầu ngay, không cần thao tác thừa. | Tải lỗi, tải chậm hoặc giao diện không sẵn sàng. |
| **Input** | Nhập hai số tự nhiên. | Hiển thị rõ dữ liệu đã nhập; chỉ chấp nhận đầu vào hợp lệ. | Nhập nhanh, biết mình đã nhập đúng số. | Thiếu dữ liệu, nhập ký tự/giá trị không hợp lệ hoặc nhập nhầm. |
| **Calculate** | Chọn tính kết quả. | Thực hiện phép cộng và phản hồi nhanh. | Kết quả được tính chính xác, không phải chờ. | Không phản hồi, phản hồi chậm hoặc lỗi xử lý. |
| **View result** | Đọc và đối chiếu kết quả với bài tự làm. | Hiển thị kết quả rõ ràng, nhất quán. | Tin cậy kết quả để tự xác nhận phép tính. | Kết quả sai, khó đọc hoặc không rõ phép tính nào đang được hiển thị. |
| **Continue / Exit** | Nhập phép tính khác hoặc rời ứng dụng. | Cho phép bắt đầu phép tính mới nhanh chóng; không cản trở việc thoát. | Tiếp tục kiểm tra mà không phải thực hiện lại các bước không cần thiết. | Dữ liệu cũ gây nhầm lẫn hoặc không thể bắt đầu phép tính mới thuận tiện. |

## Luồng chính

**Discover → Open application → Input → Calculate → View result → Continue / Exit**

### Nguyên tắc UX chi phối journey
- **Correctness first:** kết quả chính xác là điều kiện bắt buộc.
- **Simple:** giảm tối đa bước và quyết định không cần thiết.
- **Fast:** kiểm tra phải nhanh hơn việc tự kiểm tra lại.
- **Reliable:** cùng một đầu vào phải tạo hành vi và kết quả nhất quán.

## Điểm cần research sau MVP

- Học sinh tìm đến công cụ bằng cách nào.
- Thiết bị và bối cảnh sử dụng thực tế.
- Lỗi nhập liệu phổ biến.
- Cách trình bày kết quả dễ hiểu nhất với học sinh lớp 4.
- Hành vi sau khi đối chiếu kết quả: tính tiếp, sửa bài hay thoát.
