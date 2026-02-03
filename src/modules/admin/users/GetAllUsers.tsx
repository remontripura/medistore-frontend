"use client";
import { updateUserStatus } from "@/actions/users.action";
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
import { Pagination, UserType } from "@/types";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  status: z.enum(["ACTIVE", "DEACTIVE"]),
});

export function GetAllUsers({
  users,
}: {
  users: { data: UserType[]; pagination: Pagination } | null;
}) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      status: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data } = await updateUserStatus(value, selectedUser?.id!);
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
        All Users
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.data.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {item.status === "ACTIVE" ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-orange-600">DeActive</span>
                )}
              </TableCell>
              <TableCell>
                {item.image && (
                  <Image
                    className="size-12"
                    src={item.image}
                    alt="img"
                    width={300}
                    height={300}
                  />
                )}
              </TableCell>
              <TableCell>
                <CiEdit
                  className="cursor-pointer size-6 hover:text-green-500"
                  onClick={() => {
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
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-2">
              <form
                id="user-update-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="status"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Categories Name
                          </FieldLabel>
                          <select
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                          >
                            <option value="">Select Category</option>
                            <option value="ACTIVE">Active</option>
                            <option value="DEACTIVE">Deactive</option>
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
            </div>
          )}
          <Button
            disabled={loading}
            form="user-update-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            {!loading ? (
              "Update Status"
            ) : (
              <span className="flex items-center gap-3">
                {" "}
                <Spinner data-icon="inline-start" />
                Processing
              </span>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
