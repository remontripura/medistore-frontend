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

export default function MyOrder({
  orderData,
}: {
  orderData: Order[] | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      status: "APPROVED" as "APPROVED" | "REJECT",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data } = await updateOrderAction(value, selectedUser?.id!);
        toast.success("Update Status Succefully!", {
          position: "top-center",
        });
        form.reset();
        setLoading(false);
        setOpen(false);
      } catch (err) {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <h4 className="text-[24px] text-center mt-8 font-semibold mb-5">
        My Order
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orderData?.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
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

              <TableCell>{formatDate(item.createdAt)}</TableCell>

              <TableCell className="flex gap-2">
                <CiEdit
                  className={cn(
                    "size-6",
                    item.status === "PENDING"
                      ? "cursor-pointer hover:text-green-500"
                      : "cursor-not-allowed text-gray-400",
                  )}
                  onClick={() => {
                    if (item.status !== "PENDING") return;

                    setSelectedUser(item);
                    setOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order Status</DialogTitle>
          </DialogHeader>

          <form
            id="user-update-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-3"
          >
            <FieldGroup>
              <form.Field
                name="status"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as "APPROVED" | "REJECT",
                          )
                        }
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select Status</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECT">REJECT</option>
                      </select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>

          <Button
            disabled={loading}
            form="user-update-form"
            type="submit"
            className="w-full"
          >
            {!loading ? (
              "Update Status"
            ) : (
              <span className="flex items-center gap-3">
                <Spinner />
                Processing
              </span>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
