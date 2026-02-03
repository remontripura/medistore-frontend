import { cn } from "@/lib/utils";
import React from "react";

export default function HeadingTwo({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h6 className={cn("font-semibold md:text-[20px] text-[16px]", className)}>
      {text}
    </h6>
  );
}
