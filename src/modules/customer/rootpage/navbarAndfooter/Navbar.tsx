"use client";

import { getSession } from "@/actions/users.action";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useMedicineStore } from "@/store/addToCart.store";
import { Menu, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const medicine = useMedicineStore((state) => state.medicines);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getSession();
      setUser(data?.user);
    };
    fetchUser();
  }, []);
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Log Out");
          router.push("/");
          router.refresh()
        },
      },
    });
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <MainContainer>
        <nav className=" flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2 md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6 bg-white">
                <div className="flex flex-col space-y-6 text-gray-800 font-medium text-lg">
                  <Link href="/">Home</Link>
                  <Link href="/shop">Shop</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className=" font-bold text-gray-900">
              <Image
                className="w-30"
                src="/logo.png"
                alt="logo"
                width={300}
                height={300}
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/checkout">
              <Button variant="outline" className="p-2 relative cursor-pointer">
                <span className="bg-red-500 size-5 absolute -top-2 -right-2 text-white rounded-full">
                  {medicine.length ? medicine.length : 0}
                </span>
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {!user ? (
              <Link href="/login">
                <Button variant="outline" className="p-2 cursor-pointer">
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="p-2 cursor-pointer">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Link href="/user/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/update-profile">Update Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/change-password">Change Passwored</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/my-order">My Order</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={handleLogout}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      </MainContainer>
    </header>
  );
}
