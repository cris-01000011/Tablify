import { createContext, useState, useContext, useEffect } from "react";

const QuickAccessContext = createContext();

export const useQuickAccess = () => useContext(QuickAccessContext);

export const QuickAccessProvider = ({ children }) => {
  const [quickAccess, setQuickAccess] = useState(() => {
    const isQuickAccess = localStorage.getItem("QuickAccess");
    return isQuickAccess ? JSON.parse(isQuickAccess) : []; 
  });

  useEffect(() => {
    localStorage.setItem("QuickAccess", JSON.stringify(quickAccess))
  }, [quickAccess])

  return (
    <QuickAccessContext.Provider value={{ quickAccess, setQuickAccess }}>
      {children}
    </QuickAccessContext.Provider>
  );
}
