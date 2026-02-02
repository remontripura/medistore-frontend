import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Add Medicine",
        url: "/seller-dashboard/add-medicine",
      },
      {
        title: "My Medicine",
        url: "/seller-dashboard/history",
      },
    ],
  },
];
