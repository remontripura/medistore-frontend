"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";

export default function UserMyOrder({
  orderData,
}: {
  orderData: Order[] | undefined;
}) {
  return (
    <div>
      <h4 className="text-[24px] text-center mt-8 font-semibold mb-5">
        My Order
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orderData?.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>
                <Image
                  src={item.medicine.images}
                  alt={item.medicine.name}
                  width={64}
                  height={64}
                  className="size-16"
                />
              </TableCell>
              <TableCell>{item.medicine.name}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    item.status === "PENDING"
                      ? "text-orange-500 font-medium"
                      : item.status === "APPROVED"
                        ? "text-green-500"
                        : "",
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
