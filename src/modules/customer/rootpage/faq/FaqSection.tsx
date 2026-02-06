"use client";

import HeadingOne from "@/components/shared/heading/HeadingOne";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Faqs = [
  {
    id: 1,
    question: "What is Medistore?",
    answer:
      "Medistore is your trusted online medicine store offering authentic medicines, healthcare products, and fast delivery to your doorstep.",
  },
  {
    id: 2,
    question: "How can I place an order?",
    answer:
      "You can place an order by browsing our products, adding them to your cart, and completing the checkout process with your preferred payment method.",
  },
  {
    id: 3,
    question: "Do you deliver nationwide?",
    answer:
      "Yes, we deliver medicines and healthcare products all over Bangladesh with safe and timely delivery.",
  },
  {
    id: 4,
    question: "Can I return or exchange a product?",
    answer:
      "Yes, you can request a return or exchange within 7 days of receiving your order, subject to our return policy.",
  },
  {
    id: 5,
    question: "Is my personal information safe?",
    answer:
      "Absolutely! We take privacy seriously and ensure your personal information is protected and never shared with third parties.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const toggleFaq = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <section className="max-w-4xl w-full mx-auto my-5 px-3">
      <HeadingOne text="FAQ" className="text-center" />

      <div className="space-y-3 mt-3">
        {Faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full text-left px-5 py-4 text-gray-800 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
