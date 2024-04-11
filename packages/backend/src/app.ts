import express, { Request, Response } from "express";
import logger from "morgan";
import "dotenv/config";
import { createRequire } from "module";
import * as process from "process";
import cookieSession from "cookie-session";
import { getPrisma } from "./getPrisma.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { cookieSessionFixMiddleware } from "./middleware/cookieSessionFix.middleware.js";

import authRouter from "./routes/auth.routes.js";

const require = createRequire(import.meta.url);
const { ZenStackMiddleware } = require("@zenstackhq/server/express");

if (!process.env.AUTH_SECRET)
  throw new Error("AUTH_SECRET env variable is required");

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Trust Proxy for Proxies (Heroku, Render.com, etc)
// https://stackoverflow.com/questions/40459511/in-express-js-req-protocol-is-not-picking-up-https-for-my-secure-link-it-alwa
app.enable("trust proxy");

app.use(logger("dev"));

// Parse incoming requests data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.AUTH_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

app.use(cookieSessionFixMiddleware);

app.use("/auth", authRouter);

app.use(
  "/model",
  ZenStackMiddleware({
    getPrisma: getPrisma,
    zodSchemas: true,
  }),
);

app.get("/", async (req: Request, res: Response) => {
  res.send("backend up").status(200);
});
app.get("/error", (req, res) => {
  throw new Error("Error route");
});

// Error handlers
app.use(errorHandler);
