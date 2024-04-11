import { NextFunction, Request, Response } from "express";
import { HttpError, NotFoundError } from "../errors.js";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: HttpError | Error | Prisma.PrismaClientKnownRequestError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(("status" in err && err.status) || 500);
  res.render("error", {
    title: "status" in err ? err.status : err.name,
    message: err.message,
  });
};

export const errorNotFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new NotFoundError("Not Found"));
};
