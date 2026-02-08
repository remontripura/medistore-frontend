import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  const isAuthenticated = !!data;
  const role = data?.user?.role;

  const isAdmin = role === Roles.admin;
  const isSeller = role === Roles.seller;
  const isCustomer = role === Roles.customer;

  if (!isAuthenticated) {
    if (pathname === "/login" || pathname === "/sign-up") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/login" || pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isAdmin) {
    if (!pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    return NextResponse.next();
  }
  if (isSeller) {
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
  if (isCustomer && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)",
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { Roles } from "./constants/roles";
// import { userService } from "./services/user.service";

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

// const { data } = await userService.getSession();

// const isAuthenticated = !!data;
// console.log(isAuthenticated)
// const role = data?.user?.role;

// const isAdmin = role === Roles.admin;
// const isSeller = role === Roles.seller;
// const isUser = role === Roles.customer;

//   /* ===============================
//      3️⃣ Login state rules
//   ================================ */
//   if (isAuthenticated && (pathname === "/login" || pathname === "/sign-up")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   /* ===============================
//      1️⃣ Admin / Seller → /user block
//   ================================ */
// if ((isAdmin || isSeller) && pathname.startsWith("/user")) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

//   /* ===============================
//      2️⃣ Seller → /checkout block
//   ================================ */
// if (isSeller && pathname.startsWith("/checkout")) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

//   /* ===============================
//      Dashboard role redirect
//   ================================ */
//   if (isAdmin && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//   }

//   if (!isAdmin && isSeller && pathname.startsWith("/admin-dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/admin-dashboard/:path*",
//     "/user/:path*",
//     "/checkout",
//     "/login",
//     "/sign-up",
//   ],
// };
