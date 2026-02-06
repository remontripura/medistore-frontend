import PaginationControls from "@/components/ui/pagination-controls";
import Products from "@/modules/customer/rootpage/products/Products";
import { medicineServices } from "@/services/medicine.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | shop",
  description: "Medistore",
};

export default async function MyOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await medicineServices.getMedicine({ page });
  const pagination = data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <Products productData={data?.data} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
