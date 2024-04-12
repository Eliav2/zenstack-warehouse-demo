import { createRootRoute, Outlet } from "@tanstack/react-router";
import AppWrapper from "../AppWrapper.tsx";
import AppTopBar from "../sections/AppTopBar.tsx";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Paper } from "@mui/material";
import { LoginProtected } from "../components/LoginProtected.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppWrapper>
      <LoginProtected>
        <AppTopBar />
        <Container maxWidth={"xl"}>
          <Toolbar />
          <Paper
            component={"main"}
            sx={{
              // py: 1,
              minHeight: "calc(100vh - 80px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Paper>
        </Container>
      </LoginProtected>
    </AppWrapper>
  );
}
