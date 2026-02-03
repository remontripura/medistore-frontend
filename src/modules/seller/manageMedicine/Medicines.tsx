"use client";

import { updateMedicineAction } from "@/actions/medicineAction";
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { medicineServices } from "@/services/medicine.service";
import { Product } from "@/types";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";
import { DeleteMedicineDialog } from "./DeleteMedicineDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    price: z
      .string()
      .refine(
        (v) => !isNaN(Number(v)) && Number(v) > 0,
        "Price must be a number",
      ),
    discount: z
      .string()
      .refine((v) => !isNaN(Number(v)), "Discount must be a number"),
    stock: z.number().min(1, "Stock cannot be negative"),
    images: z
      .string()
      .url("Image must be a valid URL")
      .min(1, "Image URL is required"),
  })
  .superRefine((data, ctx) => {
    if (Number(data.discount) > Number(data.price)) {
      ctx.addIssue({
        path: ["discount"],
        message: "Discount cannot be greater than price",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default function Medicines({
  medicineData,
}: {
  medicineData: Product[] | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: selectedUser?.name,
      price: selectedUser?.price,
      discount: selectedUser?.discount,
      stock: selectedUser?.stock ?? 0,
      images: selectedUser?.images,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data } = await updateMedicineAction(value, selectedUser?.id!);
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
        My Medicine
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicineData?.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Image
                  src={item.images}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="size-16"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>Tk {Number(item.price).toLocaleString()}</TableCell>
              <TableCell>Tk {Number(item.discount).toLocaleString()}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell className="flex gap-2">
                <CiEdit
                  className="size-6 cursor-pointer hover:text-green-500"
                  onClick={() => {
                    setSelectedUser(item);
                    form.reset({
                      name: item.name,
                      price: String(item.price),
                      discount: String(item.discount),
                      stock: item.stock,
                      images: item.images,
                    });
                    setOpen(true);
                  }}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                      {" "}
                      <MdDeleteSweep className="size-6  text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <DeleteMedicineDialog deleteId={item.id} />
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
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
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Mecicine Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="price"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="discount"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Discount</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="stock"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value === 0 ? "" : field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="images"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Images</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
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
              "Update Medicine"
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
