# DocketTakeHomeCodingExercise

Minimal full-stack interview sample for a roll-off scheduling workflow.

## Reviewer TL;DR

- Monorepo with React + TypeScript front end and Express API.
- Shared TypeScript contracts between UI and API.
- Business validation includes date normalization and status lifecycle rules.
- Includes automated tests for both front end and API.

## Stack

- Front end: Vite + React + TypeScript + Tailwind CSS
- Back end: Node.js + Express
- Data: In-memory store
- Tooling: Vitest + React Testing Library + Supertest
- Deliberate omissions for interview scope: Redux, KendoUI, and persistent database infrastructure

## Project Layout

- `apps/web` - React app
- `apps/api` - Express API
- `packages/shared` - shared contracts and utilities

## Reviewer Entry Points

For a fast review, start with these files:

1. [packages/shared/src/index.ts](packages/shared/src/index.ts): shared contracts and core helpers for date/status behavior.
2. [apps/api/src/app.ts](apps/api/src/app.ts): API route definitions and request validation boundaries.
3. [apps/api/src/store/jobsStore.ts](apps/api/src/store/jobsStore.ts): in-memory business rules for duplicates and status transitions.
4. [apps/web/src/components/RollOffSchedulingPage.tsx](apps/web/src/components/RollOffSchedulingPage.tsx): UI orchestration for loading, creating, and advancing jobs.

## Run

Prerequisites:

- Node.js `>=22.0.0`
- npm `>=10.0.0`

```bash
npm install
npm run dev
```

Web: `http://localhost:3000` (proxying API requests to `http://localhost:4000`)

## Validate

```bash
npm test && npm run lint
```

Optional watch mode:

```bash
npm run test:watch -w @docket-sample/web
npm run test:watch -w @docket-sample/api
```

## API Reference

See [API_REFERENCE.md](API_REFERENCE.md) for routes, payloads, and status transition behavior.

## Scope Notes

- Designed for interviewer readability over production completeness.
- Uses in-memory persistence only.
- Excludes authentication and deployment infrastructure.