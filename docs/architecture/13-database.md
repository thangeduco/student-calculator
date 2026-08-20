# 13 — Database Design: Student Calculator

## 1. Database scope

MVP chỉ cần lưu mỗi phép tính thành công: hai đầu vào, kết quả, thời điểm.

## 2. Schema

```sql
CREATE TABLE calculations (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operand_a    NUMERIC(100, 0) NOT NULL,
    operand_b    NUMERIC(100, 0) NOT NULL,
    result       NUMERIC(101, 0) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT calculations_operand_a_natural CHECK (operand_a >= 0),
    CONSTRAINT calculations_operand_b_natural CHECK (operand_b >= 0),
    CONSTRAINT calculations_result_valid CHECK (result = operand_a + operand_b)
);
```

`100` chữ số là safety cap kỹ thuật để chặn input vô hạn, không phải business rule. Có thể đổi bằng migration khi product xác định giới hạn chính thức.

## 3. Data rules

- `0` được coi là số tự nhiên.
- Chỉ INSERT sau khi request hợp lệ.
- Không lưu calculation thất bại.
- DB constraint bảo vệ invariant cuối cùng: `result = operand_a + operand_b`.
- Dùng `TIMESTAMPTZ`; app và DB xử lý timestamp theo UTC.

## 4. Indexing

MVP chỉ cần primary key.

Không index `created_at` cho tới khi có query history/analytics thực tế. Nếu sau này cần quét theo thời gian:

```sql
CREATE INDEX idx_calculations_created_at
ON calculations (created_at DESC);
```

## 5. Transaction

Một phép tính thành công tương ứng một `INSERT`; statement atomic đã đủ.

Không cần distributed transaction, outbox hoặc event sourcing.

## 6. Connection management

- Dùng connection pool nhỏ trên mỗi ECS task.
- Tổng pool của mọi task phải thấp hơn giới hạn RDS.
- Không mở connection theo từng request.
- Chỉ thêm RDS Proxy khi số instance/connection trở thành bottleneck.

## 7. Migration

- Dùng một migration tool duy nhất: ví dụ `node-pg-migrate`, `Knex migration` hoặc ORM migration đang chọn.
- Migration được version trong Git.
- CI kiểm tra migration trên PostgreSQL sạch.
- Production deploy chạy migration một lần trước khi rollout app cần schema mới.
- Schema change phải backward-compatible khi rolling deployment có thể chạy song song hai version.

## 8. Backup & durability

Production RDS:
- Automated backup + point-in-time recovery.
- Encryption at rest bằng KMS.
- Không public access.
- Multi-AZ bật khi yêu cầu availability/traffic biện minh chi phí.

## 9. Growth path

Hàng chục triệu users không đồng nghĩa cần partition ngay. Bảng này append-only và record nhỏ.

Thứ tự scale:
1. đo row count/storage/query latency;
2. tune query/index;
3. scale RDS;
4. archive dữ liệu cũ nếu có retention policy;
5. partition theo thời gian chỉ khi table/index maintenance hoặc query pattern yêu cầu.

Không shard database ở MVP.
