# 15 — Development Plan: Student Calculator MVP

## 1. Nguyên tắc triển khai

- Tổ chức theo **vertical slice + dependency**, ưu tiên hoàn thành sớm luồng `nhập → validate → tính → lưu → hiển thị`.
- Backend giữ boundary `route → controller → use-case → repository`; frontend dùng local state.
- Decimal string xuyên API; backend tính bằng `BigInt`; chỉ trả `201` sau khi PostgreSQL ghi thành công.
- UI bám các state approved: `default`, `validation error`, `calculating`, `result`, `system error`.
- Không mở rộng ngoài MVP: login, history UI, microservice, analytics phức tạp.

## 2. Thứ tự triển khai

`DEV-01 → DEV-02 → DEV-03 → DEV-04 → DEV-05 → DEV-06 → DEV-07 → DEV-08 → DEV-09`

---

## DEV-01 — Application skeleton & quality gate

**Objective:** Tạo skeleton frontend/backend và baseline kiểm soát chất lượng.

**Input artifacts:** Architecture §2–4, §11–14; API Spec §1, §8.

**Files/modules dự kiến:**
- Backend: `src/app.ts`, `src/server.ts`, `src/modules/calculator/`, `src/platform/`
- Frontend: `src/app/App.tsx`, `src/features/calculator/`, `src/shared/`
- CI/package config

**Implementation scope:**
- Khởi tạo React + Node.js TypeScript theo cấu trúc approved.
- Thiết lập lint, typecheck, unit test, build.
- Base path `/api/v1`; cấu hình environment không hard-code secret.

**Acceptance criteria:**
- FE/BE start và build thành công.
- CI chạy lint → test → build.
- Module boundary đúng architecture.

**Required tests:** Smoke startup/build; CI pipeline check.

**Dependency:** Không.

**Definition of Done:** PR độc lập merge được; pipeline xanh; chưa chứa business logic.

---

## DEV-02 — Database migration & persistence adapter

**Objective:** Tạo persistence cho calculation thành công.

**Input artifacts:** PRD FR-05; User Story US-06; Database Design §1–7; Architecture §3, §5.

**Files/modules dự kiến:**
- DB migration `calculations`
- `calculation.model.ts`
- `calculation.repository.ts`
- PostgreSQL repository/DB config

**Implementation scope:**
- Tạo bảng `calculations` đúng schema approved.
- Implement repository INSERT.
- Connection pool; timestamp UTC.
- Không lưu calculation thất bại.

**Acceptance criteria:**
- Lưu đúng `operand_a`, `operand_b`, `result`, `created_at`.
- DB constraint chặn số âm/kết quả sai.
- Migration chạy được trên PostgreSQL sạch.

**Required tests:** Migration test; repository integration test; constraint test.

**Dependency:** DEV-01.

**Definition of Done:** Migration versioned; integration test xanh; repository không leak SQL/DB detail ra use-case.

---

## DEV-03 — Calculation domain & validation

**Objective:** Hoàn thiện logic validate và cộng chính xác.

**Input artifacts:** PRD FR-01–03, validation rules; US-01–03; API Spec §1–2; Database Design §2–3.

**Files/modules dự kiến:**
- `calculator.schema.ts`
- `calculate.use-case.ts`
- `calculation.model.ts`

**Implementation scope:**
- Validate `a`, `b`: required, chỉ `0-9`, tối đa 100 chữ số.
- Chấp nhận `0`, leading zero; normalize output.
- Tính bằng `BigInt`.
- Gọi repository chỉ khi input hợp lệ.

**Acceptance criteria:**
- `0 + 0` đúng.
- Số lớn trong cap tính chính xác.
- Missing/negative/decimal/text/over-cap bị từ chối.
- Không có DB write khi validation fail.

**Required tests:** Unit validation; BigInt addition; use-case success/failure.

**Dependency:** DEV-02.

**Definition of Done:** Business logic không nằm trong controller; unit tests bao phủ các contract case bắt buộc.

---

## DEV-04 — POST calculation API

**Objective:** Cung cấp API hoàn chỉnh cho vertical slice tính và lưu.

**Input artifacts:** PRD FR-03–06; US-03–06; API Spec §1–3, §5–7; Architecture §5–6.

**Files/modules dự kiến:**
- `calculator.route.ts`
- `calculator.controller.ts`
- error middleware/request-id
- `openapi.yaml`

**Implementation scope:**
- `POST /api/v1/calculations`.
- Success `201` theo response contract.
- `400 VALIDATION_ERROR`; `500/503` theo error envelope.
- Request ID header/body.
- Body limit và timeout theo spec.
- Chỉ success sau INSERT thành công.

**Acceptance criteria:**
- Response fields/type/status đúng API Spec.
- Persistence failure không trả success.
- Không trả stack trace/DB detail.
- `result` serialize thành string.

**Required tests:** API + PostgreSQL integration; contract tests toàn bộ case API Spec §8.

**Dependency:** DEV-03.

**Definition of Done:** Endpoint và OpenAPI đồng bộ; integration/contract tests xanh.

---

## DEV-05 — Calculator UI: input & client validation

**Objective:** Hoàn thành slice nhập liệu và validation trên UI approved.

**Input artifacts:** PRD FR-01–02; US-01–02; UI default/validation; Architecture §4; API Spec §2.

**Files/modules dự kiến:**
- `CalculatorPage.tsx`
- `CalculatorForm.tsx`
- `calculator.schema.ts`
- `calculator.types.ts`

