"use client";

import React, { useState, useRef, useEffect } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
const TabsPage = () => {

  
  const [tab, setTab] = useState("sequential");

  return (
    <div className="absolute top-20 left-60">
      <Tabs defaultValue={tab} onValueChange={setTab} className="w-[250px]">
        <TabsList>
          <TabsTrigger value="sequential">Sequential</TabsTrigger>
          <TabsTrigger value="bert">BERT</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
  
}

export default TabsPage