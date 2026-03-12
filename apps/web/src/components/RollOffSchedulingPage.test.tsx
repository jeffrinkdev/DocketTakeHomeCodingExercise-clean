import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RollOffSchedulingPage } from "./RollOffSchedulingPage";

const originalFetch = global.fetch;

const createJsonResponse = (body: unknown, init?: ResponseInit) => {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });
};

describe("RollOffSchedulingPage", () => {
  afterEach(() => {
    global.fetch = originalFetch;
    vi.useRealTimers();
  });

  it("renders the initial list of jobs", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      createJsonResponse([
        {
          id: "job-100",
          customerName: "Front Range Roofing",
          address: "123 Blake St, Denver, CO",
          serviceType: "delivery",
          containerSize: "20 yard",
          scheduledDate: "2026-03-12",
          status: "scheduled"
        }
      ])
    );

    render(<RollOffSchedulingPage />);

    expect(await screen.findByText("Front Range Roofing")).toBeInTheDocument();
    expect(screen.getByText("123 Blake St, Denver, CO")).toBeInTheDocument();
  });

  it("shows an error when the initial job load fails", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      createJsonResponse({ message: "Internal Server Error" }, { status: 500 })
    );

    render(<RollOffSchedulingPage />);

    expect(await screen.findByText("Internal Server Error")).toBeInTheDocument();
  });

  it("defaults the scheduled date to tomorrow", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-11T12:00:00"));
    global.fetch = vi.fn().mockResolvedValue(createJsonResponse([]));

    render(<RollOffSchedulingPage />);

    expect(screen.getByLabelText("Scheduled date")).toHaveValue("2026-03-12");
  });

  it("creates a new job from the form", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse([]))
      .mockResolvedValueOnce(
        createJsonResponse(
          {
            id: "job-200",
            customerName: "Acme Builders",
            address: "700 Santa Fe Dr, Denver, CO",
            serviceType: "delivery",
            containerSize: "20 yard",
            scheduledDate: "2026-03-13",
            status: "scheduled"
          },
          { status: 201 }
        )
      );

    global.fetch = fetchMock;

    render(<RollOffSchedulingPage />);

    const user = userEvent.setup();

    await user.type(await screen.findByLabelText("Customer name"), "Acme Builders");
    await user.type(screen.getByLabelText("Address"), "700 Santa Fe Dr, Denver, CO");
    await user.click(screen.getByRole("button", { name: "Create job" }));

    expect(await screen.findByText("Acme Builders")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        "/api/jobs",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("keeps jobs sorted after creating a new job", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: "job-100",
            customerName: "Zulu Demo",
            address: "99 Test Ave, Denver, CO",
            serviceType: "pickup",
            containerSize: "30 yard",
            scheduledDate: "2026-03-13",
            status: "scheduled"
          }
        ])
      )
      .mockResolvedValueOnce(
        createJsonResponse(
          {
            id: "job-200",
            customerName: "Acme Builders",
            address: "700 Santa Fe Dr, Denver, CO",
            serviceType: "delivery",
            containerSize: "20 yard",
            scheduledDate: "2026-03-12",
            status: "scheduled"
          },
          { status: 201 }
        )
      );

    global.fetch = fetchMock;

    render(<RollOffSchedulingPage />);

    const user = userEvent.setup();

    await user.type(await screen.findByLabelText("Customer name"), "Acme Builders");
    await user.type(screen.getByLabelText("Address"), "700 Santa Fe Dr, Denver, CO");
    await user.click(screen.getByRole("button", { name: "Create job" }));

    await screen.findByText("Acme Builders");

    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Acme Builders",
      "Zulu Demo"
    ]);
  });

  it("shows the API error when a duplicate job is submitted", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse([]))
      .mockResolvedValueOnce(
        createJsonResponse(
          { message: "An active job already exists for this address on that date." },
          { status: 409 }
        )
      );

    global.fetch = fetchMock;

    render(<RollOffSchedulingPage />);

    const user = userEvent.setup();

    await user.type(await screen.findByLabelText("Customer name"), "Repeat Customer");
    await user.type(screen.getByLabelText("Address"), "123 Blake St, Denver, CO");
    await user.click(screen.getByRole("button", { name: "Create job" }));

    expect(
      await screen.findByText("An active job already exists for this address on that date.")
    ).toBeInTheDocument();
  });

  it("shows the API error when a status update fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: "job-100",
            customerName: "Front Range Roofing",
            address: "123 Blake St, Denver, CO",
            serviceType: "delivery",
            containerSize: "20 yard",
            scheduledDate: "2026-03-12",
            status: "scheduled"
          }
        ])
      )
      .mockResolvedValueOnce(
        createJsonResponse(
          { message: "Job status transition is invalid." },
          { status: 409 }
        )
      );

    global.fetch = fetchMock;

    render(<RollOffSchedulingPage />);

    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Mark In progress" }));

    expect(await screen.findByText("Job status transition is invalid.")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        "/api/jobs/job-100/status",
        expect.objectContaining({ method: "PATCH" })
      );
    });
  });
});
