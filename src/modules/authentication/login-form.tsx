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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

type UserWithRole = {
  role: "ADMIN" | "SELLER" | "CUSTOMER";
};

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (data?.user && "role" in data.user) {
          const user = data.user as typeof data.user & UserWithRole;
          if (user.role === "CUSTOMER") {
            router.refresh()
            router.push("/");
          } else if (user.role === "ADMIN" || "SELLER") {
            router.push("/dashboard");
          }
        }
        setLoading(false);

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
        toast.success("User Logged in Successfully");
      } catch (err) {
        toast.error("Something went wrong, please try again.");
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="w-full flex justify-center my-5">
        <Link href="/">
          <Image
            className="md:w-50 w-30"
            src="/logo.png"
            alt="img"
            width={500}
            height={500}
          />
        </Link>
      </div>
      <Card {...props} className="p-5">
        <CardHeader className="px-0">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
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
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
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
              "Login"
            ) : (
              <span className="flex items-center gap-3">
                {" "}
                <Spinner data-icon="inline-start" />
                Processing
              </span>
            )}
          </Button>
          <p className="text-[12px] mt-4">
            Don&rsquo;t have an Account?{" "}
            <Link href="/sign-up" className="text-blue-500">
              sign-up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
