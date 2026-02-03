import { cn } from "@/lib/utils";

export default function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("md:max-w-7xl mx-auto w-full px-3", className)}>
      {children}
    </div>
  );
}
