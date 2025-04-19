"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Header = () => {
  return (
    <header className="@container p-4 md:px-8 bg-white border-b border-neutral-300">
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

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
};

const DesktopNav = () => (
  <nav className="hidden @sm:flex gap-4">
    <Button variant="ghost" className="text-primary" asChild>
      <Link href="/auth/login">Login</Link>
    </Button>
    <Button asChild>
      <Link href="/auth/signup">Get Started</Link>
    </Button>
  </nav>
);

const MobileNav = () => {
  // 'exiting' is only needed to animate out
  const [state, setState] = useState<"enter" | "exiting" | "exit">("exit");

  return (
    <nav className="@sm:hidden flex gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="[&_svg]:size-8"
        onClick={() => setState("enter")}
      >
        <Menu />
      </Button>

      {state !== "exit" && (
        <div
          className={cn(
            "overlay fixed flex z-30 inset-0 transition-colors duration-500 fill-mode-forwards",
            state === "enter"
              ? "bg-black/50"
              : "animate-out fade-out pointer-events-none"
          )}
          onClick={(e) => {
            if (
              e.target instanceof HTMLElement &&
              !e.target.closest(".nav-list")
            ) {
              setState("exiting");
            }
          }}
          onAnimationEnd={() => {
            if (state === "exiting") setState("exit");
          }}
        >
          <ul
            className={cn(
              "nav-list bg-white h-full overflow-y-auto max-w-xs grow p-4 flex flex-col gap-2 fill-mode-forwards",
              state === "enter"
                ? "animate-in slide-in-from-left"
                : "animate-out slide-out-to-left"
            )}
          >
            <li className="py-4">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="Sira Logo"
                  className="logo max-md:w-16 mx-auto"
                  width={108}
                  height={33}
                />
              </Link>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-primary" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </li>
            <li>
              <Button className="w-full" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </li>
          </ul>

          <Button variant="outline" size="icon" className="m-4">
            <X />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
