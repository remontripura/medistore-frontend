
import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { UpdateProfileComponent } from "@/modules/customer/updateProfile/UpdateProfile";
import { userService } from "@/services/user.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Update Profile",
  description: "Medistore",
};

export default async function UpdateProfile() {
  const { data } = await userService.getSession();

  return (
    <section className="md:pt-20">
      <MainContainer>
        <HeadingOne text="Update Profile" className="text-center" />
        <div>
          <UpdateProfileComponent user={data} />
        </div>
      </MainContainer>
    </section>
  );
}
