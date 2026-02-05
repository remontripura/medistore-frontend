import { redirect } from "next/navigation";
import { userService } from "@/services/user.service";
import CheckoutPageComponent from "@/modules/checkout/CheckoutPageComponent";

export default async function CheckoutPage() {
  const { data: userData } = await userService.getSession();
  if (!userData) {
    redirect("/login");
  }

  return <CheckoutPageComponent />;
}
