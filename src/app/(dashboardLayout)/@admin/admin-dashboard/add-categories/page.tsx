import PaginationControls from "@/components/ui/pagination-controls";
import { AddCategoriesForm } from "@/modules/admin/addCategories/AddCategoriesForm";
import { AllCategories } from "@/modules/admin/addCategories/AllCategories";
import { categoriesServices } from "@/services/categories.services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Admin Dashboard",
  description: "Admin Dashboard",
};
export default async function AddCAtegories({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await categoriesServices.getCategoris(
    { page },
    {
      revalidate: 60,
    },
  );
  const pagination = data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <section>
      <div className=" px-3">
        <AddCategoriesForm />
        <AllCategories categoryData={data} />
        <PaginationControls meta={pagination} />
      </div>
    </section>
  );
}
