"use client";
import { dashboardLinks } from "@/components/links";
import { getCurrentUser } from "@/services/api/user.api";
import api from "@/services/axios.config";
import Link from "next/link";

const DashboardHome = () => {
  return (
    <div>
      <div className="pill bg-yellow-500 rounded-full text-xs px-2 py-1 inline-block">
        Tip of the day
      </div>
      <div className="tip font-bold w-[40ch] my-4">
        When you make a report, you are helping to make our department a better
        place.
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {dashboardLinks
          .filter((link) => link.name !== "Home")
          .map(({ name, description, icon, href }) => (
            <Link
              key={name + href}
              href={href}
              className="bg-primary/10 hover:bg-primary/20 hover:shadow px-4 py-8 rounded-lg max-w-[60ch] basis-[30ch]"
            >
              <div className="icon bg-background w-fit p-3 rounded">{icon}</div>
              <h3 className="font-bold mt-4">{name}</h3>
              {description}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DashboardHome;
