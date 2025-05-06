"use client";

import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Ideas", path: "/ideas" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

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
          <button className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-1">
            My Profile <ChevronDown size={16} />
          </button>
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
