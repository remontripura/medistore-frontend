"use server";

import { medicineServices } from "@/services/medicine.service";
import { Medicine, updateMedicine } from "@/types";
import { updateTag } from "next/cache";

export const addMedicineAction = async (data: Medicine) => {
  const res = await medicineServices.addMedicine(data);
  updateTag("medicine");
  return res;
};
export const updateMedicineAction = async (
  medicineData: updateMedicine,
  medicineId: string,
) => {
  const res = await medicineServices.updateMedicine(medicineData, medicineId);
  updateTag("medicine");
  return res;
};
export const deleteMedicine = async (
  medicineId: string,
) => {
  const res = await medicineServices.deleteMedicine(medicineId);
  updateTag("medicine");
  return res;
};
