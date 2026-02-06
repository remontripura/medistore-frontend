import { env } from "@/env";
import {
  Medicine,
  MedicineDetails,
  Pagination,
  Product,
  updateMedicine,
} from "@/types";
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

  getMedicineById: async function (
    id: string,
  ): Promise<medicineResponse<{ data: MedicineDetails }>> {
    try {
      const res = await fetch(`${API_URL}/medicine/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  addMedicine: async (medicineData: Medicine) => {
    try {
      const cookieStore = await cookies();
      const formData = new FormData();
      if (medicineData.name) formData.append("name", medicineData.name);
      if (medicineData.price) formData.append("price", medicineData.price);
      if (medicineData.stock !== undefined)
        formData.append("stock", String(medicineData.stock));
      if (medicineData.categoryId)
        formData.append("categoryId", medicineData.categoryId);
      if (medicineData.discount)
        formData.append("discount", medicineData.discount);
      if (medicineData.images) formData.append("images", medicineData.images);
      const res = await fetch(`${API_URL}/medicine`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Medicine add failed" },
        };
      }
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong" },
      };
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
