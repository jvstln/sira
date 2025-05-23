import { NewReportFormValues } from "@/types/report.type";
import api from "../axios.config";

export const createReport = async (newReportFormData: NewReportFormValues) => {
  const response = await api.post("/report/user", newReportFormData, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });

  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/report/get-my-report");

  return response.data;
};
