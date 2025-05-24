"use client";
import ReportForm from "@/components/reports/report-form";
import { useForm } from "react-hook-form";
import { NewReportFormValues } from "@/schemas/report.schema";
import { Report } from "@/schemas/report.schema";
import { updateReport } from "@/services/api/report.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateReportFormSchema } from "@/schemas/report.schema";

const EditReportClient: React.FC<{ report: Report }> = ({ report }) => {
  const form = useForm<NewReportFormValues>({
    resolver: zodResolver(updateReportFormSchema),
    defaultValues: {
      issueType: report.issueType,
      location: report.location,
      description: report.description,
    },
  });

  const onSubmit = async (values: Partial<NewReportFormValues>) => {
    try {
      const response = await updateReport(report._id, values);
      console.log(response);
      toast.success("Report updated successfully");
    } catch (error) {
      console.error("Error updating report", error);
      toast.error("Failed to update report", {
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

export default EditReportClient;
