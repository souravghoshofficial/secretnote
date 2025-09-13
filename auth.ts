// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { sql } from "./lib/db";

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string; // UUID from users table
      username?: string | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async session({ session }) {
      if (!session.user?.email) return session;

      // fetch user from db
      const rows = await sql`
        SELECT id, username FROM users WHERE email = ${session.user.email}
      `;

      let user = rows[0];

      // if not in db → insert & fetch again
      if (!user) {
        const inserted = await sql`
          INSERT INTO users (email)
          VALUES (${session.user.email})
          RETURNING id, username
        `;
        user = inserted[0];
      }

      // attach id + username to session
      session.user.id = user.id;
      session.user.username = user.username;

      return session;
    },
  },
});
