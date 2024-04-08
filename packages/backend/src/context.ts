import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { enhance } from "@zenstackhq/runtime";
import { prisma } from "./db.js";
import { getAuthenticatedUserFromCookie } from "./utils.js";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const email = getAuthenticatedUserFromCookie(req);
  return {
    req,
    res,
    email,
    prisma: await enhance(prisma, { user: { id: email } }),
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;

// root router to call
export const appRouter = router({
  // merge predefined routers

  // or individual procedures
  hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return `hello ${input ?? ctx.email ?? "world"}`;
  }),
});
export type AppRouter = typeof appRouter;
