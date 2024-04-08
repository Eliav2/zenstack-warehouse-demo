import { createFileRoute } from "@tanstack/react-router";
import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "../components/Link.tsx";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // return <App />;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Typography variant="h2">Welcome To zenstack demo</Typography>
      <Divider />
      <Typography sx={{ fontSize: "1.3em", p: 3 }}>
        backend - zenstack+passport+github sso
        <br />
        frontend - react + mui5 + tanstack query + tanstack router - recoil
      </Typography>

      <Link to={"/products"} component={Box} sx={{ alignSelf: "center" }}>
        <Button>Let's get started →</Button>
      </Link>
    </Box>
  );
}
