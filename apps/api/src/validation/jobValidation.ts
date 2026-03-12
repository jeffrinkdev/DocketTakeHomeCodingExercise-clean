import {
  containerSizes,
  jobStatuses,
  serviceTypes,
  isValidIsoDate,
  type CreateJobRequest,
  type UpdateJobStatusRequest
} from "@docket-sample/shared";

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const validateCreateJobRequest = (value: unknown): value is CreateJobRequest => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    isNonEmptyString(candidate.customerName) &&
    isNonEmptyString(candidate.address) &&
    typeof candidate.serviceType === "string" &&
    serviceTypes.includes(candidate.serviceType as CreateJobRequest["serviceType"]) &&
    typeof candidate.containerSize === "string" &&
    containerSizes.includes(candidate.containerSize as CreateJobRequest["containerSize"]) &&
    isNonEmptyString(candidate.scheduledDate) &&
    isValidIsoDate(candidate.scheduledDate)
  );
};

export const validateUpdateJobStatusRequest = (
  value: unknown
): value is UpdateJobStatusRequest => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.status === "string" &&
    jobStatuses.includes(candidate.status as UpdateJobStatusRequest["status"])
  );
};