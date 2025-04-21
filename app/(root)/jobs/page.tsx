import CommonFilter from "@/components/filters/CommonFilter";
import JobsFilter from "@/components/filters/JobsFilter";
import LocalSearch from "@/components/search/LocalSearch";

const FindJobs = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, location } = await searchParams;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/jobs"
          imgSrc="/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <JobsFilter otherClasses="min-h-[56px] sm:min-w-[300px]" />
      </div>

      {/* Display Jobs */}
    </div>
  );
};
export default FindJobs;
