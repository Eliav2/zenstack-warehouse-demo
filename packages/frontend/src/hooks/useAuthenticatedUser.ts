import { useQuery } from "@tanstack/react-query";
import { useFindFirstUser } from "zenstack-demo-warehouse-backend/src/hooks/generated";
import type { PermissionNames } from "prisma-models";

export const handleSignIn = () => {
  const callbackUrl = encodeURIComponent(window.location.href);
  window.location.href = `/api/auth/signin/github?callbackUrl=${callbackUrl}`;
};

export function handleLogout() {
  fetch("/api/auth/logout", { method: "POST" }).then(() => {
    window.location.reload();
  });
}

const useAuthenticatedUser = () => {
  const iamQuery = useQuery<string | { message: string }>({
    queryKey: ["iam"],
    queryFn: async () => {
      const response = await fetch("/api/auth/iam");
      if (!response.ok) {
        return null;
      }
      return response.json();
    },
  });

  const data = iamQuery.data;
  const userEmail = typeof data === "object" ? null : data;
  const unauthenticated = typeof userEmail === "object";

  const userQuery = useFindFirstUser(
    {
      where: { email: userEmail! },
      include: {
        role: {
          include: {
            permissions: {
              select: { name: true },
            },
          },
        },
      },
    },
    { enabled: !unauthenticated && !!userEmail },
  );
  const _user = userQuery.data;
  const user = unauthenticated
    ? null
    : _user && {
        ..._user,
        permissions: _user.role.permissions.map((p) => p.name),
      };
  return {
    user: user!,
    handleSignIn,
    handleLogout,
    loading: userQuery.isLoading,
  };
};

export const useUserPermissions = () => {
  const { user } = useAuthenticatedUser();
  if (!user) return [] as PermissionNames[];
  return user.permissions;
};

export default useAuthenticatedUser;
