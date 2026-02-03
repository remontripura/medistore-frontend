"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainContainer from "@/components/shared/mainContainer/MainContainer";

export default function HeroSection() {
  return (
    <section className="relative bg-leniar-to-r from-green-50 to-white overflow-hidden md:h-175 h-auto md:pt-0 pt-20">
      <MainContainer className="flex items-center justify-between w-full h-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="md:text-[36px] text-[28px] font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Your Trusted Medicare Drug Store
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Quality medicines, health products, and wellness solutions
              delivered with care. Trusted by thousands for your family’s
              health.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <Link href="/shop">
                <Button className="bg-primarydeep text-white hover:bg-primarydeep/80 px-6 py-3 shadow-md cursor-pointer">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-6">
            <div className="relative">
              <img
                className="w-full rounded-xl shadow-xl"
                src="https://www.kanakkupillai.com/learn/wp-content/uploads/2023/10/Opening-a-Medical-Store-in-India.jpg"
                alt="Medicare Drug Store"
              />
              <div className="absolute inset-0 bg-linear-to-r from-green-100 to-transparent rounded-xl mix-blend-multiply pointer-events-none"></div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
