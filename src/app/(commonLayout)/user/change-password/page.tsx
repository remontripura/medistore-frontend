import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { ChangePassword } from "@/modules/customer/changePassword/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Change Password",
  description: "Medistore",
};
export default async function ChangePasswordPage() {
  return (
    <section className="min-h-dvh">
      <MainContainer>
        <HeadingOne text="Changes your password" className="text-center"/>
        <ChangePassword />
      </MainContainer>
    </section>
  );
}
