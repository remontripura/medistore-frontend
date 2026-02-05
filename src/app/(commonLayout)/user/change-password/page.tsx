import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { ChangePassword } from "@/modules/customer/changePassword/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Change Password",
  description: "Medistore",
};
export default async function ChangePasswordPage() {
  return (
    <section className="md:pt-20 pt-12">
      <MainContainer>
        <ChangePassword />
      </MainContainer>
    </section>
  );
}
