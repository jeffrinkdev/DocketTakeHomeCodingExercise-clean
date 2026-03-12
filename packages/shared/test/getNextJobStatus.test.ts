import { describe, expect, it } from "vitest";

import { getNextJobStatus } from "../src/index";

describe("getNextJobStatus", () => {
  it("advances scheduled jobs to in_progress", () => {
    expect(getNextJobStatus("scheduled")).toBe("in_progress");
  });

  it("advances in_progress jobs to completed", () => {
    expect(getNextJobStatus("in_progress")).toBe("completed");
  });

  it("returns undefined for completed jobs", () => {
    expect(getNextJobStatus("completed")).toBeUndefined();
  });
});