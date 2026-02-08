import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
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
