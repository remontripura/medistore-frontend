export type Order = {
  id: string;
  userId: string;
  address: string;
  status: "PENDING" | "APPROVED" | "REJECT";
  order_track: "ORDERD" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  medicine: {
    id: string;
    name: string;
    images: string;
  };
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
