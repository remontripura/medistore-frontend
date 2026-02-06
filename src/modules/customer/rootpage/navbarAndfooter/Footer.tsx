import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <MainContainer>
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className=" font-bold text-gray-900">
              <Image
                className="w-30"
                src="/logo.png"
                alt="logo"
                width={300}
                height={300}
              />
            </Link>{" "}
            <p className="text-gray-400 text-sm">
              Your trusted online medicine store. Fast delivery, authentic
              medicines, and healthcare products at your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="terms&conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Address</h3>
            <p className="text-gray-400 text-sm mb-4">
              Chittagong, Bangladesh.
            </p>

            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Medistore. All rights reserved.
        </div>
      </MainContainer>{" "}
    </footer>
  );
}
