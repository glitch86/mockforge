"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Logo from "./Logo";
import { Bell, FileQuestion } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../Theme/ThemeToggle";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) return <div>Loading..</div>;
  return (
    <div className="bg-neutral-900">
      <div className="container mx-auto flex items-center gap-3">
        <Logo></Logo>
        <NavigationMenu className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>Docs</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Pricing</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3 w-fit">
            <div>
              <Bell></Bell>
            </div>
            <div>
              <FileQuestion></FileQuestion>
            </div>

            <div className="flex flex-col justify-center">
              <Show when="signed-out">
                <SignUpButton>
                  <Button>Deploy Mock</Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
