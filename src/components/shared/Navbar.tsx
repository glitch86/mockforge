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

const Navbar = () => {
  return (
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

          <div>
            <Button>Deploy Mock</Button>
          </div>
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default Navbar;
