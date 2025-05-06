"use client";

import * as React from "react";
import { Leaf, Settings2, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/member/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/member/dashboard/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="text-green-600" />
              <Logo />
            </div>
            {/* <div className="grid flex-1 text-left text-sm leading-tight">
              <h2 className="font-bold text-xl">Green Circle</h2>
            </div> */}
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
