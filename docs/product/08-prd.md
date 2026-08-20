# 08 — PRD: Student Calculator MVP

## 1. Objective
Cho phép học sinh nhập hai số tự nhiên, nhận đúng kết quả phép cộng và hoàn thành luồng kiểm tra trên môi trường production.

## 2. Scope
### MUST
- Nhập hai số tự nhiên.
- Kiểm tra tính hợp lệ của đầu vào.
- Thực hiện phép cộng.
- Hiển thị phép tính và kết quả.
- Ghi nhận mỗi phép tính gồm hai đầu vào, kết quả và thời điểm.
- Thông báo khi không thể hoàn thành phép tính.

### SHOULD
- Reset để thực hiện phép tính tiếp theo.
- Mô tả ngắn mục đích ứng dụng.
- Có khả năng xác nhận dịch vụ đang hoạt động.
- Ghi nhận lỗi phục vụ chẩn đoán.

## 3. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Hệ thống cho phép nhập đúng hai giá trị. |
| FR-02 | Hệ thống chỉ cho phép tính khi cả hai đầu vào hợp lệ. |
| FR-03 | Khi người dùng yêu cầu tính, hệ thống trả tổng của hai số đã nhập. |
| FR-04 | Kết quả hiển thị kèm hai giá trị đầu vào để người dùng đối chiếu. |
| FR-05 | Mỗi phép tính thành công được ghi nhận gồm hai đầu vào, kết quả và thời điểm. |
| FR-06 | Khi phép tính không hoàn thành, hệ thống hiển thị lỗi và không hiển thị kết quả mới như thể thành công. |
| FR-07 | Người dùng có thể reset dữ liệu để thực hiện phép tính tiếp theo. |

## 4. Validation Rules
- Cả hai trường đều bắt buộc.
- Mỗi đầu vào phải là số tự nhiên.
- Không thực hiện phép tính nếu có đầu vào không hợp lệ.
- Thông báo lỗi phải gắn với tình trạng cần sửa.

> Giới hạn giá trị/độ dài cụ thể chưa thuộc MUST nên chưa quy định.

## 5. Error Scenarios

| Scenario | Expected behavior |
|---|---|
| Thiếu một hoặc cả hai đầu vào | Không tính; thông báo dữ liệu bắt buộc. |
| Đầu vào không phải số tự nhiên | Không tính; thông báo đầu vào không hợp lệ. |
| Không thể hoàn thành yêu cầu tính | Không hiển thị kết quả mới; thông báo thử lại. |
| Không thể ghi nhận phép tính | Không báo phép tính đã hoàn thành thành công. |

## 6. Non-functional Requirements
- **Correctness:** Với mọi đầu vào hợp lệ trong phạm vi hỗ trợ, kết quả phải bằng tổng toán học của hai số.
- **Simplicity:** Luồng chính chỉ yêu cầu nhập hai số và yêu cầu tính.
- **Reliability:** Cùng một cặp đầu vào hợp lệ luôn cho cùng một kết quả.
- **Maintainability:** Các trách nhiệm giao diện, xử lý nghiệp vụ và lưu trữ phải có ranh giới rõ ràng.
- **Production readiness:** Luồng chính và xử lý lỗi cơ bản phải hoạt động trên production.

## 7. Acceptance Criteria
MVP được chấp nhận khi:
1. Người dùng nhập được hai số tự nhiên hợp lệ.
2. Hệ thống từ chối đầu vào không hợp lệ.
3. Kết quả phép cộng luôn chính xác với các test case trong phạm vi hỗ trợ.
4. Phép tính thành công hiển thị rõ hai đầu vào và kết quả.
5. Mỗi phép tính thành công được ghi nhận đủ hai đầu vào, kết quả và thời điểm.
6. Lỗi xử lý không bị hiển thị như một phép tính thành công.
7. Toàn bộ luồng trên hoạt động trên production.

## 8. Out of Scope
- Login / user management.
- AI.
- Microservices.
- Kubernetes.
- Event-driven architecture.
- Complex analytics/dashboard.
- Cá nhân hóa, gamification.
- Lịch sử phép tính cho người dùng.
- Phép toán ngoài cộng hai số tự nhiên.
