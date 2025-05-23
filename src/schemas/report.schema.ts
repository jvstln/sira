import { z } from "zod";

export const newReportFormSchema = z.object({
  issueType: z.string({
    required_error: "Please select an issue type",
  }),
  location: z.string({
    required_error: "Please enter a location",
  }),
  evidence: z.instanceof(FileList).optional(),
  description: z
    .string({
      required_error: "Please provide a description",
    })
    .min(10, "Description must be at least 10 characters"),
});
