import type { Session as AuthSession } from "@auth/core/types";
import { User } from "@prisma/client";

export type Session = AuthSession;

export type Response_Iam = Session;
// export type UserSession = { email: string; name: string };

declare module "express-session" {
  interface SessionData {
    passport: {
      user: {
        user: string; //email
        expires: string | null; // ISO string, if null never expires
      };
    };
  }
}
export type GithubUserResponse = {
  id: string;
  displayName: any;
  username: string;
  profileUrl: string;
  photos: Array<{
    value: string;
  }>;
  provider: string;
  _raw: string;
  _json: Record<any, any>;
};

export type GithubEmailsResponse = Array<{
  email: string;
  primary: boolean;
  verified: boolean;
  visibility?: string;
}>;
