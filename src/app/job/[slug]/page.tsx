import JobsButtons from "@/components/JobsButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { USDollarCompact, capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { type FC } from "react";

type JobPageProps = {
  params: { slug: string };
};

const JobPage: FC<JobPageProps> = async ({ params }) => {
  const slug = params.slug;

  const job = await api.company.getJobListing({ jobId: slug });

  if (!job || !job.Company) {
    return <div>Job not found</div>;
  }

  return (
    <>
      <div className="pt-8">
        <span>
          <a className="cursor-pointer text-blue-500">Companies</a> /{" "}
          <a className="cursor-pointer text-blue-500">{job?.Company.name}</a> /{" "}
          {job.title}
        </span>
      </div>
      <div className="mt-6 rounded-md border border-gray-300 bg-beigelight px-2 py-10 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <Image
              className="h-max-24 aspect-square max-w-24"
              src={job.Company.profilePictureUrl}
              alt={job?.Company.name}
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {job.title} at {job.Company.name} ({job.Company.batch})
              </h1>
              <h2>{job?.Company.description}</h2>
              <div className="flex gap-1">
                <Badge className="w-fit text-sm" variant="outline">
                  <MapPin className="mr-1 h-4 w-4" />
                  {job.Company.location}
                </Badge>
                <Badge className="w-fit text-sm" variant="outline">
                  <Users className="mr-1 h-4 w-4" />
                  {job.Company.headCount} People
                </Badge>
                <Badge className="w-fit text-sm" variant="outline">
                  <Clock className="mr-1 h-4 w-4" />
                  {job?.ExperienceRequired}+ Years
                </Badge>
              </div>
            </div>
          </div>
          <JobsButtons jobId={job.id} userId={"123"} />
        </div>
        <div className="mt-4 flex flex-col gap-4 whitespace-break-spaces">
          <h3 className="whitespace-break-spaces text-xl font-medium">
            About {job.Company.name}
          </h3>
          {job.Company.about}
          <h3 className="text-xl font-medium">Job Description</h3>
          <p className="whitespace-break-spaces">{job.description}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        <h3 className="text-xl font-medium">
          Other Jobs at {job.Company.name}
        </h3>
        <div className="mt-4 flex w-full flex-col gap-4">
          {job.Company.JobListings.map((job) => (
            <div
              key={job.id}
              className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-beigelight p-2"
            >
              <div className="flex flex-wrap gap-2">
                <a className="ml-5 font-bold text-yc" href={`/job/${job.id}`}>
                  {job.title}
                </a>
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
              <Button>
                <a href={`/job/${job.id}`}>View Job</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobPage;
