import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DefaultAuthPage = () => {
  return (
    <div className="flex flex-col gap-4 w-70 mx-auto p-4 animate-in fade-in duration-500">
      <Image
        src="/images/walking-illustration.png"
        alt="Welcome Image"
        width={319}
        height={400}
      />
      <Button asChild>
        <Link href="/auth/signup">Create account</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  );
};

export default DefaultAuthPage;
