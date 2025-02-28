import React, { createContext, useContext, useState } from "react";

// Create a Context
const TabContext = createContext();

// Create a provider component
export const TabProvider = ({ children }) => {
  const [tab, setTab] = useState("sequential");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTab = () => {
  return useContext(TabContext);
};
