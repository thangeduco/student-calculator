# CLAUDE.md — Engineering rules

Approved artifacts in `docs/` are the source of truth. This file records how to work in the
repository; it does not redefine product, architecture, API or database decisions.

Claude MUST:

- read PRD before implementation;
- read relevant architecture docs;
- implement only requested task;
- preserve existing behavior;
- add/update tests;
- run lint/test/build.

Claude MUST NOT:

- invent requirements;
- silently change API;
- silently change database schema;
- add dependencies without justification;
- refactor unrelated modules.

## Project purpose

Web application where a student enters two natural numbers, receives their sum, and has the
calculation persisted in PostgreSQL. See `docs/product/07-mvp-scope.md` and
`docs/product/08-prd.md`.

## Directory rules

```text
frontend/    React + Vite web client
backend/     Express API
database/    database migrations and schema assets (owned by DEV-02+)
docs/        approved product, UX, architecture and planning artifacts
```

- Top-level layout is fixed. Do not introduce `apps/web` or `apps/backend`.
- `frontend` and `backend` are npm workspaces. Dependencies are installed from the repository root.

Backend structure (`docs/architecture/12-architecture.md` §3):

```text
backend/src/
  app.ts                     application assembly only; never binds a port
  server.ts                  process entry; the only module that listens
  modules/<module>/          <module>.route.ts, <module>.controller.ts,
                             <use-case>.use-case.ts, <entity>.repository.ts,
                             <entity>.model.ts, <module>.schema.ts
  platform/                  config, db, logging, errors, health
```

Frontend structure (§4):

```text
frontend/src/
  app/                       application shell
  features/<feature>/        feature components, api client, schema, types
  shared/                    cross-feature api client, config, components
```

- Create a directory only when a task actually places code in it.

## Coding conventions

- TypeScript everywhere, `strict` enabled. Do not weaken compiler options to make code compile.
- No `any`; model the type instead.
- ESLint and Prettier decide style. Do not hand-format against Prettier.
- Backend uses ESM; relative imports inside `backend/src` carry the `.js` extension.
- Named exports; default exports only where a framework requires them.
- Comments explain why, not what.
- Vietnamese user-facing strings come from the approved artifacts verbatim. Do not invent copy.

## Architecture rules

- Dependency direction: `route -> controller -> use-case -> repository interface -> adapter`.
  Dependencies point inward only.
- No business logic in controllers or in React components.
- No direct database access from a route.
- No shared mutable state in the backend process; the backend stays stateless.
- Every schema change goes through a migration.
- Do not build an internal generic framework for a single use case.

## API conventions

- All routes live under `/api/v1` (`docs/architecture/14-api-spec.md`).
- `application/json` request and response bodies.
- Natural numbers cross the API as decimal strings.
- One error envelope: `{ "error": { "code", "message", "fields?", "requestId" } }`.
- Never return a stack trace or database detail to a client.
- Breaking changes require a new version path, never a redefinition of an existing field.

## DB conventions

- PostgreSQL only; parameterized statements, never string-concatenated SQL.
- Timestamps are `TIMESTAMPTZ` handled as UTC.
- Repositories own SQL; SQL and driver types must not leak into a use case.
- Only successful calculations are persisted.

## Testing requirements

- Vitest is the test runner for both workspaces.
- Tests live beside the code under test as `*.test.ts` / `*.test.tsx`.
- Test observable behaviour, not implementation detail.
- Every task adds the tests named in its Development Plan entry.

## Security constraints

- No secret, credential, connection string or environment-specific host in source.
- Configuration comes from the environment and is validated at startup; fail fast when invalid.
- `.env` is git-ignored. `.env.example` documents variable names only.
- The lockfile is committed and installs in CI use `npm ci`.

## Commands

Run from the repository root.

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm ci`               | reproducible install from the lockfile                   |
| `npm run lint`         | ESLint + Prettier check                                  |
| `npm run lint:fix`     | apply ESLint and Prettier fixes                          |
| `npm run typecheck`    | TypeScript check, both workspaces                        |
| `npm test`             | Vitest, both workspaces                                  |
| `npm run build`        | build both workspaces                                    |
| `npm run verify`       | full local quality gate: lint → typecheck → test → build |
| `npm run dev:backend`  | start the backend in watch mode                          |
| `npm run dev:frontend` | start the Vite dev server                                |

## Dependency rules

- Prefer the standard library and what is already installed.
- Every new dependency needs a stated purpose and a reason the current set is insufficient.
- A runtime dependency requires a need traceable to an approved artifact.
- One lockfile at the repository root; no second package manager.
- Do not add a dependency for functionality owned by a later task.

## Scope control rules

- Implement exactly one Development Plan task at a time; do not borrow work from a later task.
- `docs/development/15-development-plan.md` assigns ownership. If work seems to require another
  task's scope, stop and report instead of implementing it.
- If an approved artifact is missing a decision, stop and ask. Do not decide product,
  architecture, API, database, security or infrastructure questions unilaterally.
- Never edit approved artifacts in `docs/` as part of a coding task.

## Definition of Done

1. Only the requested task is implemented; no later-task scope leaked in.
2. Existing behaviour is preserved.
3. Tests required by the task exist and pass.
4. `npm run verify` passes locally.
5. No secret, credential or hard-coded host was introduced.
6. Approved API and database contracts are unchanged unless the task owns the change.
7. Changes are reported honestly, including anything skipped or left unverified.

## Forbidden actions

- Committing, pushing, merging or switching branches unless explicitly asked.
- Editing approved artifacts in `docs/`.
- Inventing requirements, copy, limits or contracts.
- Silently changing an API or database schema.
- Adding a dependency without justification.
- Refactoring modules unrelated to the task.
- Weakening lint, typecheck or test configuration to make a gate pass.
