import { env } from "@/env";
import { Medicine, Pagination, Product, updateMedicine } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
interface getMedicinsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
}

export interface medicineResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export const medicineServices = {
  getMedicine: async function (
    params?: getMedicinsParams,
    options?: ServiceOptions,
  ): Promise<medicineResponse<{ data: Product[]; pagination: Pagination }>> {
    try {
      const url = new URL(`${API_URL}/medicine`);
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

      config.next = { ...config.next, tags: ["medicine"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  addMedicine: async (medicineData: Medicine) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Medicine Add Succefully." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateMedicine: async (medicineData: updateMedicine, medicineId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/medicine/${medicineId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
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
  deleteMedicine: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/medicine/${medicineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Delete Faild." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
