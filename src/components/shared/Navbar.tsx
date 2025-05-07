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
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMyProfile, logoutUser } from "@/services/auth";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  ];
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="bg-[#f3f8fd]">
      <nav className="p-6 flex items-center justify-between container mx-auhref">
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
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className=" w-[50px] h-[50px] cursor-pointer">
                  <AvatarImage
                    className=" rounded-full  border border-green-500"
                    src={myProfile?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 border border-sky-500bg-gradient-href-b from-sky-400 href-gray-100 mr-3 mt-2">
                <div className="">
                  <div className="flex justify-center">
                    <Avatar className=" w-[50px] h-[50px] cursor-pointer">
                      <AvatarImage
                        className=" rounded-full border border-green-500"
                        src={
                          myProfile?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <h1 className="text-xl font-semibold text-center py-2">
                    {myProfile?.name}
                  </h1>
                  <div className="flex justify-center">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-500"> Edit Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes href your profile here. Click save when
                            you re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <form>
                            <div className="mb-4 flex ">
                              <p className="text-left w-[65px] mt-1">Name</p>
                              <GFormInput
                                name="name"
                                placeholder="Name"
                                control={form.control}
                                className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                              />
                            </div>
                            <div className="mb-4 flex ">
                              <p className="text-left mt-1 w-[65px]">Image</p>
                              <GFormInput
                                name="image"
                                placeholder="Name"
                                control={form.control}
                                className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                              />
                            </div>
                            <div className="mb-4 flex ">
                              <p className="text-left mt-1 w-[65px]">Email</p>
                              <GFormInput
                                name="email"
                                placeholder="Email"
                                control={form.control}
                                className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                              />
                            </div>

                            <DialogFooter>Save Changes</DialogFooter>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="block">
                  <ul className="divide-y divide-gray-300  mt-2">
                    <li className="hover:bg-green-500 hover:text-white py-1 px-2 w-full">
                      <Link
                        className={`flex gap-1`}
                        href="/cushrefmer/all-products">
                        {" "}
                        <Palette className="relative top-1" size={18} /> All
                        Ideas
                      </Link>
                    </li>
                    <li className="hover:bg-green-500 hover:text-white py-1 px-2 w-full">
                      <Link
                        className={`flex gap-1`}
                        href={`/${user?.role}/dashboard`}>
                        <LayoutDashboard className="relative top-1" size={18} />{" "}
                        Dashboard
                      </Link>
                    </li>
                    <li className="hover:bg-green-500 hover:text-white py-1 px-2 w-full">
                      <Link className={`flex gap-1`} href="/cushrefmer/about">
                        <Info className="relative top-1" size={18} /> About
                      </Link>
                    </li>
                    <li className="hover:bg-green-500 hover:text-white py-1 px-2 w-full">
                      <Link
                        className={`flex gap-1`}
                        href="/cushrefmer/my-orders">
                        <PencilLine className="relative top-1" size={18} />{" "}
                        Blogs
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="hover:bg-green-500  hover:text-white py-1 px-2 w-full flex cursor-pointer">
                      <LogOut className="relative top-1" size={18} /> Logout
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
