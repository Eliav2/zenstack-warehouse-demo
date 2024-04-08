import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import useFinalTheme from "./useFinalTheme.ts";

export type CustomThemeProviderProps = {
  children: React.ReactNode;
};

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const finalTheme = useFinalTheme();
  return <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
