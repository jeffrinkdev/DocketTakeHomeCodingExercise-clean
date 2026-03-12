import { type ChangeEvent, type SubmitEvent } from "react";
import { containerSizes, serviceTypes, type CreateJobRequest } from "@docket-sample/shared";

interface AddJobFormProps {
  formState: CreateJobRequest;
  isSubmitting: boolean;
  onFieldChange: (changeEvent: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (submitEvent: SubmitEvent<HTMLFormElement>) => void;
}

export const AddJobForm = ({
  formState,
  isSubmitting,
  onFieldChange,
  onSubmit
}: AddJobFormProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">Add a job</h2>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-slate-700">
          Customer name
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
            name="customerName"
            onChange={onFieldChange}
            required
            value={formState.customerName}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Address
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
            name="address"
            onChange={onFieldChange}
            required
            value={formState.address}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Service type
            <select
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
              name="serviceType"
              onChange={onFieldChange}
              value={formState.serviceType}
            >
              {serviceTypes.map((serviceType) => (
                <option key={serviceType} value={serviceType}>
                  {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Container size
            <select
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
              name="containerSize"
              onChange={onFieldChange}
              value={formState.containerSize}
            >
              {containerSizes.map((containerSize) => (
                <option key={containerSize} value={containerSize}>
                  {containerSize}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-700">
          Scheduled date
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
            name="scheduledDate"
            onChange={onFieldChange}
            required
            type="date"
            value={formState.scheduledDate}
          />
        </label>
        <button
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Create job"}
        </button>
      </form>
    </section>
  );
};