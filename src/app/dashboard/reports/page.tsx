"use client";
import { useState, Fragment } from "react";
import { SubHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, getErrorMessage } from "@/lib/utils";
import { Report, ReportStatus } from "@/schemas/report.schema";
import { useReports } from "@/services/hooks/use-reports";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { deleteReport } from "@/services/api/report.api";
import { toast } from "sonner";

const reportsDummyData = [
  {
    id: 1,
    category: "Hardware",
    status: "resolved",
    title: "Server Maintenance",
    description: "Replaced faulty PSU",
    date: "2023-09-01",
  },
  {
    id: 2,
    category: "Software",
    status: "pending",
    title: "Bug Fix",
    description: "Investigating login issue",
    date: "2023-09-02",
  },
  {
    id: 3,
    category: "Others",
    status: "resolved",
    title: "System Update",
    description: "Software patching completed",
    date: "2023-09-03",
  },
  {
    id: 4,
    category: "Network",
    status: "pending",
    title: "Connectivity Issue",
    description: "Router configuration update required",
    date: "2023-09-04",
  },
  {
    id: 5,
    category: "Hardware",
    status: "resolved",
    title: "Workstation Repair",
    description: "Replaced damaged SSD",
    date: "2023-09-05",
  },
  {
    id: 6,
    category: "Software",
    status: "pending",
    title: "App Deployment",
    description: "Awaiting QA approval",
    date: "2023-09-06",
  },
  {
    id: 7,
    category: "Others",
    status: "resolved",
    title: "User Training",
    description: "Security awareness training completed",
    date: "2023-09-07",
  },
  {
    id: 8,
    category: "Network",
    status: "pending",
    title: "Firewall Upgrade",
    description: "Pending approval from IT manager",
    date: "2023-09-08",
  },
  {
    id: 9,
    category: "Hardware",
    status: "resolved",
    title: "Printer Issue",
    description: "Replaced toner and fixed driver issue",
    date: "2023-09-09",
  },
  {
    id: 10,
    category: "Software",
    status: "pending",
    title: "Database Optimization",
    description: "Query performance tuning in progress",
    date: "2023-09-10",
  },
  {
    id: 11,
    category: "Others",
    status: "resolved",
    title: "Policy Update",
    description: "Updated IT security policies",
    date: "2023-09-11",
  },
  {
    id: 12,
    category: "Network",
    status: "pending",
    title: "VPN Access Issue",
    description: "Investigating remote login problems",
    date: "2023-09-12",
  },
  {
    id: 13,
    category: "Hardware",
    status: "resolved",
    title: "Device Upgrade",
    description: "Upgraded RAM on all office PCs",
    date: "2023-09-13",
  },
  {
    id: 14,
    category: "Software",
    status: "pending",
    title: "CMS Update",
    description: "Version upgrade in progress",
    date: "2023-09-14",
  },
  {
    id: 15,
    category: "Others",
    status: "resolved",
    title: "Security Audit",
    description: "Completed annual security assessment",
    date: "2023-09-15",
  },
  {
    id: 16,
    category: "Network",
    status: "pending",
    title: "LAN Expansion",
    description: "Setting up additional office connections",
    date: "2023-09-16",
  },
  {
    id: 17,
    category: "Hardware",
    status: "resolved",
    title: "Monitor Replacement",
    description: "Replaced faulty screens",
    date: "2023-09-17",
  },
  {
    id: 18,
    category: "Software",
    status: "pending",
    title: "Backup Failure",
    description: "Investigating cloud backup failures",
    date: "2023-09-18",
  },
  {
    id: 19,
    category: "Others",
    status: "resolved",
    title: "Inventory Audit",
    description: "Reviewed and updated asset records",
    date: "2023-09-19",
  },
  {
    id: 20,
    category: "Network",
    status: "pending",
    title: "Wireless Interference",
    description: "Identifying source of Wi-Fi disruptions",
    date: "2023-09-20",
  },
];

const Reports = () => {
  const [mode, setMode] = useState<ReportStatus>(ReportStatus.PENDING);
  const {
    reports: unfilteredReports,
    isReportsLoading,
    reportsError,
    mutate: mutateReports,
  } = useReports();

  const reports = unfilteredReports?.filter((report) => report.status === mode);

  return (
    <div>
      <SubHeader
        title={
          <>
            Your {mode === ReportStatus.RESOLVED ? "submitted" : "pending"}{" "}
            reports
          </>
        }
      />

      <div className="text-center my-8">
        {mode === ReportStatus.RESOLVED
          ? "View your resolved reports here."
          : "View reports that are still pending "}
      </div>

      <div className="btn-group flex">
        <Button
          variant="ghost"
          className={cn(
            "rounded-none border-b w-full hover:bg-primary/10",
            mode === ReportStatus.PENDING && "bg-primary/20 border-primary"
          )}
          onClick={() => setMode(ReportStatus.PENDING)}
        >
          Pending
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "rounded-none border-b w-full hover:bg-primary/10",
            mode === ReportStatus.RESOLVED && "bg-primary/20 border-primary"
          )}
          onClick={() => setMode(ReportStatus.RESOLVED)}
        >
          Resolved
        </Button>
      </div>

      <div className="reports mt-10">
        {reportsError && (
          <p className="text-center text-red-600">
            An error occurred while loading reports - {reportsError}
          </p>
        )}
        {isReportsLoading && <Spinner />}
        {reports?.length === 0 && (
          <p className="text-center">No reports found</p>
        )}
        {reports?.map((report) => (
          <Fragment key={report._id}>
            <div className="flex justify-between items-center gap-2 w-full p-2 hover:bg-neutral-200">
              <div className="content capitalize flex flex-col font-bold text-lg">
                {report.issueType}
                <div className="date text-sm font-normal">
                  {new Date(report.createdAt).toLocaleString()}
                </div>
              </div>
              <div
                className={cn(
                  "status p-2 rounded-md text-xs self-center uppercase ml-auto",
                  mode === ReportStatus.RESOLVED
                    ? "bg-primary/20"
                    : "bg-amber-200"
                )}
              >
                {report.status}
              </div>
              <div className="flex gap-2">
                <ReportDialog report={report}>
                  <Button variant="default" size="icon">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </ReportDialog>
                <Button variant="secondary" size="icon" asChild>
                  <Link href={`/dashboard/reports/edit/${report._id}`}>
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <ReportDeleteDialog
                  reportId={report._id}
                  mutateReports={mutateReports}
                />
              </div>
            </div>
            <hr className="border-neutral-500" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const ReportDialog: React.FC<{ children: React.ReactNode; report: Report }> = ({
  children,
  report,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize text-center">
            {report.issueType}
          </DialogTitle>
          <DialogDescription>
            <div className="font-bold">Description:</div> {report.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <div className="font-bold">Location:</div>
            {report.location}
          </div>
          <div>
            <div className="font-bold">Evidence:</div>
            {report.evidence.map((evidence, index) => (
              <img
                key={index}
                src={evidence}
                alt={`Evidence ${index + 1}`}
                width={200}
                height={200}
              />
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" asChild>
              <Link href={`/dashboard/reports/edit/${report._id}`}>Edit</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReportDeleteDialog: React.FC<{
  reportId: string;
  mutateReports: () => void;
}> = ({ reportId, mutateReports }) => {
  const handleDelete = async () => {
    try {
      await deleteReport(reportId);
      toast.success("Report deleted successfully");
      mutateReports();
    } catch (error) {
      console.error("Error deleting report", error);
      toast.error("Failed to delete report", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Report</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this report?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Reports;
