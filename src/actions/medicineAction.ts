"use server";

import { medicineServices } from "@/services/medicine.service";
import { Medicine } from "@/types";
import { updateTag } from "next/cache";

export const addMedicineAction = async (data: Medicine) => {
  const res = await medicineServices.addMedicine(data);
  updateTag("medicine");
  return res;
};
