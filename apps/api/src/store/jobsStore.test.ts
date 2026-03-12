import { describe, expect, it } from "vitest";
import type { Job } from "@docket-sample/shared";

import { JobsStore } from "./jobsStore.js";

const existingJob: Job = {
  id: "job-1",
  customerName: "Existing Customer",
  address: "123 Blake St, Denver, CO",
  serviceType: "delivery",
  containerSize: "20 yard",
  scheduledDate: "2026-03-12",
  status: "scheduled"
};

describe("JobsStore", () => {
  it("rejects duplicate active jobs when address casing or whitespace differs", () => {
    const store = new JobsStore([existingJob]);

    const result = store.create({
      customerName: "Duplicate Customer",
      address: "  123 BLAKE ST, DENVER, CO  ",
      serviceType: "pickup",
      containerSize: "10 yard",
      scheduledDate: "2026-03-12"
    });

    expect(result.job).toBeUndefined();
    expect(result.error).toBe("An active job already exists for this address on that date.");
  });

  it("rejects invalid status transitions", () => {
    const store = new JobsStore([existingJob]);

    const result = store.updateStatus("job-1", "completed");

    expect(result.job).toBeUndefined();
    expect(result.error).toBe("Job status transition is invalid.");
    expect(result.notFound).toBeUndefined();
  });
});
