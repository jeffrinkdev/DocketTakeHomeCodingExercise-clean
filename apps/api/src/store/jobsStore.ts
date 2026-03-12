import { randomUUID } from "node:crypto";
import {
  getNextJobStatus,
  sortJobsBySchedule,
  type CreateJobRequest,
  type Job,
  type JobStatus
} from "@docket-sample/shared";
import { seedJobs } from "../data/seedJobs.js";

export interface CreateJobResult {
  job?: Job;
  error?: string;
}

export interface UpdateJobStatusResult {
  job?: Job;
  error?: string;
  notFound?: boolean;
}

const normalizeAddress = (address: string) => address.trim().toLowerCase();

export class JobsStore {
  private jobs: Job[];

  constructor(initialJobs: Job[] = seedJobs) {
    this.jobs = structuredClone(initialJobs);
  }

  list() {
    return sortJobsBySchedule(this.jobs);
  }

  create(input: CreateJobRequest): CreateJobResult {
    const hasDuplicateActiveJob = this.jobs.some((job) => {
      return (
        normalizeAddress(job.address) === normalizeAddress(input.address) &&
        job.scheduledDate === input.scheduledDate &&
        job.status !== "completed"
      );
    });

    if (hasDuplicateActiveJob) {
      return {
        error: "An active job already exists for this address on that date."
      };
    }

    const job: Job = {
      id: randomUUID(),
      status: "scheduled",
      ...input
    };

    this.jobs = [job, ...this.jobs];

    return { job };
  }

  updateStatus(id: string, status: JobStatus): UpdateJobStatusResult {
    const currentJob = this.jobs.find((job) => job.id === id);

    if (!currentJob) {
      return { notFound: true };
    }

    if (getNextJobStatus(currentJob.status) !== status) {
      return { error: "Job status transition is invalid." };
    }

    const updatedJob = { ...currentJob, status };

    this.jobs = this.jobs.map((job) => (job.id === id ? updatedJob : job));

    return { job: updatedJob };
  }
}

export const createJobsStore = (initialJobs?: Job[]) => new JobsStore(initialJobs);