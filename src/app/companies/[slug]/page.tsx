import FavoriteIcon from "@/components/FavoriteIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { USDollarCompact, capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/server";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { MapPin, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type CompaniesPageProps = {
  params: { slug: string };
};

const CompaniesPage: FC<CompaniesPageProps> = async ({ params }) => {
  const slug = params.slug;

  const company = await api.company.getCompany({ id: slug });

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <>
      <div className="pt-8">
        <span>
          <Link className="cursor-pointer text-blue-500" href={"/"}>
            Companies
          </Link>{" "}
          / <span>{company.name}</span>
        </span>
      </div>
      <div className="mt-6 rounded-md border border-gray-300 bg-beigelight ">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex gap-6">
            <Image
              className="h-max-24 aspect-square max-w-24"
              src={company.profilePictureUrl}
              alt={company.name}
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {company.name} ({company.batch})
              </h1>
              <h2>{company.description}</h2>
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
                  {capitalizeFirstLetter(company.Industry)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300" />
        <div className="flex gap-8 px-4 py-4">
          <h3 className="text-sm font-medium">Founders</h3>
          <div className="flex flex-col gap-6">
            {company.founders.map((founder) => (
              <div key={founder.id} className="flex gap-2">
                <Image
                  className="aspect-square max-h-20 max-w-20 rounded-full"
                  src={founder.profilePictureUrl}
                  alt={founder.founderName}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{founder.founderName}</p>
                    <Link href={founder.linkedinUrl}>
                      <LinkedInLogoIcon className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="text-sm">{founder.founderDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-b border-gray-300" />
        <div className="flex gap-8 px-4 py-4">
          <h3 className="text-sm font-medium">About</h3>
          <p className="whitespace-break-spaces text-sm">{company.about}</p>
        </div>
        <div className="border-b border-gray-300" />
        <div className="flex gap-8 px-4 py-4">
          <h3 className="text-sm font-medium">Tech</h3>
          <p className="whitespace-break-spaces text-sm">{company.techStack}</p>
        </div>
        <div className="border-b border-gray-300" />
        <div className="flex gap-8 px-4 py-4">
          <h3 className="text-sm font-medium">Jobs</h3>
          <div className="flex w-full flex-col gap-4">
            {company.JobListings.map((job) => (
              <div key={job.id} className="flex w-full flex-col gap-1">
                <a className="ml-5 font-bold text-yc" href={`/job/${job.id}`}>
                  {job.title}
                </a>
                <div className="flex justify-between">
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="ml-5">
                      {capitalizeFirstLetter(job.commitment)}
                    </span>
                    <span>•</span>
                    <span>
                      {job.remote === "remoteOnly" && "Remote(US)"}
                      {job.remote === "remoteOk" && `${job.location} / Remote`}
                      {job.remote === "inPerson" && `${job.location}`}
                    </span>
                    <span>•</span>
                    <span>
                      {USDollarCompact.format(job.salaryLowerBound)} -
                      {USDollarCompact.format(job.salaryUpperBound)}
                    </span>
                    <span>•</span>
                    <span>{job.ExperienceRequired}+ Years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button>
                      <Link href={`/job/${job.id}`}>View Job</Link>
                    </Button>
                    <FavoriteIcon jobId={job.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
