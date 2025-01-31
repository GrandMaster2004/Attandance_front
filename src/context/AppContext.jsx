import { createContext, useState } from "react";

// step 1
export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const value = {
    loading,
    setLoading,
    login,
    setLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
