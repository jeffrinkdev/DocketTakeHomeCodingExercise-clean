import { afterEach, describe, expect, it, vi } from "vitest";

import { createJob, getJobs, updateJobStatus } from "./api";

const originalFetch = global.fetch;

describe("api client", () => {
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("falls back to plain text error responses", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response("Gateway timeout", {
        status: 504,
        statusText: "Gateway Timeout",
        headers: {
          "Content-Type": "text/plain"
        }
      })
    );

    await expect(
      createJob({
        customerName: "Acme Builders",
        address: "700 Santa Fe Dr, Denver, CO",
        serviceType: "delivery",
        containerSize: "20 yard",
        scheduledDate: "2026-03-12"
      })
    ).rejects.toThrow("Gateway timeout");
  });

  it("surfaces JSON error messages when loading jobs fails", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Failed to load jobs from API." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await expect(getJobs()).rejects.toThrow("Failed to load jobs from API.");
  });

  it("falls back to status text when an error response body is empty", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 503,
        statusText: "Service Unavailable"
      })
    );

    await expect(updateJobStatus("job-100", "completed")).rejects.toThrow(
      "Service Unavailable"
    );
  });
});
