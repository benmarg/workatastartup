import JobsContainer from "@/components/JobsContainer";
import JobsFilterContainer from "@/components/JobsFilterContainer";

type HomeProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="grid grid-cols-7 gap-4 pt-4">
      <JobsFilterContainer />
      <JobsContainer searchParams={searchParams} />
    </div>
  );
}
