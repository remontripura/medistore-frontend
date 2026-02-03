import { AddMedicineComponent } from "@/modules/seller/addMedicine/AddMedicineComponent";
import { categoriesServices } from "@/services/categories.services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medi Store | Add Medicine",
  description: "Medi Store",
};
export default async function AddMedicinePage() {
  const { data } = await categoriesServices.getCategoris();

  return <AddMedicineComponent categoriesItem={data?.data} />;
}
