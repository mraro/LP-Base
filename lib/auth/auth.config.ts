import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createAdminClient } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true, // Detecta automaticamente a URL baseada no request (localhost ou produção)
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
        console.log("🔐 [AUTH] Iniciando autenticação...");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ [AUTH] Credenciais ausentes");
          return null;
        }

        console.log(`📧 [AUTH] Email: ${credentials.email}`);

        try {
          // Usa SERVICE_ROLE_KEY para bypass RLS na autenticação
          const supabase = createAdminClient();

          const { data: admin, error } = await supabase
            .from("admins")
            .select("*")
            .eq("email", credentials.email as string)
            .single();

          if (error) {
            console.log("❌ [AUTH] Erro ao buscar admin:", error.message);
            return null;
          }

          if (!admin) {
            console.log("❌ [AUTH] Admin não encontrado");
            return null;
          }

          console.log(`✅ [AUTH] Admin encontrado - Client ID: ${admin.client_id}`);

          // Verify password
          console.log("🔍 [AUTH] Verificando senha...");
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            admin.password_hash
          );

          if (!isValidPassword) {
            console.log("❌ [AUTH] Senha inválida");
            return null;
          }

          console.log("✅ [AUTH] Senha válida! Login bem-sucedido");

          return {
            id: admin.id,
            email: admin.email,
            clientId: admin.client_id,
          };
        } catch (err) {
          console.error("❌ [AUTH] Erro durante autenticação:", err);
          return null;
        }
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
