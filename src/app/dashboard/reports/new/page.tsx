"use client";
import ReportForm from "@/components/reports/report-form";
import { getErrorMessage } from "@/lib/utils";
import {
  newReportFormSchema,
  NewReportFormValues,
} from "@/schemas/report.schema";
import { createReport } from "@/services/api/report.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NewReportPage = () => {
  const form = useForm<NewReportFormValues>({
    resolver: zodResolver(newReportFormSchema),
    defaultValues: {
      description: "",
      issueType: "",
      location: "",
    },
  });

  const onSubmit = async (data: NewReportFormValues) => {
    try {
      const response = await createReport(data);
      console.log(response);
      toast.success("Report created successfully");
      form.reset();
    } catch (error) {
      console.error("Error creating report", error);
      toast.error("Failed to create report", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div>
      <ReportForm onSubmit={onSubmit} form={form} />
    </div>
  );
};

export default NewReportPage;
