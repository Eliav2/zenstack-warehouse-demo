import { atom, useRecoilState } from "recoil";
import { localStorageEffect } from "./utils.ts";

export type ThemeMode = "dark" | "light";

const themeModeTableSettingsStorageSync = localStorageEffect<ThemeMode>(
  "themeMode",
  "1",
);

const themeModeState = atom<ThemeMode>({
  key: "theme-mode-state",
  default: "light",
  effects: [themeModeTableSettingsStorageSync],
});

function useThemeMode() {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  return [themeMode, setThemeMode] as const;
}

export default useThemeMode;
