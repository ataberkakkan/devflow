import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

interface JobLocationProps {
  job_country?: string;
  job_city?: string;
  job_state?: string;
}

const JobLocation = ({
  job_country,
  job_city,
  job_state,
}: JobLocationProps) => {
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      <Image
        src={`https://flagsapi.com/${job_country}/flat/64.png`}
        alt="country symbol"
        width={16}
        height={16}
        className="rounded-full"
      />

      <p className="body-medium text-dark400_light700">
        {job_city && `${job_city}, `}
        {job_state && `${job_state}, `}
        {job_country && `${job_country}`}
      </p>
    </div>
  );
};

const JobCard = ({ job }: JobCardProps) => {
  const {
    employer_logo,
    job_employment_type,
    job_title,
    job_description,
    job_apply_link,
    job_city,
    job_state,
    job_country,
  } = job;

  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <JobLocation
          job_country={job_country}
          job_city={job_city}
          job_state={job_state}
        />
      </div>

      <div className="flex items-center gap-6">
        <Image
          src={employer_logo || "/images/site-logo.svg"}
          alt="default site logo"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{job_title}</p>

          <div className="hidden sm:flex">
            <JobLocation
              job_country={job_country}
              job_city={job_city}
              job_state={job_state}
            />
          </div>
        </div>

        <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">
          {job_description?.slice(0, 200)}
        </p>

        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />

              <p className="body-medium text-light-500">
                {job_employment_type}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/icons/currency-dollar-circle.svg"
                alt="dollar symbol"
                width={20}
                height={20}
              />

              <p className="body-medium text-light-500">Not disclosed</p>
            </div>
          </div>

          {job_apply_link ? (
            <Link
              href={job_apply_link}
              target="_blank"
              className="flex items-center gap-2"
            >
              <p className="body-semibold primary-text-gradient">View job</p>

              <Image
                src="/icons/arrow-up-right.svg"
                alt="arrow up right"
                width={20}
                height={20}
              />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default JobCard;
