"use client";

import { createBlogPost } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export function AddCategoriesForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data } = await createBlogPost(value);
        toast.success("Add Category Succefully!", {
          position: "top-center",
        });
        form.reset();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
  });
  return (
    <div className="md:max-w-3xl w-full mx-auto">
      <div className="text-center">
        <h6 className="font-semibold md:text-3xl text-2xl">Add Categories</h6>
        <p className="font-medium">Create Your Own Categories.</p>
      </div>
      <Card {...props} className="mt-8 p-3 px-3">
        <CardContent className="p-0">
          <form
            id="categoriy-form"
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
                      <FieldLabel htmlFor={field.name}>
                        Categories Name
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Category Name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="slug"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Category Slug"
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
        <CardFooter className="flex flex-col gap-5 justify-end p-0 py-3 ">
          <Button
            disabled={loading}
            form="categoriy-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            {!loading ? (
              "Add Categories"
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
    </div>
  );
}
