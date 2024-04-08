import useThemeMode from "../store/useThemeMode.ts";
import {createTheme} from "@mui/material/styles";
import themes from "./themes.ts";

const useFinalTheme = () => {
    const [theme] = useThemeMode();
    const finalTheme = createTheme(themes[theme]);

    return finalTheme;
};
export default useFinalTheme;