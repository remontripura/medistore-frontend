import React from "react";
import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medistore | Privacy & Policy",
  description: "Privacy & Policy",

};
export default function PrivacyPolicy() {
  return (
    <section className="py-5 bg-gray-50">
      <MainContainer>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Privacy Policy
          </h1>

          <p className="mb-4 text-gray-700">
            At Medistore, your privacy is our top priority. This privacy policy
            explains how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Information We Collect
          </h2>
          <p className="mb-4 text-gray-700">
            We collect personal information such as your name, email, phone
            number, and delivery address to process orders and improve our
            services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            How We Use Your Information
          </h2>
          <p className="mb-4 text-gray-700">
            Your information is used to fulfill orders, communicate updates,
            personalize your experience, and ensure secure transactions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Data Security
          </h2>
          <p className="mb-4 text-gray-700">
            We implement robust security measures to protect your personal
            data from unauthorized access or disclosure.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Third-Party Services
          </h2>
          <p className="mb-4 text-gray-700">
            We may share information with trusted third-party services that
            assist in order processing and delivery. We never sell your
            personal information.
          </p>

          <p className="mt-6 text-gray-700">
            By using Medistore, you agree to the terms of this Privacy Policy.
          </p>
        </div>
      </MainContainer>
    </section>
  );
}
