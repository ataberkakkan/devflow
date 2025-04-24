interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}

interface Answer {
  _id: string;
  author: Author;
  question: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}

interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}

interface Job {
  job_id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
  location?: string;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

interface GlobalSearchedItem {
  id: string;
  type: "question" | "answer" | "user" | "tag";
  title: string;
}

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
type APIErrorResponse = NextResponse<ErrorResponse>;
