import { describe, expect, it } from "vitest";

import { formatIsoDateForDisplay, isValidIsoDate } from "../src/index";

describe("isValidIsoDate", () => {
  it("accepts valid ISO dates", () => {
    expect(isValidIsoDate("2026-03-12")).toBe(true);
  });

  it("rejects non-ISO date strings", () => {
    expect(isValidIsoDate("03/12/2026")).toBe(false);
  });

  it("rejects impossible calendar dates", () => {
    expect(isValidIsoDate("2026-02-31")).toBe(false);
  });
});

describe("formatIsoDateForDisplay", () => {
  it("formats ISO date strings as MM/DD/YYYY", () => {
    expect(formatIsoDateForDisplay("2026-03-12")).toBe("03/12/2026");
  });

  it("returns the original value for non-ISO date strings", () => {
    expect(formatIsoDateForDisplay("03/12/2026")).toBe("03/12/2026");
  });
});
