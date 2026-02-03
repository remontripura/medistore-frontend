import ShopDetails from "@/modules/customer/shop/ShopDetails";
import { medicineServices } from "@/services/medicine.service";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await medicineServices.getMedicineById(id);
  return (
    <div>
      <ShopDetails shopData={data?.data} />
    </div>
  );
}
