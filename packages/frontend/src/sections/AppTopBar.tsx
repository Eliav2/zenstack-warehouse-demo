import * as React from "react";
import { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser.ts";
import {
  Divider,
  ListItemIcon,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import appImg from "../assets/image.png";
import Link from "../components/Link.tsx";
import useThemeMode from "../store/useThemeMode.ts";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const pages = ["products"] as const;

function AppTopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const { user, handleSignIn, handleLogout } = useAuthenticatedUser();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [themeMode, setThemeMode] = useThemeMode();
  const theme = useTheme();

  const bigView = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <AppBar component="nav" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!bigView && (
              <>
                <Box sx={{ display: "flex" }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    {pages.map((page) => (
                      <Link to={`/${page}`} key={page}>
                        <MenuItem>
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              </>
            )}

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
              }}
            >
              <Link to={"/"} component={"div"}>
                <Box
                  sx={{
                    mr: 1,
                    height: "40px",
                  }}
                  component={"img"}
                  src={appImg}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    fontSize: "1.3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  ZenstackDemo
                </Typography>
              </Link>
              {bigView && (
                <Box sx={{ display: "flex", ml: 2 }}>
                  {pages.map((page) => (
                    <Link to={`/${page}`} key={page}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ))}
                </Box>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Toggle light/dark theme">
                  <IconButton
                    onClick={() =>
                      setThemeMode(themeMode == "dark" ? "light" : "dark")
                    }
                    sx={{ p: 0 }}
                  >
                    {themeMode == "light" ? (
                      <LightModeOutlinedIcon />
                    ) : (
                      <DarkModeOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src={user?.profilePic} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {user ? (
                      <Box>
                        <Link to={"/user"} component={MenuItem}>
                          {user.name}
                        </Link>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                          {/*<Typography textAlign="center">Logout</Typography>*/}
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Box>
                    ) : (
                      <MenuItem onClick={handleSignIn}>
                        <ListItemIcon>
                          <Login fontSize="small" />
                        </ListItemIcon>
                        Login
                      </MenuItem>
                    )}
                  </Menu>
                </>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default AppTopBar;
