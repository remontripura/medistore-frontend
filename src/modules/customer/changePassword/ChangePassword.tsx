"use client";

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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  newPassword: z.string().min(1, "New Password Is Required"),
  currentPassword: z.string().min(1, "Old Password Is Required"),
});

export function ChangePassword({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      newPassword: "",
      currentPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data, error } = await authClient.changePassword({
          newPassword: value.newPassword,
          currentPassword: value.currentPassword,
          revokeOtherSessions: true,
        });
        if (data) {
          setLoading(false);
          toast.success("Password Reset Successfully");
          form.reset();
        }
        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
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
                name="newPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Enter New Password
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter New Password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="currentPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Enter Old Password
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Old Password"
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
              "Change Password"
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
