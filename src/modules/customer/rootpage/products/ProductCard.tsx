"use client";

import { getSession } from "@/actions/users.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMedicineStore } from "@/store/addToCart.store";
import { MedicineDetails, Product } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product | undefined }) {
  const { id, images, name, price, avg_review, discount, stock, total_review } =
    product || {};
  const discountedPrice = discount
    ? Math.round(Number(price) - (Number(price) * Number(discount)) / 100)
    : price;
  const router = useRouter();
  const addMedicine = useMedicineStore((state) => state.addMedicine);

  const handleStoreData = async (data: MedicineDetails | undefined) => {
    if (!data) return;
    const { data: userData } = await getSession();
    if (userData === null) {
      return router.push("/login");
    }
    const storeData: MedicineDetails & { count: number } = {
      id: data.id,
      images: data.images,
      name: data.name,
      price: data.price,
      discount: data.discount,
      stock: data.stock,
      avg_review: data.avg_review,
      total_review: data.total_review,
      count: 1,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    addMedicine(storeData);
    toast.success("Add To Cart Successfully!", { position: "top-center" });
  };

  return (
    <Card className="group p-1 cursor-pointer w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg gap-2">
      <Link href={`/shop/${id}`}>
        <div className="relative h-auto w-full">
          <div className="w-full overflow-hidden  rounded-lg">
            {images && (
              <Image
                src={images}
                alt="img"
                width={500}
                height={500}
                className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-40 rounded-lg"
              />
            )}
          </div>
          {discount && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>
        <CardHeader className="gap-0 px-2">
          <CardTitle className="text-[18px] font-semibold">{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-2">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{avg_review || 0}</span>
            <span className="text-muted-foreground">
              ({total_review || 0} reviews)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              Tk {discountedPrice}
            </span>
            {discount && (
              <span className="text-sm text-muted-foreground line-through">
                Tk {price}
              </span>
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              Number(stock) > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {Number(stock) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="px-2 ">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.stopPropagation();
            if (product) handleStoreData(product);
          }}
          disabled={stock === 0}
          className="w-full rounded-full hover:text-white bg-gray-50 border border-gray-300 text-gray-800 cursor-pointer"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
