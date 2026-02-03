import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

export default function CategorySection({
  category,
}: {
  category: CategoryType[] | undefined;
}) {
  if (!category || category.length === 0) return null;
  const displayCategories = category.slice(0, 5);

  return (
    <section className="w-full py-8">
      <HeadingOne text="Categories" className="text-center" />
      <MainContainer className="grid md:grid-cols-6 grid-cols-2 md:gap-5 gap-3 mt-5">
        {displayCategories.map((item) => (
          <Link href={`/category/${item.slug}`} key={item.id}>
            <div
              className={cn(
                "bg-blue-400 cursor-pointer text-center rounded-lg py-4 text-gray-800 text-[24px]",
                "hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out",
              )}
            >
              <p className="max-w-full truncate">{item.name}</p>
            </div>
          </Link>
        ))}

        {category.length > 5 && (
          <Link href="/categories" key="view-all">
            <div
              className={cn(
                "bg-gray-300 font-medium cursor-pointer text-center rounded-lg py-4",
                "hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out",
              )}
            >
              <p className="flex items-center justify-center group cursor-pointer text-[24px]">
                View All
                <FaAnglesRight className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300" />
              </p>
            </div>
          </Link>
        )}
      </MainContainer>
    </section>
  );
}
