import { Badge } from "@/components/ui/badge";
import {
  USDollarCompact,
  capitalizeFirstLetter,
  getHeadcountBound,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Remote } from "@prisma/client";
import { MapPin, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import FavoriteIcon from "./FavoriteIcon";
import { Button } from "./ui/button";

type JobsContainerProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const JobsContainer: FC<JobsContainerProps> = async ({ searchParams }) => {
  const search = searchParams?.search;
  let role = searchParams?.role;
  if (typeof role === "string") role = [role];
  const commitment = searchParams?.commitment;
  const companysize = searchParams?.companysize;
  const headcountBound = getHeadcountBound(companysize as string);
  const industry = searchParams?.industry;
  const experience = searchParams?.experience;
  const location = searchParams?.location;
  let remote = searchParams?.remote;
  if (typeof remote === "string") remote = [remote];
  const stage = searchParams?.stage;
  const demographic = searchParams?.demographic;
  const Companies = await api.company.getAll({
    ...headcountBound,
    //department: role,
    remote: remote as Remote[] | undefined,
  });

  return (
    <div className="col-span-5 overflow-auto">
      {[
        ...Companies,
        ...Companies,
        ...Companies,
        ...Companies,
        ...Companies,
        ...Companies,
      ].map((company) => (
        <div key={company.id} className="flex gap-2 bg-beigelight p-4 pr-6">
          <Link href={`/companies/${company.id}`} className="h-24 w-24">
            <Image
              src={company.profilePictureUrl}
              alt={company.name}
              width={100}
              height={100}
            />
          </Link>
          <div className="ml-2 flex flex-col gap-2">
            <Link href={`/companies/${company.id}`}>
              <p className="text-xl font-semibold">
                {company.name}
                <span className="pl-2 text-xs text-gray-500">
                  ({company.batch})
                </span>
              </p>
            </Link>
            <p className="text-sm">{company.description}</p>
            <div className="flex gap-1">
              <Badge className="w-fit text-sm" variant="outline">
                <MapPin className="mr-1 h-4 w-4" />
                {company.location}
              </Badge>
              <Badge className="w-fit text-sm" variant="outline">
                <Users className="mr-1 h-4 w-4" />
                {company.headCount} People
              </Badge>
              <Badge className="w-fit text-sm" variant="outline">
                <Tag className="mr-1 h-4 w-4" />
                {company.location}
              </Badge>
            </div>
            <div className="flex flex-col gap-6 pt-6">
              {company.JobListings.map((job) => (
                <div key={job.id} className="flex">
                  <div className="flex w-4/5 flex-col">
                    <a
                      href={`/job/${job.id}`}
                      className="text-xl font-medium hover:cursor-pointer hover:underline"
                    >
                      {job.title}
                    </a>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        {job.remote === "remoteOnly" && "Remote(US)"}
                        {job.remote === "remoteOk" &&
                          `${job.location} / Remote`}
                        {job.remote === "inPerson" && `${job.location}`}
                      </span>
                      <span>•</span>
                      <span>{capitalizeFirstLetter(job.commitment)}</span>
                      <span>•</span>
                      {job.visaRequired && (
                        <>
                          <span>Visa Required</span>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {USDollarCompact.format(job.salaryLowerBound)} -
                        {USDollarCompact.format(job.salaryUpperBound)}
                      </span>
                      <span>•</span>
                      <span>
                        {job.equityLowerBound.toFixed(2)}% -{" "}
                        {job.equityUpperBound.toFixed(2)}%
                      </span>
                      <span>•</span>
                      <span>{job.ExperienceRequired}+ Years</span>
                    </div>
                  </div>
                  <div className="flex w-1/5 items-center justify-between gap-1">
                    <Button className="w-4/5">
                      <a href={`/job/${job.id}`}>View Job</a>
                    </Button>
                    <FavoriteIcon jobId={job.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsContainer;
