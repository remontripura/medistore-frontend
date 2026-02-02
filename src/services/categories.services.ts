import { env } from "@/env";
import { Categories } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const medicineServices = {
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
