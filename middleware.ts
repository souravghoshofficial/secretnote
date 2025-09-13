// middleware.ts
import { auth } from "@/auth";

export default auth(async (req) => {
  const { auth: session, nextUrl } = req;

  // not logged in → redirect to /login
  if (!session && nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", nextUrl.origin));
  }

  // logged in but missing username → force setup
  if (
    session?.user &&
    nextUrl.pathname.startsWith("/dashboard") &&
    !session.user.username
  ) {
    return Response.redirect(new URL("/setup", nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
