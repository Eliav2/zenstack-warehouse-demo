import { atom, useRecoilState } from "recoil";
import { localStorageEffect } from "./utils.ts";

export type DrawerOpenType = boolean;

const themeModeTableSettingsStorageSync = localStorageEffect<DrawerOpenType>(
  "ExpandStagesSidebar",
  "1",
);

const themeModeState = atom<DrawerOpenType>({
  key: "ExpandStagesSidebar",
  default: false,
  effects: [themeModeTableSettingsStorageSync],
});

function useExpandStagesSidebar() {
  const [open, setOpen] = useRecoilState(themeModeState);

  return [open, setOpen] as const;
}

export default useExpandStagesSidebar;
