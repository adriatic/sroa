import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const ALLOWED_EMAILS = [
  "nikolaj.ivancic@gmail.com",
  "marina.ivancic@gmail.com",
];

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { sessionClaims } = await auth.protect();
    const email = (sessionClaims?.email ?? 
                   sessionClaims?.primary_email_address ?? 
                   (sessionClaims as any)?.['https://www.sroa.site/email']) as string;
    
    if (email && !ALLOWED_EMAILS.includes(email)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
