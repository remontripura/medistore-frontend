
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userService } from "@/services/user.service";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Medistore | Profile",
  description: "Medistore",
};

export default async function ProfilePage() {
  const { data } = await userService.getSession();
  const user = data?.user;
  return (
    <section className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={user?.image || "/avatar.png"}
              alt="Profile Image"
              fill
              className="object-cover"
            />
          </div>

          <CardTitle className="text-xl font-semibold">
            {user?.name || "User Profile"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-center">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Email:</span>{" "}
            {user?.email}
          </div>

          {user?.phone && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Phone:</span>{" "}
              {user.phone}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
