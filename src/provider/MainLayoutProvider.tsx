"use client";

import { Toaster } from "sonner";

export default function MainLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
