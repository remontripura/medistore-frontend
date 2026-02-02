"use server";

import { categoriesServices } from "@/services/categories.services";
import { Categories } from "@/types";
import { updateTag } from "next/cache";

export const createBlogPost = async (data: Categories) => {
  const res = await categoriesServices.createCategories(data);
  updateTag("categories");
  return res;
};
