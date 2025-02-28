"use client"


import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { ArrowUp, RotateCcw, Plus, BotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Temp = () => {

    const [message, setMessage] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)
    const textareaRef = useRef(null)
    const msgEnd = useRef(null)
  
    // Auto-scroll when new message appears
    useEffect(() => {
      if (currentChat && msgEnd.current) {
        setTimeout(() => {
          msgEnd.current.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }, [currentChat])
  
    // Auto-resize textarea while typing
    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
  
      const adjustHeight = () => {
        textarea.style.height = "auto"; // Reset height first
         textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
      };
  
      adjustHeight(); // Initial call
      textarea.addEventListener("input", adjustHeight);
  
      return () => textarea.removeEventListener("input", adjustHeight);
    }, [message]);
  
    const handleSubmit = () => {
      if (!message.trim()) return;
    
      const response = "AI Generated";
      setCurrentChat({ question: message, response });
      setMessage("");
      setIsSubmitted(true);
    
      // ✅ Blur the textarea to hide keyboard
      if (textareaRef.current) {
        textareaRef.current.blur(); // Removes focus, closing the keyboard
        textareaRef.current.style.height = "50px"; // Reset height
      }
    };
  
  
    const resetChat = () => {
      setIsSubmitted(false)
      setCurrentChat(null)
      setMessage("")
    }
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };


    return (
      
      <ScrollArea className="h-screen w-full overflow-y-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="w-[500px] flex flex-col items-center bg-background rounded-3xl shadow-lg pb-3 border border-gray-300 outline outline-1 outline-gray-400">
          
          {/* Textarea Container */}
          
          <div className="px-4 pt-4 outline-none border-none w-full">
            <Textarea 
              placeholder="Paste your text"
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="resize-none w-full min-h-[50px] max-h-[250px] overflow-y-auto"
            />
          </div>
    
          {/* Buttons Container */}
          <div className="flex self-end gap-2 pr-4">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className="h-8 w-8 rounded-lg hover:bg-muted"
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
              className="h-8 w-8 rounded-lg bg-primary text-primary-foreground hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          
        </div>
      </div>
      <ScrollBar />
      </ScrollArea>
    )
    
    
  
}

export default Temp