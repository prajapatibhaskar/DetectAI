"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatTheme } from "./ChatTheme";

import { ChevronDown } from "lucide-react"; // Import the ChevronDown icon
import ChangeModel from "./changeModel";
import { useTab } from "../Contexts/TabContext"; // Import the useTab hook

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const { tab, setTab } = useTab(); // Access tab and setTab from context

  // Check if the screen is mobile or tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust this based on your needs
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-background/80 dark:bg-muted/50 backdrop-blur-md fixed top-0 px-8 py-2 z-50 shadow-sm overflow-hidden">
      <header className="container mx-auto flex items-center justify-between">
        <Logo />

        {/* ✅ Right section: Sign-in (desktop) + Avatar (both mobile & desktop) */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Show Sign-in button only if user is NOT logged in */}
          {!isUserLoggedIn && (
            <Link
              href="/auth/signup"
              className="text-sm font-medium hover:underline underline-offset-4 hidden md:block"
            >
              <Button className="border" variant="secondary">
                Sign in
              </Button>
            </Link>
          )}

          {/* Avatar stays at top right on mobile */}
          {isUserLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-3 z-50">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing">Pricing</Link>
                </DropdownMenuItem>
                <ChatTheme />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isMobile && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
              <ChangeModel />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navigation;
