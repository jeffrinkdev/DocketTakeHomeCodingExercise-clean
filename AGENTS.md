# AGENTS

## Purpose

This guide is for AI/code agents and interview participants making incremental changes to this starter app.

Primary goal: deliver requested features quickly with small, reviewable diffs, while preserving existing behavior unless a task explicitly requires breaking changes.

## Interview Context (README-aligned)

- This is a toy project used for live technical interviews at Docket.
- Baseline user experience: manage a set of physical destinations (addresses) to be visited.

## Project Snapshot

- Frontend Framework: Vite + React + TypeScript + KendoUI + Tailwind
- Backend Framework: Node.js + Express + TypeScript + in-memory database
- This should be a single (mono) repo with clear guidance on how to launch/exercise/test the solution

## Quick Start

## Code Map

## Data Model Notes

## Working Rules for Future Tasks

1. Keep changes surgical
   - Prefer minimal diffs in existing files.
   - Avoid broad refactors unless requested.

2. Preserve architecture conventions

3. Update all layers for feature work
   - If API contract changes: update both route handlers and consuming UI code.

4. Be explicit about DB lifecycle

5. Keep UX stable by default
   - Do not redesign layout/styles unless asked.
   - Reuse existing visual patterns for lists, fields, form.
   - Use semantic HTML elements judiciously
   - Avoid building too much responsive design or accessibility features since it is a toy application

6. Use modern idiom and patterns
7. All code must be testable using automated tests
8. 


## Recommended Implementation Workflow

For each new task:

1. Confirm exact behavior change and impacted files.
2. Implement backend/data changes first (schema, query, API).
3. Implement UI changes second.
4. Run relevant lint/build checks.
5. Smoke-test in browser and via API endpoint.
6. Document any assumptions or follow-up gaps.

## Definition of Done (Interview-Friendly)

- Feature works via UI and/or API exactly as requested.
- No obvious TypeScript or lint regressions in touched files.

## Common Pitfalls in This Repo

## If Time Is Limited

Prioritize in this order:

1. Correctness of API and data flow.
2. Type safety and error handling in touched code.
3. UI polish.
4. Optional refactors.

## Out of Scope Unless Requested

- Migrating to App Router.
- Replacing CSS approach/framework.
- Introducing auth, deployment, or infrastructure changes.
- Large dependency/tooling upgrades.
