# API Reference

The API store is intentionally in-memory, so data resets when the API process restarts.

## List Jobs

```http
GET /api/jobs
```

## Create Job

`scheduledDate` must be provided in ISO format: `YYYY-MM-DD`.
The UI may render this value as `MM/DD/YYYY` for readability.

```http
POST /api/jobs
Content-Type: application/json

{
  "customerName": "Acme Builders",
  "address": "700 Santa Fe Dr, Denver, CO",
  "serviceType": "delivery",
  "containerSize": "20 yard",
  "scheduledDate": "2026-03-13"
}
```

## Update Status

Status updates enforce the lifecycle below:

- `scheduled` -> `in_progress`
- `in_progress` -> `completed`

Skipping steps (for example `scheduled` -> `completed`) returns `409 Conflict`.

```http
PATCH /api/jobs/:id/status
Content-Type: application/json

{
  "status": "in_progress"
}
```