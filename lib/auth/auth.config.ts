import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = await createClient();

        const { data: admin, error } = await supabase
          .from("admins")
          .select("*")
          .eq("email", credentials.email as string)
          .single();

        if (error || !admin) {
          return null;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          admin.password_hash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          clientId: admin.client_id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.clientId = (user as any).clientId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).clientId = token.clientId;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      if (isOnAdminPanel && !isOnLoginPage) {
        if (!isLoggedIn) return false;
        return true;
      }

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      return true;
    },
  },
};
