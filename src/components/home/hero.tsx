import React from "react";
import { MousePointer2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const summary = [
  { label: "Issues Fixed", value: "250 +" },
  { label: "Active Users", value: "1,200 +" },
  { label: "Avg. Time", value: "2 days" },
];

const HeroSection = () => {
  return (
    <>
      <section>
        <div className="max-w-200 mx-auto text-center flex items-center justify-center flex-col pt-10 gap-4">
          <div className="badge bg-linear-60 from-amber-500 to-yellow-300 w-fit p-0.5 rounded-full">
            <div className="badge-inner text-sm flex items-center gap-2 bg-neutral-100 rounded-full py-1 px-2">
              Spot It, Report It, Improve It{" "}
              <MousePointer2 size={16} className="rotate-z-90" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold">
            Enhancing Our Department, One Report at a Time
          </h1>
          <p>
            The Maintenance of our department starts with you. See a wobbly
            chair? Leaky faucet? Any faulty facility? Speak up! Your report
            today equals a better department tomorrow.
          </p>
          <Button className="min-w-40" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>

          <div className="image-wrapper p-3 rounded-md bg-primary/30">
            <Image
              src="/images/woman-sitting-and-working-on-laptop.png"
              alt=""
              className="hero-image w-full rounded-md"
              width={3508}
              height={1740}
            />
          </div>
        </div>
      </section>
      <div className="ribbon flex justify-around w-full bg-primary p-4 text-white text-sm">
        {summary.map(({ label, value }) => (
          <div
            className="summary flex flex-col items-center"
            key={label + value}
          >
            <div className="text-lg font-medium">{value}</div>
            {label}
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
