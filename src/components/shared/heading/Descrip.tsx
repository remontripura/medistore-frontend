import { cn } from "@/lib/utils";
import React from "react";

export default function Descript({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h6 className={cn("md:text-[14px] text-[16px] text-[#677372]", className)}>
      {text}
    </h6>
  );
}
