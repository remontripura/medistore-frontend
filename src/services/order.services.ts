import { env } from "@/env";
import { Order, Pagination } from "@/types";
import { cookies } from "next/headers";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface orderValue {
  status: "APPROVED" | "REJECT";
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

export interface OrderData {
  address: string;
  items: {
    productId: string;
    quantity: number | undefined;
  }[];
}
const API_URL = env.API_URL;

export const orderServices = {
  getMyOrder: async function (
    params?: getMedicinsParams,
    options?: ServiceOptions,
  ): Promise<medicineResponse<{ data: Order[]; pagination: Pagination }>> {
    try {
      const url = new URL(`${API_URL}/order/my-order`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const cookieStore = await cookies();
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["my-order"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  crateOrder: async (orderData: OrderData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Something went wrong!" },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateOrder: async (orderData: orderValue, orderId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Update Faild." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
