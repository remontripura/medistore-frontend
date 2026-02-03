import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export function ProductCard({ product }: { product: Product | undefined }) {
  const {
    id,
    images,
    name,
    price,
    avg_ratings,
    discount,
    stock,
    total_reviews,
  } = product || {};
  const discountedPrice = discount
    ? Math.round(Number(price) - (Number(price) * Number(discount)) / 100)
    : price;

  return (
    <Link href={`/shop/${id}`}>
      <Card className="group p-1 cursor-pointer w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg gap-2">
        <div className="relative h-auto w-full">
          <div className="w-full overflow-hidden  rounded-lg">
            {images && (
              <Image
                src={images}
                alt="img"
                width={500}
                height={500}
                className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-32 rounded-lg"
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
            <span className="font-medium">{avg_ratings || 0}</span>
            <span className="text-muted-foreground">
              ({total_reviews || 0} reviews)
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
        <CardFooter className="px-2 ">
          <Button disabled={stock === 0} className="w-full rounded-lg">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
