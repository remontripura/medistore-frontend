


"use client";

import { updateOrderAction } from "@/actions/order.action";
import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
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
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  status: z.enum(["APPROVED", "REJECT"]),
});

type Props = {
  orderData?: Order[];
};

export default function MyOrder({ orderData }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      status: "APPROVED" as "APPROVED" | "REJECT",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedOrder) return;

      try {
        setLoading(true);

        await updateOrderAction(value, selectedOrder.id);

        toast.success("Order status updated successfully!", {
          position: "top-center",
        });

        form.reset();
        setOpen(false);
      } catch (error) {
        toast.error("Failed to update order");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleEditClick = (order: Order) => {
    if (order.status !== "PENDING") return;

    setSelectedOrder(order);
    setOpen(true);
  };

  return (
    <div>
      <h4 className="text-2xl text-center mt-8 font-semibold mb-5">
        My Orders
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orderData?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                {formatDate(item.createdAt)}
              </TableCell>

              <TableCell>
                <Image
                  src={item.medicine.images}
                  alt={item.medicine.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell>

              <TableCell>{item.medicine.name}</TableCell>

              <TableCell>
                <span
                  className={cn(
                    "px-2 py-1 rounded text-sm font-medium",
                    item.status === "APPROVED" &&
                      "bg-green-100 text-green-600",
                    item.status === "REJECT" &&
                      "bg-red-100 text-red-600",
                    item.status === "PENDING" &&
                      "bg-yellow-100 text-yellow-600"
                  )}
                >
                  {item.status}
                </span>
              </TableCell>

              <TableCell>
                <CiEdit
                  className={cn(
                    "size-6",
                    item.status === "PENDING"
                      ? "cursor-pointer hover:text-green-500"
                      : "cursor-not-allowed text-gray-400"
                  )}
                  onClick={() => handleEditClick(item)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order Status</DialogTitle>
          </DialogHeader>

          <form
            id="order-update-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup>
              <form.Field
                name="status"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Status
                      </FieldLabel>

                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as "APPROVED" | "REJECT"
                          )
                        }
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select Status</option>
                        <option value="APPROVED">
                          APPROVED
                        </option>
                        <option value="REJECT">
                          REJECT
                        </option>
                      </select>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Processing...
                </span>
              ) : (
                "Update Status"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
