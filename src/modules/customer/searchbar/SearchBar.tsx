"use client";

import {
  searchMedicineAction,
} from "@/actions/medicineAction";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/types";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  search: z.string().min(3, "Minimum length is 3"),
});

export default function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const { data } = await searchMedicineAction(value.search);
        setSearchData(data?.data || []);
        setShowDropdown(true);
      } catch (err) {
        toast.error("Something went wrong, please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="md:w-2/5 w-full mx-auto px-3 py-5 relative"
    >
      <div className="flex items-center gap-3">
        <form
          id="search"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="w-full"
        >
          <FieldGroup>
            <form.Field
              name="search"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <Input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Search medicine..."
                      className="h-11"
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
          form="search"
          type="submit"
          className="w-24 py-5"
        >
          {!loading ? (
            "Search"
          ) : (
            <span className="flex items-center gap-2 py-">
              <Spinner />
              Loading
            </span>
          )}
        </Button>
      </div>

      {showDropdown && (
        <div className="absolute left-3 right-3 mt-2 bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
          {searchData.length > 0 ? (
            searchData.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-4 p-3 hover:bg-gray-100 transition border-b last:border-b-0"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border">
                  <Image
                    src={item.images}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold text-sm">
                    ৳ {item.price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No medicine found!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
