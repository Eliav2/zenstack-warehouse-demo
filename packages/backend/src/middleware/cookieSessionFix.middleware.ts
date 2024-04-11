import { NextFunction, Request, Response } from "express";

// register regenerate & save after the cookieSession middleware initialization
// see https://stackoverflow.com/a/75195471/23059118
export function cookieSessionFixMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (request.session && !request.session.regenerate) {
    // @ts-ignore
    request.session.regenerate = (cb) => {
      // @ts-ignore
      cb();
    };
  }
  if (request.session && !request.session.save) {
    // @ts-ignore
    request.session.save = (cb) => {
      // @ts-ignore
      cb();
    };
  }
  next();
}
