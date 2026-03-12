import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { Job } from "@docket-sample/shared";

import { UpcomingJobsList } from "./UpcomingJobsList";

const jobs: Job[] = [
  {
    id: "job-100",
    customerName: "Front Range Roofing",
    address: "123 Blake St, Denver, CO",
    serviceType: "delivery",
    containerSize: "20 yard",
    scheduledDate: "2026-03-12",
    status: "scheduled"
  }
];

describe("UpcomingJobsList", () => {
  it("renders loading state", () => {
    render(
      <UpcomingJobsList
        errorMessage={undefined}
        isLoading
        jobs={[]}
        onAdvanceStatus={vi.fn(async () => undefined)}
      />
    );

    expect(screen.getByText("Loading jobs...")).toBeInTheDocument();
  });

  it("renders jobs and advances status", async () => {
    const onAdvanceStatus = vi.fn(async () => undefined);

    render(
      <UpcomingJobsList
        errorMessage={undefined}
        isLoading={false}
        jobs={jobs}
        onAdvanceStatus={onAdvanceStatus}
      />
    );

    expect(screen.getByText("Front Range Roofing")).toBeInTheDocument();
    expect(screen.getByText("Delivery · 20 yard · 03/12/2026")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Mark In progress" }));

    expect(onAdvanceStatus).toHaveBeenCalledWith(jobs[0]);
  });
});