"use server";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchParamsSchema } from "../validations";

export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export async function getJobs(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ jobs: Job[] }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { query, page = 1 } = params;

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    const jobs = data.data;

    return { success: true, data: { jobs: JSON.parse(JSON.stringify(jobs)) } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
