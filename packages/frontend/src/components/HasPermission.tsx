import React from "react";
import { useUserPermissions } from "../hooks/useAuthenticatedUser.ts";

interface HasPermissionProps {
  permission: ReturnType<typeof useUserPermissions>[number];
  children: React.ReactNode;
}
const HasPermission = (props: HasPermissionProps) => {
  if (!useUserPermissions().includes(props.permission)) return null;

  return <>{props.children}</>;
};

export default HasPermission;
