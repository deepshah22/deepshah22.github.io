import { createContext, ReactNode, useContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({ theme: "light" });

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
}) {
  return (
    <ThemeContext.Provider value={{ theme: defaultTheme }}>
      <div className={defaultTheme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
