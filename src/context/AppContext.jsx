import { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { theme, setTheme } = useTheme();

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
}
