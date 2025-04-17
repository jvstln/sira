"use client";
import { useCurrentUser } from "@/services/hooks/use-user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading)
    return (
      <div className="absolute inset-0 bg-primary/10 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!user) {
    router.push("/auth/login");
    return (
      <div className="absolute inset-0 bg-primary/10 flex justify-center items-center">
        Redirecting to login page...
      </div>
    );
  }

  return children;
};

export default AuthenticatedLayout;
