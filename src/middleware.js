// // import { clerkMiddleware } from "@clerk/nextjs/server";

// // export default clerkMiddleware();

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();
//   if (!userId && isProtectedRoute(req)) {
//     return auth().redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Only redirect if it's a protected route and user is not logged in
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
