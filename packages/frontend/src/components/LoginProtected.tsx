import useAuthenticatedUser from "../hooks/useAuthenticatedUser.ts";
import { Box, Button, Paper, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LoadingFullScreen } from "./Loading.tsx";

export const LoginProtected = ({ children }: { children: React.ReactNode }) => {
  const { user, handleSignIn, loading } = useAuthenticatedUser();
  if (loading) {
    return <LoadingFullScreen />;
  }
  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body1" gutterBottom>
            This app allows only authenticated users to access the application.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GitHubIcon />}
            onClick={handleSignIn}
          >
            Log In with GitHub
          </Button>
        </Paper>
      </Box>
    );
  }
  return children;
};
