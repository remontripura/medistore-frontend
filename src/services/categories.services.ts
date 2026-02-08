import { env } from "@/env";
import { Categories, CategoryType, Pagination } from "@/types";
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

export interface categoryResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

const API_URL = env.API_URL;

export const categoriesServices = {
  getCategoris: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ): Promise<
    categoryResponse<{ data: CategoryType[]; pagination: Pagination }>
  > {
    try {
      const url = new URL(`${API_URL}/categories`);
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
      config.next = { ...config.next, tags: ["categories"] };
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  createCategories: async (categories: Categories) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
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
