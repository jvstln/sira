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

export async function getReport(reportId: string): Promise<Report> {
  const response = await api.get(`/report/get-my-report/${reportId}`);

  return response.data.data;
}

export const updateReport = async (
  reportId: string,
  data: Partial<NewReportFormValues>
) => {
  const response = await api.put(`/report/update/${reportId}`, data);

  return response.data;
};

export const deleteReport = async (reportId: string) => {
  const response = await api.delete(`/report/delete/${reportId}`);

  return response.data;
};
