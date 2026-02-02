import PaginationControls from "@/components/ui/pagination-controls";
import { GetAllUsers } from "@/modules/admin/users/GetAllUsers";
import { usersServices } from "@/services/adminUsers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Admin Dashboard",
  description: "Admin Dashboard",
};
export default async function AllUsers({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await usersServices.getAllUsers({ page });
  const pagination = data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <section>
      <div className=" px-3">
        <GetAllUsers users={data} />
        <PaginationControls meta={pagination} />
      </div>
    </section>
  );
}
