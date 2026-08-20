# 12 — Technical Architecture: Student Calculator

## 1. Context architecture

```text
Student Browser
   |
   | HTTPS
   v
CloudFront
   |-----------------> S3 (React static assets)
   |
   v
ALB
   v
Node.js API (ECS Fargate, stateless)
   v
RDS PostgreSQL

GitHub -> GitHub Actions -> ECR -> ECS
                         \-> S3/CloudFront
```

**Style:** modular monolith. Một frontend, một backend deployable, một PostgreSQL.

## 2. Component architecture

```text
React App
  ├─ Calculator UI
  ├─ Client validation
  └─ API client
        |
        v
Node.js API
  ├─ HTTP/API layer
  ├─ Calculator module
  ├─ Persistence module
  └─ Platform: config, logging, health
        |
        v
PostgreSQL
```

Backend là stateless; mọi instance có thể xử lý mọi request.

## 3. Backend modules

```text
src/
  app.ts
  server.ts
  modules/
    calculator/
      calculator.route.ts
      calculator.controller.ts
      calculate.use-case.ts
      calculation.repository.ts
      calculation.model.ts
      calculator.schema.ts
  platform/
    db/
    config/
    logging/
    errors/
    health/
```

Quy tắc dependency: `route -> controller -> use-case -> repository interface -> PostgreSQL adapter`.

Không tạo generic framework nội bộ khi chỉ có một use case.

## 4. Frontend architecture

```text
src/
  app/
    App.tsx
  features/calculator/
    CalculatorPage.tsx
    CalculatorForm.tsx
    ResultPanel.tsx
    calculator.api.ts
    calculator.schema.ts
    calculator.types.ts
  shared/
    api/http-client.ts
    config.ts
    components/
```

- Một page, state cục bộ; chưa cần Redux/global state.
- Client validation để phản hồi nhanh; backend luôn validate lại.
- API payload giữ số dưới dạng chuỗi thập phân để tránh sai số JavaScript.
- UI có các state: default, validation error, calculating, result, system error.

## 5. Request flow

```text
1. User nhập A, B.
2. Frontend validate cú pháp.
3. POST /api/v1/calculations.
4. API validate lại.
5. Use case tính sum bằng BigInt.
6. INSERT calculation trong PostgreSQL.
7. Chỉ sau INSERT thành công mới trả 201.
8. Frontend hiển thị A + B = sum.
```

Nếu tính hoặc lưu thất bại: trả lỗi; frontend giữ input và không hiển thị kết quả mới.

## 6. Error model

