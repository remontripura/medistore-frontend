"use client";

import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import { useMedicineStore } from "@/store/addToCart.store";
import { MedicineDetails } from "@/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ShopDetailsProps {
  shopData: MedicineDetails | undefined;
  userData: {
    user: {
      id: string;
    };
  };
}

export default function ShopDetails({ shopData, userData }: ShopDetailsProps) {
  if (!shopData) {
    return null;
  }
  const addMedicine = useMedicineStore((state) => state.addMedicine);
  const { price, discount, images, name, stock } = shopData || {};
  const [count, setCount] = useState(1);
  const discountedPrice = discount
    ? Number(price) - (Number(price) * Number(discount)) / 100
    : Number(price);
  const handleIncrement = () => {
    if (count < 3 && count < stock) setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const totalPrice = discountedPrice * count;
  const router = useRouter();
  const handleStoreData = (data: MedicineDetails) => {
    if (userData === null) {
      return router.push("/login");
    }
    toast.success("Add To Cart Successfully!", { position: "top-center" });
    addMedicine({ ...data, count: count });
  };
  return (
    <section className="pt-16 py-8">
      <MainContainer>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center">
          <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={images}
              alt={name}
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex flex-col gap-6">
            <HeadingOne text={name} />

            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 bg-gray-200 disabled:opacity-50  aspect-square cursor-pointer hover:bg-gray-400"
                  disabled={count === 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-1">{count}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 bg-gray-200 disabled:opacity-50  aspect-square cursor-pointer hover:bg-gray-400"
                  disabled={count === 3 || count === stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {discount ? (
                <>
                  <span className="text-2xl font-bold text-green-600">
                    Tk {totalPrice.toFixed(2)}
                  </span>
                  <span className="line-through text-gray-400">
                    Tk {(Number(price) * count).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  ${totalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Link href="/checkout">
                <Button
                  onClick={() => handleStoreData(shopData)}
                  className="w-full md:w-auto bg-primarylite hover:bg-primarylite/80 text-gray-950 cursor-pointer"
                >
                  Buy Now
                </Button>
              </Link>
              <Button
                className="w-full md:w-auto border border-gray-300 text-gray-800 hover:bg-gray-300 bg-transparent cursor-pointer"
                onClick={() => handleStoreData(shopData)}
              >
                Add to Cart
              </Button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Stock:{" "}
              <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
                {stock}
              </span>
            </p>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
