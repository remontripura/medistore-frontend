import { cn } from "@/lib/utils";

export default function HeadingOne({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h6 className={cn("font-semibold md:text-[36px] text-[24px]", className)}>
      {text}
    </h6>
  );
}
