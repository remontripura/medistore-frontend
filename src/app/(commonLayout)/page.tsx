import CategorySection from "@/modules/customer/rootpage/categorySection/CategorySection";
import HeroSection from "@/modules/customer/rootpage/heroSection/HeroSection";
import Products from "@/modules/customer/rootpage/products/Products";
import { categoriesServices } from "@/services/categories.services";
import { medicineServices } from "@/services/medicine.service";

export default async function Home() {
  const { data } = await medicineServices.getMedicine();
  const { data: category } = await categoriesServices.getCategoris(undefined, {
    revalidate: 60,
  });
  return (
    <div>
      <HeroSection />
      <CategorySection category={category?.data} />
      <Products productData={data?.data} />
    </div>
  );
}
