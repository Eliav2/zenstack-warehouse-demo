import GitHub from "@auth/express/providers/github";
import Google from "@auth/express/providers/google";
import { AuthConfig } from "@auth/core/types";

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
} satisfies AuthConfig;
