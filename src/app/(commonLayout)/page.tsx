import Banner from "@/modules/customer/rootpage/banner/Banner";
import CategorySection from "@/modules/customer/rootpage/categorySection/CategorySection";
import FaqSection from "@/modules/customer/rootpage/faq/FaqSection";
import HeroSection from "@/modules/customer/rootpage/heroSection/HeroSection";
import Products from "@/modules/customer/rootpage/products/Products";
import SearchBar from "@/modules/customer/searchbar/SearchBar";
import { categoriesServices } from "@/services/categories.services";
import { medicineServices } from "@/services/medicine.service";

export default async function Home() {
  const { data } = await medicineServices.getMedicine();
  const { data: category } = await categoriesServices.getCategoris(undefined, {
    revalidate: 60,
  });
  return (
    <div>
      <SearchBar />
      <HeroSection />
      <CategorySection category={category?.data} />
      <Products productData={data?.data} />
      <Banner />
      <FaqSection />
    </div>
  );
}
