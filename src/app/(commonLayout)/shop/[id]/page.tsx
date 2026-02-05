import ShopDetails from "@/modules/customer/shop/ShopDetails";
import { medicineServices } from "@/services/medicine.service";
import { userService } from "@/services/user.service";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await medicineServices.getMedicineById(id);
  const { data: userData } = await userService.getSession();
  return (
    <div>
      <ShopDetails shopData={data?.data} userData={userData} />
    </div>
  );
}
