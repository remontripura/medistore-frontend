"use server";

import { usersServices } from "@/services/adminUsers";
import { UserData, userService } from "@/services/user.service";
import { updateTag } from "next/cache";

export const updateUserStatus = async (
  userStatus: { status: string },
  userId: string,
) => {
  const res = await usersServices.updateUserStatus(userStatus, userId!);
  updateTag("user");
  return res;
};

export const updateUser = async (userStatus: UserData) => {
  const res = await userService.updateUser(userStatus);
  updateTag("user");
  return res;
};
export const getSession = async () => {
  const res = await userService.getSession();
  return res;
};
