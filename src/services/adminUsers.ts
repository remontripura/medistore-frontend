import { env } from "@/env";
import { Pagination, UserType } from "@/types";
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

export const usersServices = {
  getAllUsers: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ): Promise<categoryResponse<{ data: UserType[]; pagination: Pagination }>> {
    try {
      const url = new URL(`${API_URL}/user/admin`);
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
      config.next = { ...config.next, tags: ["user"] };
      const cookieStore = await cookies();
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: ["user"],
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateUserStatus: async (
    userStatus: { status: string },
    userId: string,
  ) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user/admin/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(userStatus),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Update Faild." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
