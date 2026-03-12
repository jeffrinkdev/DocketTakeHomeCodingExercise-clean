import { describe, expect, it } from "vitest";

import { sortJobsBySchedule, type Job } from "../src/index";

const jobs: Job[] = [
  {
    id: "job-2",
    customerName: "Zulu Demo",
    address: "2 Main St",
    serviceType: "pickup",
    containerSize: "20 yard",
    scheduledDate: "2026-03-13",
    status: "scheduled"
  },
  {
    id: "job-3",
    customerName: "Alpha Demo",
    address: "3 Main St",
    serviceType: "delivery",
    containerSize: "10 yard",
    scheduledDate: "2026-03-13",
    status: "scheduled"
  },
  {
    id: "job-1",
    customerName: "Bravo Demo",
    address: "1 Main St",
    serviceType: "delivery",
    containerSize: "30 yard",
    scheduledDate: "2026-03-12",
    status: "scheduled"
  }
];

describe("sortJobsBySchedule", () => {
  it("sorts by scheduled date and then customer name", () => {
    expect(sortJobsBySchedule(jobs).map((job) => job.id)).toEqual([
      "job-1",
      "job-3",
      "job-2"
    ]);
  });

  it("does not mutate the source array", () => {
    const originalOrder = jobs.map((job) => job.id);

    sortJobsBySchedule(jobs);

    expect(jobs.map((job) => job.id)).toEqual(originalOrder);
  });
});
