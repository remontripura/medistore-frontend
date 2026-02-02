"use server";

import { usersServices } from "@/services/adminUsers";
import { updateTag } from "next/cache";


export const updateUserStatus = async (
  userStatus: { status: string },
  userId: string,
) => {
  const res = await usersServices.updateUserStatus(userStatus, userId!);
  updateTag("user");
  return res;
};
