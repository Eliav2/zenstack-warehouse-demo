import { NextFunction, Request, Response } from "express";

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

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = getAuthenticatedUserFromCookie(req);

  if (user) {
    return next();
  }

  res.status(401).json({ message: "Not Authenticated" });
}