**Implementation scope:**
- Hai input “Số thứ nhất”, “Số thứ hai”.
- Numeric keyboard mobile.
- Client validation đồng nhất API.
- Hiển thị field error trực tiếp dưới input.
- Bám layout/tokens UI approved.

**Acceptance criteria:**
- Không submit khi input invalid.
- Empty: `Vui lòng nhập số.`
- Invalid: `Vui lòng nhập số tự nhiên.`
- Default/error state khớp UI approved.

**Required tests:** Component tests cho valid, empty, invalid, 0, large input.

**Dependency:** DEV-01; contract từ DEV-03/04.

**Definition of Done:** Responsive; accessibility cơ bản; không chứa business calculation trong component.

---

## DEV-06 — End-to-end calculation success slice

**Objective:** Nối UI với API và hiển thị kết quả thành công.

**Input artifacts:** PRD FR-03–05; US-03, US-04, US-06; UI calculating/result; API Spec §1, §6; Architecture §5.

**Files/modules dự kiến:**
- `calculator.api.ts`
- `shared/api/http-client.ts`
- `CalculatorPage.tsx`
- `ResultPanel.tsx`

**Implementation scope:**
- Submit `POST /api/v1/calculations`.
- State `calculating`: “Đang tính...”, disable submit.
- State `result`: hiển thị `A + B = result`.
- Không tự retry POST.

**Acceptance criteria:**
- Happy path từ input đến persisted result hoạt động.
- Không double-submit khi request đang chạy.
- Result hiển thị đúng normalized operands và tổng.
- UI result đúng approved state.

**Required tests:** API client test; component state tests; E2E happy path.

**Dependency:** DEV-04, DEV-05.

**Definition of Done:** Vertical slice `input → API → DB → result` chạy xuyên suốt và có E2E test xanh.

---

## DEV-07 — System error & retry behavior

**Objective:** Đảm bảo lỗi không bị hiểu nhầm là calculation thành công.

**Input artifacts:** PRD FR-06, Error Scenarios; US-05; UI system error; API Spec §3, §6.

**Files/modules dự kiến:**
- `CalculatorPage.tsx`
- `calculator.api.ts`
- `ResultPanel.tsx`/error UI

**Implementation scope:**
- Xử lý `500/503/network error`.
- Giữ nguyên input.
- Không hiển thị result mới.
- Hiển thị “Không thể tính lúc này. Vui lòng thử lại.” và action “Thử lại”.

**Acceptance criteria:**
- Failure không thay thế bằng success state.
- Input không mất.
- Retry do người dùng chủ động.
- UI error đúng approved state.

**Required tests:** Component/API error tests; E2E persistence/server failure.

**Dependency:** DEV-06.

**Definition of Done:** Các error scenario MUST có automated test; không có silent failure.

---

## DEV-08 — Reset / next calculation

**Objective:** Hoàn thiện luồng tính phép tiếp theo.

**Input artifacts:** PRD FR-07; US-07; UI result; Architecture §4.

**Files/modules dự kiến:**
- `CalculatorPage.tsx`
- `CalculatorForm.tsx`
- `ResultPanel.tsx`

**Implementation scope:**
- Action “Tính phép khác”.
- Xóa input, validation, result, system error.
- Trở về default state.

**Acceptance criteria:**
- Reset không tạo API request.
- Màn hình sẵn sàng cho calculation mới.
- Không còn state của calculation trước.

**Required tests:** Component reset test; E2E calculate → reset → calculate again.

**Dependency:** DEV-06, DEV-07.

**Definition of Done:** US-07 đạt acceptance criteria và regression tests xanh.

---

## DEV-09 — Production readiness & release smoke

**Objective:** Đưa vertical slice hoàn chỉnh lên production theo architecture approved.

**Input artifacts:** PRD NFR/Acceptance Criteria; Architecture §7–12; API Spec §4–6; Database Design §6–8.

**Files/modules dự kiến:**
- `platform/config`, `logging`, `health`, `errors`
- `/health/live`, `/health/ready`
- Docker/deployment/CI-CD/IaC config
- Frontend production config

**Implementation scope:**
- Health live/ready; readiness kiểm tra DB.
- Structured logging + request ID; không log payload mặc định.
- Secret/config validation, security headers, CORS.
- Build/deploy backend ECS + frontend S3/CloudFront + migration.
- Smoke test health + calculation happy path.

**Acceptance criteria:**
- `/health/live` và `/health/ready` đúng contract.
- Production HTTPS; DB không public; secret không nằm trong source.
- Deploy chạy migration trước rollout cần schema.
- Production happy path lưu DB và hiển thị đúng kết quả.
- Error path không hiển thị success giả.

**Required tests:** Health integration; migration CI; production smoke/E2E; build/deploy verification.

**Dependency:** DEV-02, DEV-04, DEV-08.

**Definition of Done:** CI/CD xanh; production smoke xanh; toàn bộ MUST acceptance criteria của PRD đạt.

---

## 3. Release gate

MVP chỉ release khi:

1. `DEV-01` → `DEV-09` hoàn tất.
2. Unit, component, integration, contract, migration và E2E smoke đều xanh.
3. Happy path production: `nhập → tính → lưu → hiển thị`.
4. Validation/system failure không tạo success giả.
5. Không có thay đổi ngoài approved PRD, UI, Architecture, Database Design và API Specification.
