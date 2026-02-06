import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;
export interface UserData {
  name?: string | undefined;
  phone?: string | undefined;
  image?: File | undefined;
}

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateUser: async (userData: UserData) => {
    const formData = new FormData();
    if (userData.name) {
      formData.append("name", userData.name);
    }
    if (userData.phone) {
      formData.append("phone", userData.phone);
    }
    if (userData.image) {
      formData.append("image", userData.image);
    }
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data",
          Cookie: cookieStore.toString(),
        },
        body: formData,
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
