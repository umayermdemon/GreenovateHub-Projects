"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logoutUser } from "@/services/auth";
import { protectedRoutes } from "@/const";
import { LogOut } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  userData: {
    image: string;
  };
}

const Navbar = ({ userData }: NavbarProps) => {
  const { user, setIsLoading } = useUser();
  console.log(userData);
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Ideas", path: "/ideas" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      return router.push("/");
    }
  };

  return (
    <div className="bg-[#f3f8fd]">
      <nav className="p-6 flex items-center justify-between container mx-auto">
        {/* Logo */}
        <Logo />

        {/* Menu Items */}
        <ul className="flex items-center space-x-6 font-medium text-[#1b2a5e] text-lg">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={
                  pathname === item.path ? "text-green-500 font-semibold" : ""
                }>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {user ? (
          <Popover>
            <PopoverTrigger asChild className="rounded-full">
              <Image
                src={userData?.image}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full cursor-pointer object-fill h-12 w-12 border-2 border-green-600"
              />
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="grid gap-4">
                <ul className="py-2">
                  <li>
                    <Link
                      href={`/${user?.role}/dashboard`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 flex items-center justify-start cursor-pointer text-red-700 hover:bg-red-100">
                      <LogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            href="/login"
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            Sign In
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
