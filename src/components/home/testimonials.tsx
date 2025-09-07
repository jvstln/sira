import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    name: "Onyeka . U",
    description:
      "SIRA has made it super easy for us to report any problems we find around our department. I recently reported a broken desk in my classroom, and it was fixed within a few days! It's great to see that our admins takes our feedback seriously and are working hard to keep our environment safe and functional.",
    level: "200L",
    image: "/images/avatar-1.png",
  },
  {
    name: "Nene . B",
    description:
      "SIRA has made reporting issues around campus so simple and efficient. I submitted a report about a leaky faucet in the restroom, and it was addressed in no time! It’s clear that our concerns are taken seriously, and it’s great to see such prompt action from the admin team.",
    level: "400L",
    image: "/images/avatar-2.png",
  },
  {
    name: "Chidera . O",
    description:
      "I was really impressed with how quickly my report was resolved. I reported a faulty light in the corridor, and it was fixed over the weekend. It shows that our admins are committed to creating a comfortable learning environment for us.",
    level: "300L",
    image: "/images/avatar-3.png",
  },
  {
    name: "Uche . M",
    description:
      "I was having trouble accessing the department's website on my laptop, but after submitting a report, the IT department reached out to me and helped me resolve the issue. It's great to know that there's support available when we need it.",
    level: "100L",
    image: "/images/avatar-4.png",
  },
  {
    name: "Ugochi . E",
    description:
      "I was really impressed with how easy it was to report an issue using SIRA. The form was simple and easy to understand, and I was able to submit my report quickly and easily. It's great to see that our admins are making it easier for us to make a difference.",
    level: "500L",
    image: "/images/avatar-5.png",
  },
];

const Testimonials = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-center mb-2">Testimonials</h2>
      <div className="testimonials md:mx-20 md:overflow-hidden py-2">
        <div className="md:animate-marquee flex items-center flex-col md:flex-row md:w-fit gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.name + testimonial.level}
              {...testimonial}
            />
          ))}
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.name + testimonial.level}
              className="md:hidden"
              aria-hidden="true"
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial: React.FC<
  (typeof testimonials)[number] & { className?: string }
> = ({ name, description, image, level, className }) => (
  <div
    className={cn(
      "testimonial shrink-0 bg-white border border-neutral-300 w-75 md:w-100 max-md:text-sm px-8 pb-6 mt-6 rounded-lg flex flex-col gap-4",
      className
    )}
  >
    <div className="relative size-12">
      <Image
        src={image}
        alt=""
        className="image size-12 object-cover rounded-full mx-auto -mt-6 border border-neutral-300"
        fill
      />
    </div>
    <p>{description}</p>
    <div className="name font-bold my-auto">
      - {name}, {level}
    </div>
  </div>
);

export default Testimonials;
