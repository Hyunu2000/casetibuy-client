import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [iconColor, setIconColor] = useState("black");

  return (
    <ThemeContext.Provider value={{ iconColor, setIconColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
