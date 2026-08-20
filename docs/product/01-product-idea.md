# Student Calculator — Product Idea

## 1. Product Concept

**Student Calculator** là web application giúp học sinh lớp 4 kiểm tra kết quả phép cộng hai số tự nhiên.

Luồng cơ bản:

**Nhập 2 số → Calculate → Backend tính tổng → Hiển thị kết quả → Lưu phép tính vào PostgreSQL.**

Định hướng kỹ thuật: sản phẩm ban đầu nhỏ, nhưng kiến trúc cần dễ maintain, mở rộng và có khả năng tiến tới quy mô hàng chục triệu người dùng.

## 2. Target Users

**Người dùng chính:** Học sinh lớp 4 đang học và luyện tập phép cộng số tự nhiên.

Nhu cầu: tự kiểm tra nhanh kết quả phép tính đã thực hiện.

## 3. Core Use Case

**UC01 — Kiểm tra phép cộng**

1. Học sinh nhập số tự nhiên A.
2. Nhập số tự nhiên B.
3. Nhấn **Calculate**.
4. Backend tính `A + B`.
5. Hệ thống trả kết quả.
6. Frontend hiển thị kết quả.
7. Hệ thống lưu A, B và kết quả vào PostgreSQL.

## 4. User Value

* Kiểm tra kết quả phép cộng nhanh chóng.
* Giúp học sinh tự đối chiếu bài làm.
* Giảm phụ thuộc vào người khác khi cần kiểm tra kết quả.

## 5. Business / Product Assumptions

* Học sinh có nhu cầu kiểm tra kết quả phép tính.
* Phép cộng hai số tự nhiên đủ để kiểm chứng mô hình sản phẩm ban đầu.
* Web application phù hợp để triển khai MVP.
* Việc lưu lịch sử phép tính có giá trị cho phát triển sản phẩm sau này.
* Kiến trúc ban đầu cần tránh tạo technical debt cản trở mở rộng.

## 6. Constraints

* Frontend: **React**.
* Backend: **Node.js**.
* Database: **PostgreSQL**.
* MVP chỉ xử lý **phép cộng hai số tự nhiên**.
* Backend chịu trách nhiệm tính toán.
* Input và result phải được lưu database.
* Thiết kế phải ưu tiên maintainability và khả năng mở rộng dài hạn.

## 7. Ngoài phạm vi MVP

Chưa bao gồm:

* Các phép tính khác ngoài phép cộng.
* Số âm, số thập phân, phân số.
* Bài tập hoặc ngân hàng câu hỏi.
* Chấm điểm học sinh.
* Phân tích năng lực học tập.
* Gamification.
* Cá nhân hóa học tập.
* Các tính năng giáo viên/phụ huynh.

## 8. Success Criteria

MVP thành công khi:

* Người dùng nhập được chính xác 2 số tự nhiên.
* Hệ thống trả đúng kết quả phép cộng.
* Kết quả được hiển thị rõ ràng.
* Dữ liệu phép tính được lưu chính xác vào PostgreSQL.
* Luồng **Input → Calculate → Result** hoạt động ổn định.
* Codebase đủ rõ ràng để tiếp tục maintain và mở rộng.

## 9. Câu hỏi / Giả định cần xác minh

1. Khoảng giá trị tối đa của số tự nhiên được nhập là bao nhiêu?
2. Có cho phép nhập `0` không?
3. Khi input rỗng, sai định dạng hoặc vượt giới hạn thì xử lý thế nào?
4. Có cần xác định danh tính học sinh hay MVP cho phép sử dụng ẩn danh?
5. Mục đích cụ thể của việc lưu lịch sử phép tính là gì?
6. Có yêu cầu về thời gian phản hồi của phép tính không?
7. "Hàng chục triệu người dùng" là tổng số người dùng hay số người dùng đồng thời?
8. Tiêu chí nào xác nhận học sinh thực sự nhận được giá trị từ sản phẩm, ngoài việc hệ thống hoạt động đúng?