Một envelope duy nhất:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ.",
    "fields": { "a": "Vui lòng nhập số tự nhiên." },
    "requestId": "..."
  }
}
```

Nhóm lỗi:
- `VALIDATION_ERROR` -> 400.
- `NOT_FOUND` -> 404 khi có resource API tương lai.
- `RATE_LIMITED` -> 429.
- `INTERNAL_ERROR` -> 500.
- `SERVICE_UNAVAILABLE` -> 503.

Không trả stack trace hoặc chi tiết DB cho client.

## 7. Logging & observability

Structured JSON log tới stdout:

```text
level, timestamp, service, environment, requestId,
method, path, statusCode, durationMs, errorCode
```

Không log toàn bộ payload mặc định.

MVP metrics:
- request count / error rate / latency.
- calculation success/failure.
- DB connection/error.
- ECS CPU/memory.

AWS CloudWatch Logs + Metrics + Alarm. Health endpoints:
- `GET /health/live`: process sống.
- `GET /health/ready`: app sẵn sàng phục vụ và DB reachable.

## 8. Configuration & secrets

- Local: `.env`, file không commit.
- Production non-secret: ECS task environment variables.
- Secrets: AWS Secrets Manager.
- Validate config khi startup; thiếu config bắt buộc thì fail fast.
- Không hard-code credential, DB URL, environment-specific host.

## 9. Scalability strategy

### MVP
- 1 ECS service, 1–2 tasks.
- RDS PostgreSQL single writer.
- CloudFront cache static frontend.

### Khi traffic tăng
1. ECS horizontal auto scaling theo CPU/request count.
2. Tune connection pool; dùng RDS Proxy nếu connection pressure xuất hiện.
3. RDS scale-up rồi Multi-AZ/read replica khi có nhu cầu thực.
4. Rate limiting/WAF khi public traffic lớn hoặc abuse tăng.
5. Cache chỉ khi xuất hiện read workload đáng kể.
6. Tách service chỉ khi có ranh giới domain, scale profile hoặc ownership độc lập.

Backend stateless nên scale-out không đổi contract.

## 10. Security baseline

- HTTPS only; TLS terminate tại CloudFront/ALB.
- Security Group: DB chỉ nhận kết nối từ API.
- RDS không public.
- IAM least privilege cho ECS task và CI/CD.
- Validate schema + giới hạn request body.
- Natural number chỉ nhận chữ số decimal; safety cap kỹ thuật về độ dài input.
- Parameterized SQL/ORM; không nối chuỗi SQL.
- CORS allowlist theo production origin.
- Security headers cho frontend/API.
- Dependency scanning, lockfile, secret scanning trong CI.
- Không có authentication vì ngoài scope MVP; thêm ở boundary API khi có user identity.

## 11. Deployment architecture AWS

```text
Route 53
   |
CloudFront
   |-- /        -> S3 private bucket (React build)
   \-- /api/*   -> ALB -> ECS Fargate -> RDS PostgreSQL

ECR stores backend image.
Secrets Manager stores DB secret.
CloudWatch stores logs/metrics/alarms.
```

Khuyến nghị môi trường: `dev` local, `prod` AWS; thêm `staging` khi release risk bắt đầu đáng kể.

CI/CD GitHub Actions:

```text
PR: lint -> unit test -> build -> integration test
main: repeat checks -> build image -> push ECR
      -> run DB migration -> deploy ECS
      -> build frontend -> upload S3 -> CloudFront invalidation
      -> smoke test /health + calculation happy path
```

Infrastructure nên quản lý bằng Terraform hoặc AWS CDK; chọn một, không dùng song song.

## 12. Testing baseline

- Unit: validation, BigInt addition, use case.
- Integration: API + PostgreSQL test DB.
- Frontend component: validation/states.
- E2E smoke: nhập A/B -> tính -> thấy kết quả.
- Migration test trong CI.

Ưu tiên test business behavior hơn test implementation detail.

## 13. Key architecture decisions / trade-offs

| Decision | Chọn | Trade-off |
|---|---|---|
| Architecture | Modular monolith | Đơn giản deploy; vẫn giữ module boundary |
| Backend compute | ECS Fargate | Nhiều config hơn Lambda, nhưng runtime/pooling predictable |
| Frontend hosting | S3 + CloudFront | Rẻ, đơn giản, scale tốt; không SSR |
| Database | RDS PostgreSQL | Managed và reliable; chi phí cao hơn DB local/self-host |
| Number transport | Decimal string | Tránh JS precision; contract kém “numeric” hơn |
| Arithmetic | Node.js BigInt | Chính xác cho integer; cần serialize thành string |
| State management | Local React state | Đủ MVP; đổi khi state cross-feature xuất hiện |
| API style | REST JSON | Dễ debug/test; chưa cần GraphQL |
| Service split | Không microservice | Giảm operational overhead; tách sau khi có lý do đo được |
| Async/event bus | Không | Transaction đồng bộ đủ cho yêu cầu hiện tại |

## 14. Architecture guardrails

- Không business logic trong controller/component UI.
- Không truy cập DB trực tiếp từ route.
- Không shared mutable state trong backend process.
- Mọi schema change qua migration.
- API version dưới `/api/v1`.
- Optimize theo metric thực tế; không thiết kế trước cho distributed complexity.
