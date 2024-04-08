import { getSession } from "@auth/express";
import { NextFunction, Request, Response } from "express";
import { authConfig } from "../config/auth.config.js";
import { getAuthenticatedUserFromCookie } from "../utils.js";

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

export async function currentSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await getSession(req, authConfig);

  // const user = session?.user;
  // if (user) {
  // }

  res.locals.session = session;
  return next();
}
