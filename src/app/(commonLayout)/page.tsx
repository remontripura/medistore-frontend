import { medicineServices } from "@/services/medicine.service";

export default async function Home() {
  const { data } = await medicineServices.getMedicine();
  console.log(data);
  return <p>This is home page</p>;
}
