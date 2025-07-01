"use client";
import { Button } from "../ui/button";
import { Bell, ChevronDown, FilePlus2, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import Spinner from "../ui/spinner";
import { useCurrentUser } from "@/services/hooks/use-user";

type MobileNavProps = {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader = (props: MobileNavProps) => {
  const { user, isUserLoading } = useCurrentUser();

  return (
    <div className="flex justify-between items-center max-sm:flex-col gap-4 py-8 max-sm:py-4 px-4 bg-white">
      <div className="flex gap-4 max-sm:justify-between w-full">
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => props.setIsMobileNavOpen(!props.isMobileNavOpen)}
        >
          <MenuIcon />
        </Button>

        <Button asChild>
          <Link href="/dashboard/reports/new">
            <FilePlus2 />
            Make a report
          </Link>
        </Button>
      </div>

      <div className="self-end ml-auto profile flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell />
        </Button>
        {isUserLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="profile-picture rounded-full border border-neutral-400 p-0.5 size-6">
              <User className="size-full" />
            </div>
            <span className="text-sm text-center">Hi {user?.name}</span>
            <Button variant="ghost" size="icon">
              <ChevronDown />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const SubHeader: React.FC<{ title: React.ReactNode }> = ({ title }) => (
  <div className="report-header bg-primary text-white p-4 text-center text-lg font-semibold -mx-4 md:-mx-8 -mt-4 md:-mt-8">
    {title}
  </div>
);

export default DashboardHeader;
