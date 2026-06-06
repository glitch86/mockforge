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
  const { isLoaded, user } = useUser();
  console.log(user);

  return (
    <div className="bg-white dark:bg-zinc-950 shadow-lg sticky top-0">
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
              {user && (
                <NavigationMenuLink href="/dashboard">
                  Dashboard
                </NavigationMenuLink>
              )}
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
              {user ? (
                <Show when="signed-in">
                  <UserButton />
                </Show>
              ) : (
                <Show when="signed-out">
                  <SignUpButton>
                    <Button>Deploy Mock</Button>
                  </SignUpButton>
                </Show>
              )}
            </div>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
