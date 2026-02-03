"use client";

import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
            <Link href="/cart">
              <Button variant="outline" className="p-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-2">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </MainContainer>
    </header>
  );
}
