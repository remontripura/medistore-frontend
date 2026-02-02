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
        title: "All User",
        url: "/all-user",
      },
    ],
  },
];
