import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { CreateJobRequest } from "@docket-sample/shared";

import { AddJobForm } from "./AddJobForm";

const formState: CreateJobRequest = {
  customerName: "",
  address: "",
  serviceType: "delivery",
  containerSize: "20 yard",
  scheduledDate: "2026-03-13"
};

describe("AddJobForm", () => {
  it("renders capitalized service type options", () => {
    render(
      <AddJobForm
        formState={formState}
        isSubmitting={false}
        onFieldChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByRole("option", { name: "Delivery" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pickup" })).toBeInTheDocument();
  });

  it("invokes onSubmit when the form is submitted", async () => {
    const onSubmit = vi.fn();

    const { container } = render(
      <AddJobForm
        formState={formState}
        isSubmitting={false}
        onFieldChange={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    const form = container.querySelector("form");

    if (!form) {
      throw new Error("Expected AddJobForm to render a form element.");
    }

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledOnce();
  });
});