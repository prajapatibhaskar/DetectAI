"use client";
import React, { useState } from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

const Footer = () => {

  return (
    <div className=" w-full bg-muted">
      <footer className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full items-center border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Detect AI Inc. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Privacy Policy
        </Link>
      </nav>
    </footer>
    </div>
  );
};

export default Footer;
