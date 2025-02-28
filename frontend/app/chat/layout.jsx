'use client';


import React, { useState } from "react";
import ChatNavBar from "@/components/ChatNavBar";
import { TabProvider } from "@/Contexts/TabContext";

const Chatlayout = ({ children }) => {

  return (
    <TabProvider>
    <section className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-background">
      <ChatNavBar />
        <main className="flex-1">{children}</main>
    </section>
    </TabProvider>
  );
};

export default Chatlayout;