import MyOrder from "@/modules/seller/myOrder/Myorder";
import { orderServices } from "@/services/order.services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medi Store | Medicine",
  description: "Medi Store",
};
export default async function MyOrderPage() {
  const { data } = await orderServices.getMyOrder();
  console.log(data);
  return (
    <>
      {" "}
      <MyOrder orderData={data?.data} />;{" "}
    </>
  );
}
