import { Request } from "express";
import { enhance } from "@zenstackhq/runtime";
import { prisma } from "./db.js";
import { getAuthenticatedUserFromCookie } from "./middleware/auth.middleware.js";

// Gets a Prisma client bound to the current user identity
export async function getPrisma(req: Request) {
  const email = getAuthenticatedUserFromCookie(req);
  const user =
    email &&
    (await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }));

  const context = user ? { ...user } : undefined;
  return enhance(prisma, { user: context });
}
