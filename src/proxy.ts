import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // console.log("MIDDLEWARE HIT:", req.nextUrl.pathname);

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});