"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { ArrowUp, RotateCcw, Plus, BotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChangeModel from "./changeModel";

import { useTab } from "../Contexts/TabContext"; // Import the useTab hook
import { MessageSchema } from "@/schema"; // Import the MessageSchema
import { Skeleton } from "./ui/skeleton";


export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const textareaRef = useRef(null);
  const msgEnd = useRef(null);
  const { tab, setTab } = useTab(); // Access tab and setTab from context
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(""); // State to store the validation error message

  const [isLoading, setIsLoading] = useState(false); // New state for loading

  // Disable browser scroll (add this globally in your CSS file)
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Auto-scroll when new message appears
  useEffect(() => {
    if (currentChat && msgEnd.current) {
      setTimeout(() => {
        msgEnd.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [currentChat]);

  // Auto-resize textarea while typing
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
    };

    adjustHeight();
    textarea.addEventListener("input", adjustHeight);

    return () => textarea.removeEventListener("input", adjustHeight);
  }, [message]);

  // Check if the screen is mobile or tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust this based on your needs
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Validate message input on every change
  const validateMessage = (msg) => {
    if (!msg.trim()) {
      setError(""); // Clear error if message is empty
      return;
    }

    const validationResult = MessageSchema.safeParse({ message: msg });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0]?.message || "Invalid message");
    } else {
      setError(""); // Clear error if valid
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
  
    // Validate the message before submission
    const validationResult = MessageSchema.safeParse({ message });
  
    if (validationResult.success) {
  
      // Show loading skeleton and clear the textarea
      setIsLoading(true);
      setMessage(""); // Clear message in textarea while loading
  
      // Choose the appropriate API endpoint based on the selected model (tab)
      const apiEndpoint =
        tab === "sequential" ? "/predict/sequential" : "/predict/bert";
      
      try {
        const response = await fetch("http://127.0.0.1:5000" + apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Server returned an error');
        }
  
        const data = await response.json();
        setCurrentChat({
          question: message,
          response: `Model: ${data.model}, Predicted Label: ${data.predicted_label}`,
        });
      } catch (error) {
        console.error(error); // Log the error
        setCurrentChat({
          question: message,
          response: "Error: Server is likely down",
        });
      }
  
      setIsLoading(false); // Stop loading after the response
      setIsSubmitted(true); // Mark as submitted
      setError(""); // Clear any error messages on successful submission
    } else {
      const errorMessage =
        validationResult.error.errors[0]?.message || "Invalid message";
      setError(errorMessage); // Set error message on validation failure
    }
  };
  
  

  const resetChat = () => {
    setIsSubmitted(false);
    setCurrentChat(null);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {!isMobile && (
        <div className="absolute top-[70px] left-[5%] md:left-[5%] lg:left-[13%] z-50">
          <ChangeModel setTab={setTab} tab={tab} />
        </div>
      )}

      {/* ✅ Show Intro only on first page load */}
      {!isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-1/3 flex flex-col items-center justify-center text-center -translate-y-1/4"
        >
          <AnimatedGradientText>
            <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Chat
            </span>
          </AnimatedGradientText>

          <h2 className="subHeading mt-4 px-5">
            Was this written by Human or AI?
          </h2>
          <p className="subText mt-4 text-center px-5">
            AI or human? Take a wild guess—or let us do the detective work for
            you!
          </p>
        </motion.div>
      )}

      {/* ✅ Messages Section - ShadCN Handles Scrolling */}
      <ScrollArea className="flex-1 px-4 transition-all min-h-[40vh] max-h-[70vh]">
        <div className="w-full max-w-2xl mx-auto pt-20">
          <AnimatePresence mode="popLayout">
            {isSubmitted && currentChat && (
              <motion.div
                key={currentChat.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl space-y-6 mt-2 pt-6"
              >
                <div className="flex flex-col gap-10 pt-10">
                  {/* ✅ User Question */}
                  <motion.div
                    key={`question-${currentChat.question}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block max-w-[85%] ml-auto rounded-2xl bg-muted px-5 py-3 text-right break-words whitespace-normal"
                  >
                    <p className="text-muted-foreground">
                      {currentChat.question}
                    </p>
                  </motion.div>
                  
                  {/* ✅ AI Response or Skeleton Loader */}
{isLoading ? (
  <div className="flex w-full items-center gap-1.5">
    <Skeleton className="h-9 w-9 rounded-lg" />
    <Skeleton className="w-1/4 p-4 rounded-2xl h-9" />
  </div>
) : (
  <motion.div
    key={`response-${currentChat.response}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="flex w-full items-center gap-1.5"
  >
    <div className="h-9 w-9 flex items-center justify-center rounded-lg border bg-muted">
      <BotIcon className="h-5 w-5 text-primary" />
    </div>
    <p
  className={`text-foreground ${
    currentChat.response === "Error: Server is likely down" ? 'bg-red-950 p-2 text-red-300 rounded-md' : ''
  }`}
>
  {currentChat.response === "Error: Server is likely down"
    ? currentChat.response
    : currentChat.response.includes('Predicted Label: 0')
    ? 'The text is likely Human Written'
    : 'The text is likely AI Generated'}
</p>
  </motion.div>
)}


                  {/* ✅ New Chat Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-5 rounded-2xl"
                      onClick={resetChat}
                    >
                      <RotateCcw className="h-4 w-4" />
                      New Chat
                    </Button>
                  </div>

                  <div ref={msgEnd} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ✅ ShadCN Scrollbar */}
        <ScrollBar />
      </ScrollArea>

      {/* ✅ Input Section - Always Stays at Bottom */}
      <div className="w-full p-4 fixed bottom-16 bg-background">
        <div className="relative max-w-3xl mx-auto">
          {/* Parent Container */}
          <div className="flex items-center bg-background rounded-3xl shadow-lg pb-3 border border-gray-400 dark:border-muted dark:bg-muted">
            {/* ✅ ScrollArea only for Textarea */}
            <ScrollArea className="w-full">
              <div className="px-4 pt-4 outline-none border-none w-full dark:bg-muted rounded-3xl">
                <Textarea
                  placeholder="Paste your text"
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    validateMessage(e.target.value); // Validate on each change
                  }}
                  onKeyDown={handleKeyDown}
                  className="resize-none w-full min-h-[50px] max-h-[210px] overflow-y-auto dark:bg-muted"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
                {/* Error message */}
              </div>
              <ScrollBar />
            </ScrollArea>

            {/* Buttons Container */}
            <div className="flex self-end gap-2 pr-4 mt-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleSubmit}
                      className="h-10 w-10 rounded-xl hover:bg-background"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Always Sticky Footer (Never Moves) */}
      <p className="text-center text-xs text-muted-foreground p-4 fixed bottom-0 w-full bg-background">
        Detect AI can make mistakes. Check important info.
      </p>
    </div>
  );
}
