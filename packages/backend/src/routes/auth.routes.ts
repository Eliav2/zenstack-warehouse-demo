import express, { Request, Response } from "express";
import passport from "passport";
import {
  authenticatedUser,
  getAuthenticatedUserFromCookie,
} from "../middleware/auth.middleware.js";
import { RolesNames, User } from "@prisma/client";
import { Strategy as GitHubStrategy } from "passport-github";
import process from "process";
import { GithubEmailsResponse, GithubUserResponse } from "../types.js";
import axios from "axios";
import { prisma } from "../db.js";

const router = express.Router();

// Initialize Passport and its session handling middleware
router.use(passport.initialize());
router.use(passport.session());

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

const passportGithubStrategy = new GitHubStrategy(
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
);
// Configure GitHub strategy for Passport
passport.use(passportGithubStrategy);

router.get("/signin/github", (req, res, next) => {
  passport.authenticate("github", {
    // @ts-ignore
    callbackURL:
      `http://localhost:3000/auth/callback/github?callbackUrl=${req.query.callbackUrl}` as any,
  })(req, res, next);
});

router.get(
  "/callback/github",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    const callbackUrl = req.query.callbackUrl ?? "/";
    res.redirect(callbackUrl as string);
  },
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/iam",
  authenticatedUser,
  async (req: Request, res: Response<User["email"]>) => {
    const email = (await getAuthenticatedUserFromCookie(req)) as
      | string
      | undefined;
    res.json(email).status(200);
  },
);

export default router;
