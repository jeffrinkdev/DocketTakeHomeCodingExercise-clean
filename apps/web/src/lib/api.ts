import type { ApiError, CreateJobRequest, Job, JobStatus } from "@docket-sample/shared";

const readErrorMessage = async (response: Response) => {
  const contentType = response.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    try {
      const error = (await response.clone().json()) as Partial<ApiError>;

      if (typeof error.message === "string" && error.message.trim().length > 0) {
        return error.message;
      }
    } catch {
      // Fall through to text and status-based fallbacks.
    }
  }

  try {
    const responseText = await response.clone().text();

    if (responseText.trim().length > 0) {
      return responseText.trim();
    }
  } catch {
    // Fall through to the generic fallback.
  }

  return response.statusText || `Request failed with status ${response.status}.`;
};

export const getJobs = async () => {
  const response = await fetch("/api/jobs");

  if (!response.ok) {
    const errorMessage = await readErrorMessage(response);
    throw new Error(errorMessage || "Unable to load jobs.");
  }

  return (await response.json()) as Job[];
};

export const createJob = async (payload: CreateJobRequest) => {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return (await response.json()) as Job;
};

export const updateJobStatus = async (jobId: string, status: JobStatus) => {
  const response = await fetch(`/api/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return (await response.json()) as Job;
};