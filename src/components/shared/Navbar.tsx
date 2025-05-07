"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GFormInput from "./Form/GFormInput";
import { useForm } from "react-hook-form";
import { TUserProfile } from "@/types/user.type";
import {
  Info,
  LayoutDashboard,
  LogOut,
  Palette,
  PencilLine,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMyProfile, logoutUser } from "@/services/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const form = useForm();
  const pathname = usePathname();
  const [myProfile, setMyProfile] = useState<TUserProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await getMyProfile();
      setMyProfile(data);
    }
    fetchProfile();
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Ideas", path: "/ideas" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    ...(user ? [{ label: "Dashboard", path: `/${user?.role}/dashboard` }] : []),
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#f3f8fd]">
      <nav className="p-4 flex items-center justify-between container mx-auto">
        <Logo />

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-green-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-[#1b2a5e] text-lg">
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

        {/* Desktop user section */}
        <div className="hidden md:block">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-[50px] h-[50px] cursor-pointer">
                  <AvatarImage
                    className="rounded-full border border-green-500"
                    src={myProfile?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border mt-2">
                <div className="text-center">
                  <Avatar className="mx-auto w-[50px] h-[50px]">
                    <AvatarImage
                      className="rounded-full border border-green-500"
                      src={myProfile?.image || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-semibold py-2">
                    {myProfile?.name}
                  </h1>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-500">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here.
                        </DialogDescription>
                      </DialogHeader>
                      <form>
                        <div className="mb-4 flex items-center">
                          <p className="w-[65px]">Name</p>
                          <GFormInput
                            name="name"
                            placeholder="Name"
                            control={form.control}
                            className="w-full px-3 py-2 border rounded bg-white"
                          />
                        </div>
                        <div className="mb-4 flex items-center">
                          <p className="w-[65px]">Image</p>
                          <GFormInput
                            name="image"
                            placeholder="Image URL"
                            control={form.control}
                            className="w-full px-3 py-2 border rounded bg-white"
                          />
                        </div>
                        <div className="mb-4 flex items-center">
                          <p className="w-[65px]">Email</p>
                          <GFormInput
                            name="email"
                            placeholder="Email"
                            control={form.control}
                            className="w-full px-3 py-2 border rounded bg-white"
                          />
                        </div>
                        <DialogFooter>Save Changes</DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <ul className="mt-4 divide-y divide-gray-200">
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/customer/all-products" className="flex gap-2">
                      <Palette size={18} /> All Ideas
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link
                      href={`/${user?.role}/dashboard`}
                      className="flex gap-2">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/customer/about" className="flex gap-2">
                      <Info size={18} /> About
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/customer/my-orders" className="flex gap-2">
                      <PencilLine size={18} /> Blogs
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="hover:bg-green-500 hover:text-white py-1 px-2 flex gap-2 cursor-pointer">
                    <LogOut size={18} /> Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-[#1b2a5e] font-medium">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={
                    pathname === item.path
                      ? "text-green-500 font-semibold block"
                      : "block"
                  }>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold w-full text-left mt-2">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-md font-semibold mt-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
