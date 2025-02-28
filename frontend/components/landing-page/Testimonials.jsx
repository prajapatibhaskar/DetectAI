"use client";
import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

const reviews = [
  {
    name: "Michael",
    username: "@michael",
    body: "Detect AI is fast and accurate. I use it every day!",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Sophia",
    username: "@sophia",
    body: "I tested many AI detection tools, but this one actually works.",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "David",
    username: "@david",
    body: "Super useful! It makes checking AI-generated text effortless.",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Emily",
    username: "@emily",
    body: "This tool is a lifesaver for my work. It helps me spot AI-generated content instantly.",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Alex",
    username: "@alex",
    body: "It’s incredibly accurate and fast, making AI detection easier than ever!",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "Simple, reliable, and surprisingly effective. I highly recommend it!",
    img: "https://avatar.vercel.sh/olivia",
  },
];


const ReviewCard = ({
  img,
  name,
  username,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
        // light styles
        "border-primary/[.15] bg-muted/70 hover:bg-muted/80",
        
      )}
    >
      
      <blockquote className="mt-2 text-sm">{body}</blockquote>
      <div className="flex flex-row items-center gap-2 mt-2">
        <img className="rounded-full aspect-square" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      
    </figure>
  );
};
 
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full flex flex-col items-center justify-center py-32 overflow-hidden px-6 xs:px-8 sm:px-0 sm:x-8 lg:mx-auto"
    >
      <AnimatedGradientText>
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Testimonials
        </span>
      </AnimatedGradientText>

      <h2 className="subHeading mt-4">
        What Our Users Say
      </h2>
      <p className="subText mt-4 text-center">
      See what our users have to say about Detect AI! Read their experiences and discover how Detect AI can benefit you.
      </p>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-16">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap:2rem]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap:2rem] mt-1 sm:mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 sm:w-1/4 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 sm:w-1/4 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
    </section>
  );
};

export default Testimonials;
