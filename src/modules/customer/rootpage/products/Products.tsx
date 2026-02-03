import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export default function Products({
  productData,
}: {
  productData: Product[] | undefined;
}) {
  return (
    <div className="w-full py-8">
      <MainContainer>
        <div className="mt-8 grid grid-cols-5 gap-5">
          {productData?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </MainContainer>
    </div>
  );
}
