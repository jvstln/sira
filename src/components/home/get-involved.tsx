import {
  FlagTriangleRight,
  MessageCircleHeart,
  RadioTower,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    title: "Report the issue",
    description:
      "If you notice any infrastructure issues, such as broken desks, malfunctioning equipment, or safety hazards, report them immediately. Your reports help us address problems quickly and efficiently.",
    icon: <FlagTriangleRight />,
  },
  {
    title: "Spread the word",
    description:
      "Tell your friends and classmates about the app. The more students who use it, the faster we can identify and fix issues. Share your experiences and show them how easy it is to report problems.",
    icon: <RadioTower />,
  },
  {
    title: "Participate in feedback",
    description: (
      <>
        We are always looking to improve the website. Participate in feedback
        sessions and surveys to share your thoughts and suggestions. Your
        insights can help us make the <span className="font-bold">SIRA</span>{" "}
        even better.&quot;,
      </>
    ),
    icon: <MessageCircleHeart />,
  },
];

const GetInvolvedSection = () => {
  return (
    <>
      <section>
        <h2 className="font-semibold text-3xl text-center mb-2">
          Get Involved
        </h2>
        <p className="text-center">
          Every Student&apos;s Voice Matters. <br /> Your input is crucial in
          maintaining a safe and functional learning environment.
        </p>
      </section>
      <section className="grid md:grid-cols-2 items-center gap-8 bg-primary/20 rounded-lg container mx-auto md:p-20">
        <div className="steps flex flex-col gap-8">
          {steps.map(({ title, description, icon }) => (
            <div
              key={title}
              className="step flex flex-col gap-2 max-md:items-center max-md:text-center"
            >
              <div className="step-icon w-fit p-1 border rounded-md">
                {icon}
              </div>
              <div className="step-title font-semibold text-lg">{title}</div>
              <div className="step-description">{description}</div>
            </div>
          ))}
          <Button size="lg" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
        <div className="image-wrapper">
          <Image
            src="/images/phone-mockup.png"
            alt="Phone app mockup"
            className="mockup w-90 justify-self-center"
            width={1440}
            height={2772}
          />
        </div>
      </section>
    </>
  );
};

export default GetInvolvedSection;
