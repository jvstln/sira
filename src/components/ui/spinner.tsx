import React from "react";
import { cn } from "@/lib/utils";

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full size-4 border-b-2 border-neutral-500",
        className
      )}
    ></div>
  );
};

export default Spinner;
