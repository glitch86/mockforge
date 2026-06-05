import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import {
  FolderBookmarkIcon,
  History,
  Layers2,
  LucideIcon,
  Settings,
} from "lucide-react";

type Item = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const Appsidebar = () => {
  const items: Item[] = [
    {
      title: "Projects",
      url: "dashboard/projects",
      icon: FolderBookmarkIcon,
    },
    {
      title: "Environments",
      url: "dashboard/environtments",
      icon: Layers2,
    },
    {
      title: "Activity Log",
      url: "dashboard/log",
      icon: History,
    },
    {
      title: "Settings",
      url: "dashboard/settings",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <Image
                  src={"/images/logo.png"}
                  alt="logo"
                  width={30}
                  height={30}
                ></Image>
                <span>MockForge</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon></item.icon>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuBadge></SidebarMenuBadge>
              <SidebarMenuButton></SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default Appsidebar;
