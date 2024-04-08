import React from 'react';
import useThemeMode from "../store/useThemeMode.ts";

interface DarkThemeProps {
  children: React.ReactNode;
}

export const DarkTheme = (props: DarkThemeProps) => {
  const [theme] = useThemeMode();

  return theme === 'dark' ? <>{props.children}</> : null;
};

interface LightThemeProps {
  children: React.ReactNode;
}

export const LightTheme = (props: LightThemeProps) => {
  const [theme] = useThemeMode();

  return theme === 'light' ? <>{props.children}</> : null;
};