# 09 — User Stories: Student Calculator MVP

| Story ID | User Story | Priority |
|---|---|---|
| US-01 | Là học sinh, tôi muốn nhập hai số để kiểm tra phép cộng của mình. | MUST |
| US-02 | Là học sinh, tôi muốn được báo khi dữ liệu nhập không hợp lệ để sửa trước khi tính. | MUST |
| US-03 | Là học sinh, tôi muốn nhận kết quả cộng chính xác để đối chiếu với bài tự làm. | MUST |
| US-04 | Là học sinh, tôi muốn thấy phép tính cùng kết quả để biết mình đang đối chiếu đúng dữ liệu. | MUST |
| US-05 | Là người dùng, tôi muốn được báo khi phép tính không thể hoàn thành để không hiểu nhầm kết quả. | MUST |
| US-06 | Là người vận hành sản phẩm, tôi muốn phép tính thành công được ghi nhận để xác nhận luồng sản phẩm hoàn chỉnh. | MUST |
| US-07 | Là học sinh, tôi muốn reset để kiểm tra phép tính tiếp theo nhanh chóng. | SHOULD |

## Acceptance Criteria

### US-01 — Nhập hai số
**Given** màn hình tính toán đã sẵn sàng  
**When** người dùng nhập hai số tự nhiên  
**Then** hệ thống ghi nhận đúng hai giá trị để sẵn sàng tính.

### US-02 — Validate đầu vào
**Given** một hoặc cả hai đầu vào bị thiếu hoặc không phải số tự nhiên  
**When** người dùng yêu cầu tính  
**Then** hệ thống không thực hiện phép tính và hiển thị thông báo lỗi phù hợp.

### US-03 — Tính chính xác
**Given** cả hai đầu vào là số tự nhiên hợp lệ  
**When** người dùng yêu cầu tính  
**Then** hệ thống trả kết quả bằng tổng chính xác của hai số.

### US-04 — Hiển thị kết quả
**Given** phép tính hoàn thành thành công  
**When** kết quả được trả về  
**Then** hệ thống hiển thị hai đầu vào và kết quả tương ứng rõ ràng.

### US-05 — Xử lý lỗi
**Given** hai đầu vào hợp lệ  
**When** hệ thống không thể hoàn thành phép tính  
**Then** hệ thống hiển thị thông báo lỗi và không hiển thị kết quả mới như một phép tính thành công.

### US-06 — Ghi nhận phép tính
**Given** một phép tính hoàn thành thành công  
**When** giao dịch được ghi nhận  
**Then** bản ghi chứa đúng hai đầu vào, kết quả và thời điểm thực hiện.

### US-07 — Reset
**Given** màn hình đang có dữ liệu hoặc kết quả  
**When** người dùng chọn reset  
**Then** dữ liệu của phép tính hiện tại được xóa và màn hình sẵn sàng cho phép tính mới.
