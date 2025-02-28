import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

import { useTab } from "../Contexts/TabContext"; // Import the useTab hook

const ChangeModel = () => {

  const { tab, setTab } = useTab(); // Access tab and setTab from context

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] text-left flex items-center justify-start"
        >
          Change Model
          <ChevronDown className="mr-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-50">
        <DropdownMenuItem
          className={tab === "sequential" ? "bg-muted" : ""}
          onClick={() => setTab("sequential")} // Set "sequential" as selected
        >
          Sequential
        </DropdownMenuItem>
        <DropdownMenuItem
          className={tab === "bert" ? "bg-muted" : ""}
          onClick={() => setTab("bert")} // Set "bert" as selected
        >
          BERT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeModel;
