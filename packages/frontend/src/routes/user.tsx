import { createFileRoute } from "@tanstack/react-router";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser.ts";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const Route = createFileRoute("/user")({
  component: UserPage,
});

function UserPage() {
  const { user } = useAuthenticatedUser();
  return user ? (
    <Box sx={{ p: 2 }}>
      <Typography>
        user name: <span style={{ fontWeight: "bold" }}>{user.name}</span>
      </Typography>

      <Typography>
        email: <span style={{ fontWeight: "bold" }}>{user.email}</span>
      </Typography>
      <Typography>
        Role: <span style={{ fontWeight: "bold" }}>{user.role.name}</span>
      </Typography>
      <Typography>
        Member since:{" "}
        <span style={{ fontWeight: "bold" }}>
          {dayjs(user.createdAt).fromNow()} (
          {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")})
        </span>
      </Typography>
    </Box>
  ) : (
    <>not logged in</>
  );
}
