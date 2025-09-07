import { z } from "zod";

export enum ReportStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
}

export interface Report {
  _id: string;
  userId: string;
  evidence: Array<string>;
  issueType: string;
  location: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export type NewReportFormValues = z.infer<typeof newReportFormSchema>;

export const newReportFormSchema = z.object({
  issueType: z.string().min(1, "Please select an issue type"),
  location: z.string().min(1, "Please enter a location"),
  files: z
    .instanceof(FileList)
    .transform((filelist: FileList) => Array.from(filelist))
    .optional()
    .superRefine((value, ctx) => {
      if (value && value.length > 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You can only upload up to 5 files",
          path: ["files"],
        });
      }

      for (const file of value ?? []) {
        if (file.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File size must be less than 5MB",
            path: ["files"],
          });
        }

        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "File must be an image. Supported formats: .png, .jpg, .jpeg",
            path: ["files"],
          });
        }
      }
    }),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export const updateReportFormSchema = newReportFormSchema.partial();
