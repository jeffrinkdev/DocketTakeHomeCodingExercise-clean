import { type Job } from "@docket-sample/shared";
import { JobListItem } from "./JobListItem";

interface UpcomingJobsListProps {
  jobs: Job[];
  isLoading: boolean;
  errorMessage?: string;
  onAdvanceStatus: (job: Job) => Promise<void>;
}

export const UpcomingJobsList = ({
  jobs,
  isLoading,
  errorMessage,
  onAdvanceStatus
}: UpcomingJobsListProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Upcoming jobs</h2>
        </div>
      </div>

      {errorMessage ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <p className="mt-6 text-sm text-slate-600">Loading jobs...</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} onAdvanceStatus={onAdvanceStatus} />
          ))}
        </ul>
      )}
    </section>
  );
};