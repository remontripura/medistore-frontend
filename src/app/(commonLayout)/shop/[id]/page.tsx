import ReviewPageComponent from "@/modules/customer/shop/Review";
import ShopDetails from "@/modules/customer/shop/ShopDetails";
import { medicineServices } from "@/services/medicine.service";
import { reviewServices } from "@/services/review.services";
import { userService } from "@/services/user.service";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
  searchParams: Promise<{ page?: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: medicineData } = await medicineServices.getMedicineById(id);
  const medicine = medicineData?.data.name;
  const seoTitle = medicine;
  const seoDescription = medicine;
  const seoKeywords = medicine;
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: medicineData?.data.images ?? "",
          width: 1200,
          height: 630,
          alt: medicine,
        },
      ],
      type: "website",
    },
  };
}
export default async function SingleShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await medicineServices.getMedicineById(id);
  const { data: userData } = await userService.getSession();
  const { data: review } = await reviewServices.getReview(
    undefined,
    undefined,
    id,
  );
  return (
    <div>
      <ShopDetails shopData={data?.data} userData={userData} />
      <ReviewPageComponent shopData={data?.data} itemId={id} reviews={review?.data || []} />
    </div>
  );
}
