"use client";

import { createReview } from "@/actions/review.action";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { MedicineDetails, Review } from "@/types";
import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import z from "zod";

interface ReviewsProps {
  shopData: MedicineDetails | undefined;
  itemId: string;
  reviews: Review[];
}

const formSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  })
  .required();

type FormValues = z.infer<typeof formSchema>;

interface ReviewType {
  id: number;
  title: string;
  description: string;
  rating: number;
}

export default function ReviewPageComponent({
  shopData,
  reviews,
  itemId,
}: ReviewsProps) {
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0";

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    } as FormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      try {
        if (rating === 0) {
          setLoading(false);
          return toast.error(
            "Please provide a rating before submitting your review.",
            {
              position: "top-center",
            },
          );
        }
        const { data } = await createReview(
          { ...value, ratings: rating },
          itemId,
        );
        if (data.success === false) {
          toast.error(data?.details || "Error: Review not created.", {
            position: "top-center",
          });
        } else {
          toast.success("Review submitted successfully!", {
            position: "top-center",
          });
          form.reset();
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
  });

  return (
    <div className="h-auto py-6">
      <MainContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">Reviews</h1>
          <p className="text-slate-800 text-lg">
            See what our customers are saying about us
          </p>
        </motion.div>
        <Card className="rounded-2xl">
          <CardContent className="p-3 flex gap-10 items-center">
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="text-6xl font-bold leading-none">
                {shopData?.avg_review ? shopData.avg_review.toFixed(1) : "0"}
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(Number(shopData?.avg_review || 0))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-400 text-sm">{totalReviews} reviews</p>
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-7 h-7 cursor-pointer transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-slate-600 hover:text-yellow-400"
                  }`}
                />
              ))}
            </div>
            <form
              id="review-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-3"
            >
              <FieldGroup>
                <form.Field
                  name="title"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
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
                  name="description"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Description
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-28"
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
              form="review-form"
              type="submit"
              className="w-full md:w-fit py-4 cursor-pointer"
            >
              {!loading ? (
                "Submit Review"
              ) : (
                <span className="flex items-center gap-3">
                  <Spinner />
                  Processing
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Review List */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className=" border border-slate-300 rounded-2xl shadow-lg h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={review.user?.image || ""}
                      />
                      <AvatarFallback>
                        <FaUser />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{review.title}</h3>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.ratings
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {review.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </MainContainer>
    </div>
  );
}
