import request from "supertest";
import { describe, expect, it } from "vitest";
import type { Job } from "@docket-sample/shared";
import { createApp } from "./app.js";
import { createJobsStore } from "./store/jobsStore.js";

describe("jobs API", () => {
  it("loads default seed data", async () => {
    const app = createApp(createJobsStore());

    const response = await request(app).get("/api/jobs");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].customerName).toBe("Front Range Roofing");
  });

  it("lists jobs from provided store state", async () => {
    const providedJobs: Job[] = [
      {
        id: "job-custom-1",
        customerName: "Custom Test Customer",
        address: "500 Independent St, Denver, CO",
        serviceType: "delivery",
        containerSize: "10 yard",
        scheduledDate: "2026-03-18",
        status: "scheduled"
      }
    ];

    const app = createApp(createJobsStore(providedJobs));

    const response = await request(app).get("/api/jobs");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe("job-custom-1");
    expect(response.body[0].customerName).toBe("Custom Test Customer");
  });

  it("rejects a duplicate active job for the same address and date", async () => {
    const app = createApp(createJobsStore([]));

    const baseJobPayload = {
      customerName: "Repeat Customer",
      address: "77 Test Way, Denver, CO",
      serviceType: "pickup",
      containerSize: "20 yard",
      scheduledDate: "2026-03-20"
    };

    const firstCreateResponse = await request(app).post("/api/jobs").send(baseJobPayload);

    expect(firstCreateResponse.status).toBe(201);

    const response = await request(app).post("/api/jobs").send(baseJobPayload);

    expect(response.status).toBe(409);
    expect(response.body.message).toContain("active job already exists");
  });

  it("rejects invalid create payload", async () => {
    const app = createApp(createJobsStore([]));

    const response = await request(app).post("/api/jobs").send({
      customerName: "Incomplete Payload"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Job payload is invalid.");
  });

  it("rejects non-ISO scheduled dates", async () => {
    const app = createApp(createJobsStore([]));

    const response = await request(app).post("/api/jobs").send({
      customerName: "Date Format Customer",
      address: "99 Calendar Ave, Denver, CO",
      serviceType: "delivery",
      containerSize: "20 yard",
      scheduledDate: "03/20/2026"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Job payload is invalid.");
  });

  it("rejects invalid status payload", async () => {
    const app = createApp(createJobsStore([]));

    const response = await request(app)
      .patch("/api/jobs/job-any/status")
      .send({ status: "done" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Status payload is invalid.");
  });

  it("returns not found when updating an unknown job id", async () => {
    const app = createApp(createJobsStore([]));

    const response = await request(app)
      .patch("/api/jobs/job-missing/status")
      .send({ status: "completed" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Job not found.");
  });

  it("rejects invalid status transitions", async () => {
    const app = createApp(createJobsStore([]));

    const createResponse = await request(app).post("/api/jobs").send({
      customerName: "Status Test Customer",
      address: "101 Integration Ave, Denver, CO",
      serviceType: "delivery",
      containerSize: "10 yard",
      scheduledDate: "2026-03-21"
    });

    expect(createResponse.status).toBe(201);

    const jobId = createResponse.body.id;

    const response = await request(app)
      .patch(`/api/jobs/${jobId}/status`)
      .send({ status: "completed" });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Job status transition is invalid.");
  });

  it("updates a job status to the next valid status", async () => {
    const app = createApp(createJobsStore([]));

    const createResponse = await request(app).post("/api/jobs").send({
      customerName: "Status Test Customer",
      address: "101 Integration Ave, Denver, CO",
      serviceType: "delivery",
      containerSize: "10 yard",
      scheduledDate: "2026-03-21"
    });

    expect(createResponse.status).toBe(201);

    const jobId = createResponse.body.id;

    const response = await request(app)
      .patch(`/api/jobs/${jobId}/status`)
      .send({ status: "in_progress" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("in_progress");
  });
});
