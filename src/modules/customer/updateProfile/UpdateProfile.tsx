"use client";

import { updateUser } from "@/actions/users.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { uploadToImgbb } from "@/utils/imageBBUpload";
import { useForm } from "@tanstack/react-form";
import type { User as BetterAuthUser } from "better-auth";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

export type AppUser = BetterAuthUser & {
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
  role: "CUSTOMER" | "ADMIN";
};

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  image: z.instanceof(File).nullable().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export function UpdateProfileComponent({
  user,
  ...props
}: React.ComponentProps<typeof Card> & {
  user: AppUser;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      image: undefined,
    } as FormValues,

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        let imageUrl = user?.image;

        if (value.image instanceof File) {
          imageUrl = await uploadToImgbb(value.image);
        }
        const { data } = await updateUser({ ...value, image: imageUrl });
        console.log("update profile data", data);
        setLoading(false);
        toast.success("User Updated Successfully");
      } catch (err) {
        toast.error("Something went wrong, please try again.");
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Card {...props} className="p-5 md:max-w-3xl w-full mx-auto mt-5">
        <CardHeader className="px-0 hidden">
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Your Name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="phone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Phone Number"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                      <Input
                        type="file"
                        id={field.name}
                        name={field.name}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.handleChange(file);
                        }}
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
        </CardContent>
        <CardFooter className="flex flex-col gap-5 justify-end px-0">
          <Button
            disabled={loading}
            form="login-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            {!loading ? (
              "Update Profile"
            ) : (
              <span className="flex items-center gap-3">
                {" "}
                <Spinner data-icon="inline-start" />
                Processing
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
