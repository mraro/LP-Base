import { auth } from "@/lib/auth/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login";

  if (isOnAdminPanel && !isOnLoginPage) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/admin/login", req.nextUrl));
    }
  }

  if (isOnLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/admin/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
