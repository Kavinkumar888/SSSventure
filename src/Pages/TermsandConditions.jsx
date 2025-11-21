// src/pages/TermsConditions.jsx
import React from "react";

const TermsandConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using SSS Ventures' services, you agree to be bound by these 
                Terms and Conditions and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Order Acceptance</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Prices are subject to change without prior notice</li>
                <li>Order confirmation does not constitute acceptance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payment Terms</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>50% advance payment for all orders</li>
                <li>Balance payment before shipment</li>
                <li>Payment methods: Bank transfer, UPI, Cheque</li>
                <li>Credit terms available for established customers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Quality Assurance</h2>
              <p className="text-gray-700 mb-4">
                We maintain strict quality control standards. However, slight variations may occur in:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Color shades between different dye lots</li>
                <li>Fabric texture and hand feel</li>
                <li>Print alignment and patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                SSS Ventures shall not be liable for any indirect, special, or consequential damages 
                arising from the use of our products or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Governing Law</h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of courts in Erode, Tamil Nadu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsandConditions;