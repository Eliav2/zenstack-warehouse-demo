import { CSSObject, styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useTheme } from "@mui/material";
import useExpandStagesSidebar from "../../../store/useExpandStagesSidebar.ts";

export const stagesSidebarDrawerWidth = 190;

const openedMixin = (theme: Theme): CSSObject => ({
  width: stagesSidebarDrawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const TopProductBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.background.paper,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: stagesSidebarDrawerWidth,
    width: `calc(100% - ${stagesSidebarDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const useTopProductBarWidth = () => {
  const [openDrawer, setOpenDrawer] = useExpandStagesSidebar();
  const theme = useTheme();
  return openDrawer
    ? `calc(100% - ${stagesSidebarDrawerWidth}px)`
    : `calc(100% - ${theme.spacing(8)})`;
};

export const TopProductBar: React.FC<AppBarProps> = ({ open, ...props }) => {
  return <TopProductBarStyled {...props} open={open} />;
};

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: stagesSidebarDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // ...(open && {
  //   ...openedMixin(theme),
  //   "& .MuiDrawer-paper": openedMixin(theme),
  // }),
  // ...(!open && {
  //   ...closedMixin(theme),
  //   "& .MuiDrawer-paper": closedMixin(theme),
  // }),
}));
