import React from "react";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import AuthenticatedLayout from "@/components/layouts/authenticated-layout";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthenticatedLayout>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="grow flex flex-col overflow-y-auto min-h-screen">
          <DashboardHeader />
          <main className="bg-neutral-100 grow p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardLayout;
