"use server";

import { OrderData, orderServices } from "@/services/order.services";

export const addOrderAction = async (data: OrderData) => {
  const res = await orderServices.crateOrder(data);
  return res;
};
