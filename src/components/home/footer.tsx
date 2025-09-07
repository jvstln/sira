import Image from "next/image";
import Link from "next/link";
import React from "react";

const resourcesLinks = [
  { name: "Getting started", href: "#" },
  { name: "Send a report", href: "#" },
  { name: "Youtube", href: "#" },
];

const contactLinks = [
  { name: "SiraPhysics@gmail.com", href: "mailto:SiraPhysics@gmail.com" },
  { name: "+2349045898", href: "#" },
];

const Footer = () => {
  return (
    <footer className="section container space-y-4">
      <Image
        src="/images/logo.svg"
        alt="Sira Logo"
        className="logo max-sm:mx-auto"
        width={108}
        height={33}
      />
      <hr className="md:hidden" />

      <div className="grid sm:grid-cols-3 max-sm:text-center gap-8">
        <div className="resources">
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <div className="flex flex-col">
            {resourcesLinks.map(({ name, href }) => (
              <Link key={name + href} href={href}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="contact">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <div className="flex flex-col">
            {contactLinks.map(({ name, href }) => (
              <Link key={name + href} href={href}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="address">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <p>Greenfield High School123 Education LaneSpringfield, State, ZIP</p>
        </div>
      </div>

      <hr className="md:hidden" />
      <p className="font-bold max-sm:text-center">
        &copy; {new Date().getFullYear()} SIRA. All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
