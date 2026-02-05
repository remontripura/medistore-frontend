"use client";

import { addOrderAction } from "@/actions/order.action";
import HeadingOne from "@/components/shared/heading/HeadingOne";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useMedicineStore } from "@/store/addToCart.store";
import { MedicineDetails } from "@/types";
import { useForm } from "@tanstack/react-form";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  address: z.string().min(5, "Enter your valid address"),
});

export default function CheckoutPageComponent() {
  const storeMedicines = useMedicineStore((state) => state.medicines);
  const removeMedicine = useMedicineStore((state) => state.removeMedicine);
  const [medicines, setMedicines] = useState<MedicineDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      address: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      removeMedicine(medicines[0].id);
      setLoading(true);
      const items = medicines.map((item) => ({
        productId: item.id,
        quantity: item.count,
      }));
      const finalValue = {
        ...value,
        items,
      };
      try {
        const { data } = await addOrderAction(finalValue);
        form.reset();
        setLoading(false);
        toast.success("Order Successfully!", { position: "top-center" });
        router.push("/");
        items.forEach((item) => {
          removeMedicine(item.productId);
        });
      } catch (err) {
        toast.error("Something went wrong, please try again.");
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (storeMedicines?.length) {
      setMedicines(
        storeMedicines.map((item) => ({
          ...item,
          count: item.count ?? 1,
        })),
      );
    }
  }, [storeMedicines]);

  const handleIncrement = (id: string) => {
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              count:
                item.count! < 3 && item.count! < item.stock
                  ? item.count! + 1
                  : item.count,
            }
          : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              count: item.count! > 1 ? item.count! - 1 : item.count,
            }
          : item,
      ),
    );
  };

  return (
    <section className="md:pt-20 pt-10">
      <MainContainer>
        <div className="grid grid-cols-12 gap-3">
          <div className="space-y-6 col-span-8">
            <form
              id="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Enter your address
                        </FieldLabel>
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
            {medicines.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-200 p-2 rounded-lg"
              >
                <Image
                  src={item.images}
                  alt={item.name}
                  width={120}
                  height={120}
                />

                <div className="space-y-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <div className="flex items-center gap-3">
                    <p>Price: Tk {Number(item.price).toLocaleString()}</p>
                    <p className="line-through">
                      {" "}
                      {Number(item.discount).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-medium">Quantity:</span>

                    <div className="flex items-center rounded-lg overflow-hidden border bg-white p-2">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        disabled={item.count === 1}
                        className="px-3 py-1 bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-4">{item.count}</span>

                      <button
                        onClick={() => handleIncrement(item.id)}
                        disabled={item.count === 3 || item.count === item.stock}
                        className="px-3 py-1 bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-4 p-3 space-y-3">
            <HeadingOne text="Checkout" className="text-center" />

            <div className="flex items-center justify-between ">
              <span>Total Price</span>
              <span>
                Tk{" "}
                {medicines
                  .reduce(
                    (total, item) =>
                      total + Number(item.count) * Number(item.price),
                    0,
                  )
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between ">
              <span>Total Select Item</span>
              <span>{medicines.length ?? 0}</span>
            </div>
            <div className="flex items-center justify-between ">
              <span>Delivery Fee</span>
              <span>Tk 150</span>
            </div>
            <Button
              disabled={loading}
              form="checkout-form"
              type="submit"
              className="w-full cursor-pointer"
            >
              {!loading ? (
                "checkout"
              ) : (
                <span className="flex items-center gap-3">
                  {" "}
                  <Spinner data-icon="inline-start" />
                  Processing
                </span>
              )}
            </Button>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
