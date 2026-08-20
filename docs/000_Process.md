Tôi đang chuẩn bị xây dựng sản phẩm phần mềm học student-calculator. Chưa phải là phần mềm AI native. Coi là 1 sản phẩm phần mềm, hướng đến chục triệu người dùng.
Ý tưởng ban đầu là: 1 ứng dụng web, học sinh nhập vào 2 số tự nhiên, bấm nút calculate, hệ thống trả ra kết quả. Lưu số đã nhập, kết quả vào cơ sở dữ liệu postgres. Sau này có thể maintain, phát triển tiếp tính năng cho sản phẩm.

Hiện tại stack tôi đang sử dụng như sau: 
1, Công cụ hỗ trợ phân tích thiết kế Open AI. 
2, Công cụ code: Claude code AI. 
3, Công cụ thiết kế UI: Stitch
4, Stack công nghệ: VS code, macbook, Node JS, React JS, Postgres DB 
5, Tôi dev solo, sử dụng máy cá nhân, sau này sẽ deploy phần mềm lên Amazon AWS, git, cicd. 
6, Phần mềm có 1 web, 1 backend, 1 db postgres

Giúp tôi thiết kế cách thức, process sử dụng các công cụ AI trên, hệ thống các AI agent để thực hiện các việc từ ý tưởng trên đến khi thành sản phẩm golive, maintain và phát triển tiếp sản phẩm sau này.


Có tổng quan về cách thức và process.

Sau đó là hướng dẫn chi tiết từng bước, mỗi bước đều có: mục đích là gì, input là gì, output là gì, chi tiết prompt sử dụng nếu có, tôi phải kiểm tra output như thế nào, cách dùng chính công cụ AI để kiểm tra output.

Với các bước có prompt mà đầu ra là tài liệu, thì thêm nội dung là:
Trình bày bằng tiếng việt, thật ngắn gọn, không lặp ý, đầu ra là file ... để tôi tải về.

Tham khảo process dưới
#	Giai đoạn	Input	Output chính	Artifact bắt buộc lưu	AI chính
01	Idea clarification	Ý tưởng thô	Product Idea	01-product-idea.md	OpenAI ChatGPT
02	Problem discovery	Product Idea	Problem Definition	02-problem-definition.md	OpenAI ChatGPT
03	Product vision	Problem	Vision + Value Proposition	03-product-vision.md	OpenAI ChatGPT
04	Personas & Journey	Vision	Personas, JTBD, journeys	04-personas.md, 05-user-journeys.md	OpenAI ChatGPT
05	Feature discovery	Journeys	Feature Map	06-feature-map.md	OpenAI ChatGPT
06	MVP scope	Feature Map	MVP / Roadmap	07-mvp-scope.md	OpenAI ChatGPT
07	Requirement	MVP	PRD + User Stories	08-prd.md, 09-user-stories.md	OpenAI ChatGPT
08	UX design	PRD	Screen Map + UX Flow	10-screen-map.md, 11-ux-flow.md	OpenAI ChatGPT
09	UI design	UX Flow	Wireframe / UI	Stitch	Stitch
10	Technical design	PRD + UI	Architecture + DB + API	12-architecture.md, 13-database.md, 14-api-spec.md	OpenAI ChatGPT
11	Development plan	Technical design	Tasks / backlog	15-development-plan.md	OpenAI ChatGPT
12	Coding	Tasks + repo	Source code	Git commit / PR	Claude Code
13	Testing	PRD + code	Test cases + automated tests	16-test-plan.md + test code	Claude
14	Release	Tested build	Deployment + release	17-release-checklist.md	Claude






Cấu trúc case
student-calculator/
│
├── apps/
│   ├── web/
│   └── backend/
│
├── docs/
│   ├── product/
│   │   ├── 01-product-idea.md
│   │   ├── 02-problem-definition.md
│   │   ├── 03-product-vision.md
│   │   ├── 04-personas.md
│   │   ├── 05-user-journeys.md
│   │   ├── 06-feature-map.md
│   │   ├── 07-mvp-scope.md
│   │   ├── 08-prd.md
│   │   └── 09-user-stories.md
│   │
│   ├── ux/
│   │   ├── 10-screen-map.md
│   │   └── 11-ux-flow.md
│   │
│   ├── architecture/
│   │   ├── 12-architecture.md
│   │   ├── 13-database.md
│   │   ├── 14-api-spec.md
│   │   └── adr/
│   │
│   ├── development/
│   │   └── 15-development-plan.md
│   │
│   ├── testing/
│   │   └── 16-test-plan.md
│   │
│   └── release/
│       └── 17-release-checklist.md
│
├── infrastructure/
│
├── scripts/
│
├── .github/
│   └── workflows/
│
├── CLAUDE.md
├── README.md
└── package.json