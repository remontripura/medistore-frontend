import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }
  if (data) {
    isAuthenticated = true;
    isSeller = data.user.role === Roles.seller;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (!isAdmin && isSeller && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
