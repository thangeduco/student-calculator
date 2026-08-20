# Student Calculator

Web application where a student enters two natural numbers, receives their sum, and has the
calculation persisted. See `docs/` for the approved product, UX, architecture and planning
artifacts.

**Current state:** application skeleton and quality gate (DEV-01). The calculator feature itself —
input handling, validation, addition, persistence and the API endpoint — is delivered by DEV-02 and
later tasks in `docs/development/15-development-plan.md`.

## Stack

| Part     | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite 7, TypeScript (strict)      |
| Backend  | Node.js 22, Express 5, TypeScript (strict) |
| Database | PostgreSQL (introduced in DEV-02)          |
| Tests    | Vitest                                     |
| CI       | GitHub Actions                             |

## Prerequisites

- Node.js 22 LTS (`.nvmrc` pins the major; run `nvm use`)
- npm 10 or newer

## Setup

```bash
npm ci
cp backend/.env.example backend/.env   # optional; defaults work for local development
```

Dependencies are managed from the repository root via npm workspaces. Do not run `npm install`
inside `frontend/` or `backend/`.

## Running locally

```bash
npm run dev:backend    # http://localhost:3000  (API base path /api/v1)
npm run dev:frontend   # http://localhost:5173
```

The backend currently exposes no routes: the versioned `/api/v1` base path is mounted, and any
request under it returns `404` until DEV-04 adds the calculator endpoint.

## Quality gate

```bash
npm run lint         # ESLint + Prettier check
npm run typecheck    # TypeScript, both workspaces
npm test             # Vitest, both workspaces
npm run build        # build both workspaces
npm run verify       # all of the above, in order
```

`npm run verify` is the gate that must pass before a pull request. CI
(`.github/workflows/ci.yml`) runs the same steps: `npm ci` → lint → typecheck → test → build.

## Layout

```text
frontend/            React web client
  src/app/           application shell
backend/             Express API
  src/app.ts         application assembly (never binds a port)
  src/server.ts      process entry (the only module that listens)
  src/platform/      config, and later db / logging / errors / health
database/            migrations and schema assets (DEV-02+)
docs/                approved artifacts
```

## Configuration

Configuration is read from the environment and validated at startup; the process exits non-zero
when a value is invalid. `.env` files are git-ignored and must never contain production values;
`backend/.env.example` documents the variable names.

| Variable   | Default       | Purpose                                 |
| ---------- | ------------- | --------------------------------------- |
| `NODE_ENV` | `development` | `development` \| `test` \| `production` |
| `PORT`     | `3000`        | backend HTTP port                       |

## Contributing

Read `CLAUDE.md` for the engineering rules: directory layout, coding conventions, dependency
rules, scope control and the Definition of Done.
