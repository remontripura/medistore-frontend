import Medicines from "@/modules/seller/manageMedicine/Medicines";
import { medicineServices } from "@/services/medicine.service";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medi Store | Medicine",
  description: "Medi Store",
};
export default async function MedicinesPage() {
  const { data } = await medicineServices.getMedicine();
  return (
    <>
      <Medicines medicineData={data?.data} />;
    </>
  );
}
