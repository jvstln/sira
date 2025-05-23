import { newReportFormSchema } from "@/schemas/report.schema";
import { z } from "zod";

export type NewReportFormValues = z.infer<typeof newReportFormSchema>;
