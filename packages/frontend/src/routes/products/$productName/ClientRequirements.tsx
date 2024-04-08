import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";

export const Route = createFileRoute(
  "/products/$productName/ClientRequirements",
)({
  component: ClientRequirementsPage,
});

function ClientRequirementsPage() {
  return <Box>ClientRequirementsPage </Box>;
}
