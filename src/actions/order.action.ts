"use server";

import {
  OrderData,
  orderServices,
  orderValue,
} from "@/services/order.services";
import { updateTag } from "next/cache";

export const addOrderAction = async (data: OrderData) => {
  const res = await orderServices.crateOrder(data);
  updateTag("my-order");
  return res;
};

export const updateOrderAction = async (
  orderData: orderValue,
  orderId: string,
) => {
  const res = await orderServices.updateOrder(orderData, orderId);
  updateTag("my-order");
  return res;
};
