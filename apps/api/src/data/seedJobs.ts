import type { Job } from "@docket-sample/shared";

export const seedJobs: Job[] = [
  {
    id: "job-100",
    customerName: "Front Range Roofing",
    address: "123 Blake St, Denver, CO",
    serviceType: "delivery",
    containerSize: "20 yard",
    scheduledDate: "2026-03-12",
    status: "scheduled"
  },
  {
    id: "job-101",
    customerName: "Mile High Demolition",
    address: "4500 Brighton Blvd, Denver, CO",
    serviceType: "pickup",
    containerSize: "30 yard",
    scheduledDate: "2026-03-12",
    status: "in_progress"
  },
  {
    id: "job-102",
    customerName: "Union Station Renovation",
    address: "1701 Wynkoop St, Denver, CO",
    serviceType: "pickup",
    containerSize: "20 yard",
    scheduledDate: "2026-03-13",
    status: "completed"
  }
];