import { Report } from "@/schemas/report.schema";
import EditReportClient from "./client";
import { getReport } from "@/services/api/report.api";
import { dynamicallySetToken } from "@/services/axios.config";
import { cookies as nextJsCookies } from "next/headers";
import { notFound } from "next/navigation";

const EditReportPage: React.FC<{
  params: Promise<{ reportId: string }>;
}> = async ({ params }) => {
  let report: Report;

  try {
    const { reportId } = await params;
    dynamicallySetToken((await nextJsCookies()).get("token")?.value);
    report = await getReport(reportId);
  } catch (error) {
    console.log("Error fetching report", error);
    notFound();
  }

  return <EditReportClient report={report} />;
};

export default EditReportPage;
