import { NewReportFormValues, Report } from "@/schemas/report.schema";
import api from "../axios.config";

export const createReport = async (newReportFormData: NewReportFormValues) => {
  const response = await api.post("/report/user", newReportFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export async function getReports(): Promise<Report[]> {
  const response = await api.get("/report/get-my-report");

  return response.data.data;
}
