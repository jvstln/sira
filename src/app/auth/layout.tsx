import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthPagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <header className="p-4 md:px-8 bg-white border-b border-neutral-300">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Sira Logo"
              className="logo max-md:w-16"
              width={108}
              height={33}
            />
          </Link>
        </div>
      </header>
      <main className="grow flex flex-col">{children}</main>
      <footer className="p-4 text-center border-t border-neutral-300">
        <p className="font-bold max-sm:text-center">
          &copy; {new Date().getFullYear()} SIRA. All Right Reserved
        </p>
      </footer>
    </div>
  );
};

export default AuthPagesLayout;
