import {
  formatIsoDateForDisplay,
  getNextJobStatus,
  type Job,
  type JobStatus
} from "@docket-sample/shared";

interface JobListItemProps {
  job: Job;
  onAdvanceStatus: (job: Job) => Promise<void>;
}

const statusLabel: Record<JobStatus, string> = {
  scheduled: "Scheduled",
  in_progress: "In progress",
  completed: "Completed"
};

export const JobListItem = ({ job, onAdvanceStatus }: JobListItemProps) => {
  const nextStatus = getNextJobStatus(job.status);
  const formattedServiceType = job.serviceType.charAt(0).toUpperCase() + job.serviceType.slice(1);
  const formattedScheduledDate = formatIsoDateForDisplay(job.scheduledDate);

  const handleAdvanceClick = () => {
    void onAdvanceStatus(job);
  };

  return (
    <li className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{job.customerName}</h3>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
              {statusLabel[job.status]}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-700">{job.address}</p>
          <p className="mt-1 text-sm text-slate-500">
            {formattedServiceType} · {job.containerSize} · {formattedScheduledDate}
          </p>
        </div>
        <button
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!nextStatus}
          onClick={handleAdvanceClick}
          type="button"
        >
          {nextStatus ? `Mark ${statusLabel[nextStatus]}` : "Completed"}
        </button>
      </div>
    </li>
  );
};