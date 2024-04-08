import express, { Request, Response } from "express";
import logger from "morgan";
import "dotenv/config";
import axios from "axios";
import { RolesNames, User } from "@prisma/client";
import { createRequire } from "module";
import { authenticatedUser } from "./middleware/auth.middleware.js";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import * as process from "process";
import cookieSession from "cookie-session";
import { GithubEmailsResponse, GithubUserResponse } from "./types.js";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./context.js";
import { getAuthenticatedUserFromCookie, getPrisma } from "./utils.js";
import { prisma } from "./db.js";
import {
  errorHandler,
  errorNotFoundHandler,
} from "./middleware/error.middleware.js";

const require = createRequire(import.meta.url);
const { ZenStackMiddleware } = require("@zenstackhq/server/express");
// to handle async prisma exceptions
// require("express-async-errors");
// import "express-async-errors";

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

// register regenerate & save after the cookieSession middleware initialization
// see https://stackoverflow.com/a/75195471/23059118
app.use(function (request, response, next) {
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
});

// Initialize Passport and its session handling middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser((user, cb) => {
  // const email = user?._json?.[0].email;
  cb(null, {
    user: (user as User).email,
    expires: null, // never expires
  });
});

passport.deserializeUser(async (obj: any, cb) => {
  // todo: we can fetch the user from the db here instead of storing the whole user in the session
  //   currently, we store the whole user in the session
  const email = obj.user;
  cb(null, email);
});

// Configure GitHub strategy for Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      callbackURL: "http://localhost:3000/auth/callback/github",
      scope: ["user:email", "read:user"],
      userProfileURL: "https://api.github.com/user",
    },
    async (accessToken, refreshToken, _profile, cb) => {
      // why? because the email is in the _json object (and only if the 'userProfileURL' is set as follows)
      const profile = _profile as GithubUserResponse;
      let email: string | undefined = undefined;

      try {
        const response = await axios.get<GithubEmailsResponse>(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          },
        );
        email = response?.data?.find?.((emailObj) => emailObj.primary)?.email;
        if (!email) {
          throw new Error("No primary email found");
        }
        // Find or create user in your database here
        // For now, we'll just return the profile
        // upsert user
        const name = profile.username;
        const res = await prisma.user.upsert({
          where: { email: email },
          update: {},
          create: {
            email: email,
            name: name,
            profilePic: profile.photos?.[0]?.value,
            role: {
              connectOrCreate: {
                where: { name: RolesNames.Guest },
                create: { name: RolesNames.Guest },
              },
            },
          },
        });

        return cb(null, res);
      } catch (e: any) {
        console.error(e);
        return cb(e, undefined);
      }
    },
  ),
);

// Routes

app.get("/auth/signin/github", (req, res, next) => {
  passport.authenticate("github", {
    // @ts-ignore
    callbackURL:
      `http://localhost:3000/auth/callback/github?callbackUrl=${req.query.callbackUrl}` as any,
  })(req, res, next);
});

app.get(
  "/auth/callback/github",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    const callbackUrl = req.query.callbackUrl ?? "/";
    res.redirect(callbackUrl as string);
  },
);

// req.session.regenerate(() => {
//   req.session.save(() => {
//     res.redirect("/");
//   });
// }),
app.post("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get(
  "/iam",
  authenticatedUser,
  async (req: Request, res: Response<User["email"]>) => {
    const email = (await getAuthenticatedUserFromCookie(req)) as
      | string
      | undefined;
    res.json(email).status(200);
  },
);

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

app.use(
  "/model",

  ZenStackMiddleware({
    getPrisma: getPrisma,
    zodSchemas: true,
  }),
);

app.get("/", async (req: Request, res: Response) => {
  res.send("I AM UP").status(200);
  // res.render("index", {
  //   title: "Express Auth Example",
  //   user: res.locals.session?.user,
  // });
});
app.get("/error", (req, res) => {
  throw new Error("Error route");
});

// Error handlers
// app.use(errorNotFoundHandler);
app.use(errorHandler);

// // Express global error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: "Internal Server Error" });
// });
