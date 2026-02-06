import MainContainer from "@/components/shared/mainContainer/MainContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medistore | Terms & Conditions",
  description: "Terms & Conditions",
};

export default function TermsAndConditions() {
  return (
    <section className="py-5 bg-gray-50">
      <MainContainer>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Terms & Conditions
          </h1>

          <p className="mb-4 text-gray-700">
            Welcome to Medistore! By accessing or using our website, you agree
            to the following terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Use of Website
          </h2>
          <p className="mb-4 text-gray-700">
            You may use our website for personal, non-commercial purposes only.
            Any unauthorized use may result in account termination.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Orders and Payments
          </h2>
          <p className="mb-4 text-gray-700">
            All orders are subject to product availability. Payments must be
            completed through the approved payment methods.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Returns & Refunds
          </h2>
          <p className="mb-4 text-gray-700">
            Returns and refunds are handled according to our return policy.
            Please review it before placing your order.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Limitation of Liability
          </h2>
          <p className="mb-4 text-gray-700">
            Medistore is not liable for any indirect, incidental, or
            consequential damages arising from the use of our services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            Changes to Terms
          </h2>
          <p className="mb-4 text-gray-700">
            We may update these terms at any time. Continued use of the website
            constitutes acceptance of the revised terms.
          </p>

          <p className="mt-6 text-gray-700">
            By using Medistore, you agree to abide by these Terms & Conditions.
          </p>
        </div>
      </MainContainer>
    </section>
  );
}
