import { categoriesServices } from "@/services/categories.services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | My Order",
  description: "Medistore",
};
export default async function AddCAtegories({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await categoriesServices.getCategoris({ page });

  return (
    <section>
  
    </section>
  );
}
