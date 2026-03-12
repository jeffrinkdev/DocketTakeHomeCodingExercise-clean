import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  getNextJobStatus,
  sortJobsBySchedule,
  type CreateJobRequest,
  type Job
} from "@docket-sample/shared";

import { createJob, getJobs, updateJobStatus } from "../lib/api";
import { AddJobForm } from "./AddJobForm";
import { UpcomingJobsList } from "./UpcomingJobsList";

const formatDateInputValue = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDefaultScheduledDate = (baseDate = new Date()) => {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return formatDateInputValue(nextDate);
};

const createInitialFormState = (): CreateJobRequest => ({
  customerName: "",
  address: "",
  serviceType: "delivery",
  containerSize: "20 yard",
  scheduledDate: getDefaultScheduledDate()
});

export const RollOffSchedulingPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<CreateJobRequest>(createInitialFormState);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const initialJobs = await getJobs();
        setJobs(sortJobsBySchedule(initialJobs));
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unable to load jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadJobs();
  }, []);

  const handleFieldChange = (
    changeEvent: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = changeEvent.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value
    }));
  };

  const handleSubmit = async (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setErrorMessage(undefined);
    setIsSubmitting(true);

    try {
      const createdJob = await createJob(formState);

      setJobs((currentJobs) => sortJobsBySchedule([createdJob, ...currentJobs]));
      setFormState(createInitialFormState());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvanceStatus = async (job: Job) => {
    const nextStatus = getNextJobStatus(job.status);

    if (!nextStatus) {
      return;
    }

    setErrorMessage(undefined);

    try {
      const updatedJob = await updateJobStatus(job.id, nextStatus);

      setJobs((currentJobs) =>
        sortJobsBySchedule(
          currentJobs.map((currentJob) =>
            currentJob.id === updatedJob.id ? updatedJob : currentJob
          )
        )
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update job.");
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[22rem_1fr]">
      <AddJobForm
        formState={formState}
        isSubmitting={isSubmitting}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      <UpcomingJobsList
        jobs={jobs}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onAdvanceStatus={handleAdvanceStatus}
      />
    </div>
  );
};