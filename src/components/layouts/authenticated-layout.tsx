"use client";
import { useCurrentUser } from "@/services/hooks/use-user";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-primary/10 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    redirect("/auth/login");
  }

  return children;
};

export default AuthenticatedLayout;
