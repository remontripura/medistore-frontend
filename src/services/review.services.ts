import { env } from "@/env";
import { CategoryType, Pagination, Review, ReviewsType } from "@/types";
import { cookies } from "next/headers";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
}

export interface ReviewResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

const API_URL = env.API_URL;

export const reviewServices = {
  getReview: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
    itemId?: string
  ): Promise<ReviewResponse<{ data: Review[]; pagination: Pagination }>> {
    try {
      const url = new URL(`${API_URL}/review/${itemId}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["reviews"] };
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  createReview: async (categories: ReviewsType, itemId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/review/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(categories),
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
