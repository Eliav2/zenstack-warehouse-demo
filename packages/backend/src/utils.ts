import { Request } from "express";
import { enhance } from "@zenstackhq/runtime";
import { prisma } from "./db.js";

export const getAuthenticatedUserFromCookie = (req: Request) => {
  const user = req.session.passport?.user;
  if (!user) {
    return undefined;
  }

  const expires = user?.expires;
  if (expires && new Date(expires) < new Date()) {
    return undefined;
  }
  const email = user?.user;
  return email;
  // return prisma.user.findUnique({ where: { email: user.user } });
};

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
