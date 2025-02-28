"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import AuthHeader from "./auth-header";
import BackButton from "./back-button";
import { ModeToggle } from "../ThemeSwitch";
import { Button } from "../ui/button";
import Image from "next/image"
import AuthImg from "../../public/autumn-season-leafs-plant-scene-generative-ai.jpg"
import Logo from "../Logo";
import { Github } from "lucide-react";

const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side: Blank space */}
      <div className="hidden lg:block w-3/4 relative text-white">

        <div className="w-full h-[40%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10"/>
        <div className="w-full h-[30%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10"/>

        <Image src={AuthImg} alt="Auth image" fill className="w-full h-full object-cover"/>
        <div className="absolute top-10 left-10 z-10">
          <Logo />
        </div>

        <div className="absolute bottom-10 left-10 z-10 w-[90%]">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;Using Detect AI has drastically improved our ability to identify AI-generated text, saving us time and ensuring the authenticity of our content. It has streamlined our processes, allowing us to focus more on delivering valuable, original material to our audience.&rdquo;</p>
            <footer className="text-sm">Bhaskar P.</footer>
          </blockquote>
        </div>
      </div>

      {/* Right side: Form (CardWrapper) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center py-10 px-10">
        <Card className="w-full max-w-md shadow-md">
          {/* <ModeToggle /> */}
          <CardHeader>
            <AuthHeader label={label} title={title} />
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Flex container for buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full">
  <Button className="w-full py-2 px-4 font-semibold" variant="outline">
    Continue with Google
  </Button>
  <Button className="w-full py-2 px-4 font-semibold" variant="outline">
    Continue with GitHub
  </Button>
</div>



              {/* Separator with text */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-600">
                  or 
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* The children or the email input field */}
              {children}
            </div>
          </CardContent>

          <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardWrapper;
