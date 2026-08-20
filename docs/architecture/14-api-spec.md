# 14 — API Spec: Student Calculator

Base path: `/api/v1`

Content type: `application/json`

Số tự nhiên được truyền dưới dạng **decimal string** để không phụ thuộc giới hạn precision của JavaScript.

## 1. Create calculation

### `POST /api/v1/calculations`

Request:

```json
{
  "a": "12",
  "b": "30"
}
```

Validation:
- `a`, `b` bắt buộc.
- Chỉ gồm chữ số `0-9`.
- Không dấu âm, dấu `+`, decimal, exponent hoặc whitespace nội bộ.
- Leading zero được chấp nhận; backend normalize khi trả response.
- Tối đa 100 chữ số mỗi operand như safety cap kỹ thuật.

Success — `201 Created`:

```json
{
  "data": {
    "id": "12345",
    "a": "12",
    "b": "30",
    "result": "42",
    "createdAt": "2026-08-19T10:30:00.000Z"
  },
  "requestId": "01K..."
}
```

Chỉ trả `201` sau khi calculation đã được ghi vào PostgreSQL.

## 2. Validation error

`400 Bad Request`

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ.",
    "fields": {
      "a": "Vui lòng nhập số tự nhiên."
    },
    "requestId": "01K..."
  }
}
```

Field messages dùng cho UI:
- empty: `Vui lòng nhập số.`
- invalid natural number: `Vui lòng nhập số tự nhiên.`

## 3. Server error

`500 Internal Server Error` hoặc `503 Service Unavailable`

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Không thể tính lúc này. Vui lòng thử lại.",
    "requestId": "01K..."
  }
}
```

Client phải giữ input và không hiển thị result mới.

## 4. Health APIs

### `GET /health/live`

`200 OK`

```json
{ "status": "ok" }
```

Không kiểm tra dependency.

### `GET /health/ready`

`200 OK` khi app và DB sẵn sàng; ngược lại `503`.

```json
{ "status": "ready" }
```

## 5. Common headers

Request:

```text
Content-Type: application/json
X-Request-Id: optional client-generated id
```

Response:

```text
Content-Type: application/json
X-Request-Id: server request id
```

Nếu client không gửi request ID, server sinh mới.

## 6. HTTP behavior

- Request body limit nhỏ, ví dụ `4 KB`.
- Timeout application/database rõ ràng.
- Không retry POST tự động ở server.
- Frontend disable submit khi request đang chạy để giảm duplicate request.
- API hiện chưa cam kết idempotency/exactly-once; nếu retry sau timeout, có thể tạo record thứ hai. Chỉ thêm `Idempotency-Key` khi yêu cầu nghiệp vụ xuất hiện.

## 7. API compatibility

- Breaking change tạo version mới, ví dụ `/api/v2`.
- Có thể thêm optional response fields trong v1.
- Không đổi meaning/type của field hiện hữu trong cùng version.

## 8. OpenAPI source of truth

Nên duy trì `openapi.yaml` sinh từ/đồng bộ với validation schema của backend.

Contract test tối thiểu:
- valid `0 + 0`.
- valid số lớn trong technical cap.
- missing operand.
- negative/decimal/text input.
- persistence failure không trả success.
- response `result` chính xác và được serialize thành string.
