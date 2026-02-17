"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewType {
  id: number;
  title: string;
  description: string;
  rating: number;
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      id: 1,
      title: "Excellent Service",
      description:
        "The experience was smooth and professional. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      title: "Very Good Support",
      description:
        "Support team was responsive and helpful throughout the process.",
      rating: 4,
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "0";

  const handleSubmit = () => {
    if (!title || !description || rating === 0) return;

    const newReview: ReviewType = {
      id: Date.now(),
      title,
      description,
      rating,
    };

    setReviews([newReview, ...reviews]);
    setTitle("");
    setDescription("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-slate-400 text-lg">
            See what our customers are saying about us
          </p>
        </motion.div>

        {/* Stats Section */}
        <Card className="bg-slate-900/70 border border-slate-800 shadow-2xl rounded-2xl">
          <CardContent className="p-8 grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold">{averageRating}</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(Number(averageRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-400">Average Rating</p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-5xl font-bold">{totalReviews}</p>
              <p className="text-slate-400">Total Reviews</p>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400">Overall Satisfaction</p>
              <Progress
                value={(Number(averageRating) / 5) * 100}
                className="h-3"
              />
              <p className="text-sm text-slate-500">
                {((Number(averageRating) / 5) * 100).toFixed(0)}% Positive
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card className="bg-slate-900/70 border border-slate-800 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              placeholder="Review Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
            <Textarea
              placeholder="Write your experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border-slate-700 min-h-[120px]"
            />

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

            <Button
              onClick={handleSubmit}
              className="w-full rounded-2xl text-lg font-semibold"
            >
              Submit Review
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
              <Card className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/100" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {review.title}
                      </h3>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
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
      </div>
    </div>
  );
}
