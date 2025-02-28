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

const Pricing = () => {
  // State to track whether the user selects "monthly" or "yearly"
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Define pricing for both billing cycles
  const products = [
    {
      id: 1,
      name: "Free",
      priceString: billingCycle === "monthly" ? "₹0" : "₹0",
      billingInterval: billingCycle === "monthly" ? "/month" : "/year",
      description: "Get started with AI detection using the Sequential Model.",
      features: [
        "Sequential Model for AI detection",
        "Limited API calls (100/day)",
        "Basic accuracy level",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      id: 2,
      name: "Premium",
      priceString: billingCycle === "monthly" ? "₹200" : "₹1000",
      billingInterval: billingCycle === "monthly" ? "/month" : "/year",
      description: "Unlock the full power of AI with the BERT Model.",
      features: [
        "Advanced BERT Model for superior AI detection",
        "Unlimited API calls",
        "High accuracy & deep analysis",
        "Priority customer support",
        "Early access to new features",
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default",
    },
  ];

  return (
    <section className="w-full bg-muted flex flex-col items-center justify-center">
      <div className="w-full container px-6 sm:px-8 lg:mx-auto py-32 flex flex-col items-center justify-center space-y-8">
        <div className="text-center flex flex-col items-center justify-center">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Price
            </span>
          </AnimatedGradientText>

          <h1 className="mt-4 capitalize text-4xl font-bold">
            Choose the Plan for AI Text Detection
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mt-3">
            From simple AI text detection to in-depth analysis with advanced models like BERT, choose the plan that fits your requirements.
          </p>
        </div>

        <div>
          <Tabs
            onValueChange={setBillingCycle} // Update state when tab is clicked
            defaultValue="monthly"
            className="bg-background/50 border border-border p-1 rounded-xl shadow-md"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger className="font-semibold" value="monthly">
                Monthly
              </TabsTrigger>
              <TabsTrigger className="font-semibold" value="yearly">
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 mt-16 place-items-center mx-auto">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className={cn(
                  "border bg-background rounded-xl shadow-sm h-full min-h-[450px] w-full sm:w-[300px] lg:w-[400px] flex flex-col justify-between divide-y divide-border",
                  product.name === "Premium"
                    ? "border-primary bg-background drop-shadow-md"
                    : "border-border"
                )}
              >
                <div className="p-6 flex-1">
                  <h2 className="text-2xl leading-6 font-semibold text-foreground flex items-center justify-between">
                    {product.name}
                    {product.name === "Premium" && (
                      <Badge className="border-border font-semibold">
                        Most Popular
                      </Badge>
                    )}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mt-2">{product.description}</p>

                  {/* Dynamic Price */}
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-foreground">
                      {product.priceString}
                    </span>
                    <span className="text-base font-medium text-muted-foreground">
                      {product.billingInterval}
                    </span>
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-6 pb-8 px-6 flex-grow">
                  <h3 className="uppercase tracking-wide text-foreground font-medium text-sm">
                    What&apos;s included
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {product.features.map((feature, i) => (
                      <li className="flex space-x-3" key={i}>
                        <CircleCheck className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribe Button at the Bottom */}
                <div className="p-6 border-t border-border">
                  <Link href="/auth/login">
                    <Button
                      className="w-full font-semibold"
                      variant={
                        product?.name?.toLocaleLowerCase() === "premium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {product.name === "Premium" ? "Subscribe" : "Get Started"}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
