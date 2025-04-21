import JobCard from "@/components/cards/JobCard";
import DataRenderer from "@/components/DataRenderer";
import JobsFilter from "@/components/filters/JobsFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { DEFAULT_EMPTY, EMPTY_JOBS } from "@/constants/states";
import { fetchLocation, getJobs } from "@/lib/actions/job.action";

const FindJobs = async ({ searchParams }: RouteParams) => {
  const { page, query, location } = await searchParams;

  const userLocation = await fetchLocation();

  const { success, data, error } = await getJobs({
    page: Number(page) || 1,
    query: query ? query : `Next.js Developer in ${userLocation}`,
  });

  const { jobs } = data || {};

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

      <DataRenderer
        success={success}
        error={error}
        data={jobs}
        empty={EMPTY_JOBS}
        render={(jobs) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      />
    </div>
  );
};
export default FindJobs;
