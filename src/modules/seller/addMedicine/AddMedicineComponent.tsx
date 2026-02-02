"use client";

import { addMedicineAction } from "@/actions/medicineAction";
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
import { CategoryType } from "@/types";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "Category name is required"),
    price: z
      .string()
      .min(1, "Price is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Price must be a number",
      }),
    stock: z
      .string()
      .min(1, "Stock is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Stock must be a number",
      }),
    images: z
      .string()
      .url("Image must be a valid URL")
      .min(1, "Image URL is required"),

    categoryId: z.string().min(1, "Category is required"),
    discount: z
      .string()
      .min(1, "Discount is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Discount must be a number",
      }),
  })
  .refine((data) => Number(data.discount) <= Number(data.price), {
    path: ["discount"],
    message: "Discount cannot be greater than price",
  });

export function AddMedicineComponent({
  categoriesItem,
}: {
  categoriesItem: CategoryType[] | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      images: "",
      categoryId: "",
      discount: "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("submitted");
      setLoading(true);
      try {
        const { stock, ...rest } = value;
        const finalValue = { ...rest, stock: Number(stock) };
        const { data } = await addMedicineAction(finalValue);
        console.log(data);
        toast.success("Add Category Succefully!", {
          position: "top-center",
        });
        // form.reset();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
  });
  return (
    <div className="md:max-w-3xl w-full mx-auto">
      <div className="text-center">
        <h6 className="font-semibold md:text-3xl text-2xl">Add Medicine</h6>
        {/* <p className="font-medium">Create Your Own Categories.</p> */}
      </div>
      <Card className="mt-8 p-3 px-3">
        <CardContent className="p-0">
          <form
            id="medicine-form"
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
                        Medicine Name
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter medicine name"
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
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter price"
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
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter stock quantity"
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
                      <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                      <Input
                        type="url"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="categoryId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      >
                        <option value="">Select category</option>
                        {categoriesItem?.map((item) => (
                          <option key={item.id} value={`${item.id}`}>
                            {item.name}
                          </option>
                        ))}
                      </select>
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
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter discount amount"
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
            form="medicine-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            {!loading ? (
              "Add Medicine"
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
