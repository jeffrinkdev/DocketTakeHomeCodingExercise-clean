export const serviceTypes = ["delivery", "pickup"] as const;
export const containerSizes = ["10 yard", "20 yard", "30 yard"] as const;
export const jobStatuses = ["scheduled", "in_progress", "completed"] as const;

const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export type ServiceType = (typeof serviceTypes)[number];
export type ContainerSize = (typeof containerSizes)[number];
export type JobStatus = (typeof jobStatuses)[number];

export const getNextJobStatus = (status: JobStatus): JobStatus | undefined => {
  if (status === "scheduled") {
    return "in_progress";
  }

  if (status === "in_progress") {
    return "completed";
  }

  return undefined;
};

const parseIsoDateParts = (value: string) => {
  const match = isoDatePattern.exec(value);

  if (!match) {
    return undefined;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3])
  };
};

export const isValidIsoDate = (value: string): boolean => {
  const parts = parseIsoDateParts(value);

  if (!parts) {
    return false;
  }

  const { year, month, day } = parts;
  const candidate = new Date(Date.UTC(year, month - 1, day));

  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
};

export const formatIsoDateForDisplay = (value: string): string => {
  const parts = parseIsoDateParts(value);

  if (!parts) {
    return value;
  }

  const { year, month, day } = parts;

  return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;
};

export interface Job {
  id: string;
  customerName: string;
  address: string;
  serviceType: ServiceType;
  containerSize: ContainerSize;
  scheduledDate: string;
  status: JobStatus;
}

export const compareJobsBySchedule = (left: Job, right: Job) => {
  const dateComparison = left.scheduledDate.localeCompare(right.scheduledDate);

  if (dateComparison !== 0) {
    return dateComparison;
  }

  return left.customerName.localeCompare(right.customerName);
};

export const sortJobsBySchedule = (jobs: Job[]) => {
  return [...jobs].sort(compareJobsBySchedule);
};

export interface CreateJobRequest {
  customerName: string;
  address: string;
  serviceType: ServiceType;
  containerSize: ContainerSize;
  scheduledDate: string;
}

export interface UpdateJobStatusRequest {
  status: JobStatus;
}

export interface ApiError {
  message: string;
}