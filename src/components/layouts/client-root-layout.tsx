"use client";
import { Toaster } from "../ui/sonner";

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ClientRootLayout;
