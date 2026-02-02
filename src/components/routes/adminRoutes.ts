import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Add Categories",
        url: "/admin-dashboard/add-categories",
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
      },
    ],
  },
];
