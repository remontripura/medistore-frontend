import MainContainer from "@/components/shared/mainContainer/MainContainer";
import PaginationControls from "@/components/ui/pagination-controls";
import UserMyOrder from "@/modules/seller/myOrder/UserMyOrder";
import { orderServices } from "@/services/order.services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | My Order",
  description: "Medistore",
};
export default async function MyOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await orderServices.getMyOrder({ page });
  const pagination = data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <section className="min-h-dvh">
      {data?.data.length === 0 ? (
        <div className="h-30 bg-blue-50 flex justify-center items-center">
          <p>You don&rsquo;t have any order</p>
        </div>
      ) : (
        <MainContainer>
          <UserMyOrder orderData={data?.data} />
          <PaginationControls meta={pagination} />
        </MainContainer>
      )}
    </section>
  );
}
