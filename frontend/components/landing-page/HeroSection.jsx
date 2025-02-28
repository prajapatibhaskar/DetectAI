"use client";
import React from "react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="relative w-fit mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[2px]">
        <AnimatedGradientText>
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Introducing Detect AI
          </span>
        </AnimatedGradientText>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter">
          Detect your text <span className="block">in Seconds!</span>
        </h1>
        <p className="mx-auto max-w-3xl text-xl mb-8 px-4 sm:px-6 tracking-tighter text-muted-foreground">
  Provide your text, and our model will predict its classification.  
  Fast and efficient predictions in seconds.
</p>
      </div>

      <div>
        <Link href="/auth/login">
        <Button className="rounded-md text-base h-12 mt-4 border" variant="default">
          Get started! <ArrowRight />
        </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
