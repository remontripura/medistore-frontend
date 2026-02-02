import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Add Medicine",
        url: "/dashboard/add-medicine",
      },
      {
        title: "My Medicine",
        url: "/dashboard/history",
      },
    ],
  },
];
