import useSWR from "swr";
import { getReports } from "../api/report.api";

export const useReports = () => {
  const {
    data: reports,
    isLoading,
    error,
    ...swrProps
  } = useSWR("/report/get-my-report", getReports);

  return {
    reports,
    isReportsLoading: isLoading,
    reportsError: error,
    ...swrProps,
  };
};
