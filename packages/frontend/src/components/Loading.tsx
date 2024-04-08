import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export const LoadingFullScreen = (props: {}) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
