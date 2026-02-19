import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import PaginationControls from "@/components/ui/pagination-controls";
import { ProductCard } from "@/modules/customer/rootpage/products/ProductCard";
import { medicineServices } from "@/services/medicine.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medicare | Category",
  description: " Medicare | Category",
};

interface PageProps {
  params: { id: string };
  searchParams: Promise<{ page?: string }>;
}

export default async function SingleShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: medicineData } = await medicineServices.getMedicineByCategory(
    undefined,
    undefined,
    id,
  );

  return (
    <div className="w-full py-8">
      <HeadingOne
        text={`${medicineData?.data[0].name}`}
        className="capitalize text-center"
      />
      <MainContainer>
        <div className="mt-8 grid md:grid-cols-5 grid-cols-2 gap-5">
          {medicineData?.data.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {medicineData?.pagination && (
          <PaginationControls meta={medicineData.pagination} />
        )}
      </MainContainer>
    </div>
  );
}
