"use server";

import { reviewServices } from "@/services/review.services";
import { Categories, ReviewsType } from "@/types";
import { updateTag } from "next/cache";

export const createReview = async (data: ReviewsType, itemId: string) => {
  const res = await reviewServices.createReview(data, itemId);
  updateTag("reviews");
  return res;
};
