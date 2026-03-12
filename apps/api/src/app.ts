import cors from "cors";
import express from "express";
import type {
  ApiError,
  CreateJobRequest,
  UpdateJobStatusRequest
} from "@docket-sample/shared";
import { createJobsStore, type JobsStore } from "./store/jobsStore.js";
import {
  validateCreateJobRequest,
  validateUpdateJobStatusRequest
} from "./validation/jobValidation.js";

const sendError = (
  response: express.Response<ApiError, Record<string, unknown>>,
  statusCode: number,
  message: string
) => response.status(statusCode).json({ message });

const validateBody = (
  validator: (value: unknown) => boolean,
  message: string
): express.RequestHandler => {
  return (request, response, next) => {
    if (!validator(request.body)) {
      return sendError(response, 400, message);
    }

    return next();
  };
};

const validateStringParam = (
  paramName: string,
  message: string
): express.RequestHandler => {
  return (request, response, next) => {
    const paramValue = request.params[paramName];

    if (typeof paramValue !== "string" || paramValue.length === 0) {
      return sendError(response, 400, message);
    }

    response.locals[paramName] = paramValue;

    return next();
  };
};

const validateCreateJobBody = validateBody(
  validateCreateJobRequest,
  "Job payload is invalid."
);

const validateJobStatusBody = validateBody(
  validateUpdateJobStatusRequest,
  "Status payload is invalid."
);

const validateJobIdParam = validateStringParam("id", "Job id is invalid.");

export const createApp = (jobsStore: JobsStore = createJobsStore()) => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.get("/api/jobs", (_request, response) => {
    response.json(jobsStore.list());
  });

  app.post("/api/jobs", validateCreateJobBody, (request, response) => {
    const result = jobsStore.create(request.body as CreateJobRequest);

    if (!result.job) {
      return sendError(response, 409, result.error ?? "Unable to create job.");
    }

    return response.status(201).json(result.job);
  });

  app.patch(
    "/api/jobs/:id/status",
    validateJobIdParam,
    validateJobStatusBody,
    (request, response: express.Response<unknown, { id: string }>) => {
      const jobId = response.locals.id;
      const payload = request.body as UpdateJobStatusRequest;
      const result = jobsStore.updateStatus(jobId, payload.status);

      if (result.notFound) {
        return sendError(response, 404, "Job not found.");
      }

      if (!result.job) {
        return sendError(response, 409, result.error ?? "Unable to update job.");
      }

      return response.json(result.job);
    }
  );

  return app;
};