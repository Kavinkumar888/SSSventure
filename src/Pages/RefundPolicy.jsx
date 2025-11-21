// src/pages/RefundPolicy.jsx
import React, { useRef, useEffect } from 'react';
import { ArrowLeftRight, Clock, Shield, Mail, Phone } from 'lucide-react';
import gsap from 'gsap';

const RefundPolicy = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      ".policy-section",
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <ArrowLeftRight className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Refund & Return Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Introduction */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Our Commitment</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At <strong>SSS Ventures</strong>, we strive to ensure complete customer satisfaction 
                  with our textile products and services. This Refund & Return Policy outlines the 
                  conditions under which returns and refunds are processed.
                </p>
                <p>
                  Please read this policy carefully before making a purchase. By placing an order 
                  with us, you agree to the terms outlined below.
                </p>
              </div>
            </div>

            {/* Return Eligibility */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Return Eligibility</h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Eligible for Return</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-700 ml-4">
                    <li>Defective or damaged products received</li>
                    <li>Wrong items shipped compared to order</li>
                    <li>Significant quality issues not meeting specifications</li>
                    <li>Manufacturing defects discovered upon inspection</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Not Eligible for Return</h3>
                  <ul className="list-disc list-inside space-y-2 text-red-700 ml-4">
                    <li>Custom-made or bespoke fabric orders</li>
                    <li>Products cut or altered after delivery</li>
                    <li>Bulk orders where sampling was approved</li>
                    <li>Change of mind or color preference</li>
                    <li>Products damaged due to improper handling by customer</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Process */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Return Process</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Request Return",
                    description: "Contact us within 7 days of delivery with order details and reason for return"
                  },
                  {
                    step: "2",
                    title: "Get Approval",
                    description: "We'll review your request and provide return authorization if eligible"
                  },
                  {
                    step: "3",
                    title: "Ship Back",
                    description: "Return the product in original condition with all tags and packaging"
                  },
                  {
                    step: "4",
                    title: "Receive Refund",
                    description: "Get your refund processed within 7-10 business days after inspection"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Timeframe for Returns</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Return Window</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Return requests must be made within <strong>7 days</strong> of delivery</li>
                      <li>• Products must be shipped back within <strong>3 days</strong> of return approval</li>
                      <li>• Refunds processed within <strong>7-10 business days</strong> after receipt</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Inspection Period</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• All returned products undergo quality inspection</li>
                      <li>• Inspection completed within <strong>2-3 business days</strong></li>
                      <li>• Refund amount determined based on inspection results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Methods */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Refund Methods</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    method: "Original Payment",
                    details: "Refunded to original payment method"
                  },
                  {
                    method: "Bank Transfer",
                    details: "Direct transfer to your bank account"
                  },
                  {
                    method: "Store Credit",
                    details: "Credit for future purchases (optional)"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.method}</h3>
                    <p className="text-gray-600 text-sm">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Costs */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Costs</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Shipping Responsibility</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• <strong>We cover return shipping</strong> for defective/wrong items</li>
                    <li>• <strong>Customer covers return shipping</strong> for change of mind returns (if applicable)</li>
                    <li>• Original shipping costs are non-refundable for non-defective returns</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bulk Orders */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bulk & Custom Orders</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  For bulk orders and custom fabric manufacturing, specific return policies apply:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Approved samples determine final product acceptance</li>
                  <li>Custom dye lots and fabric weaves are non-returnable</li>
                  <li>Bulk order returns subject to 25% restocking fee</li>
                  <li>Minimum 90% of fabric must be unused and in original condition</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="policy-section bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Contact for Returns</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  To initiate a return or for any questions about our refund policy, 
                  please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> sssventures6@gmail.com</p>
                  <p><strong>Phone:</strong> +91 95855 19593</p>
                  <p><strong>Address:</strong> SSS VENTURES, Pallipalayam, Erode - 638008</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Please have your order number and relevant details ready when contacting us 
                  about returns or refunds.
                </p>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="policy-section mt-8 text-center">
              <p className="text-gray-500 text-sm">
                We reserve the right to modify this refund policy at any time. 
                Changes will be effective immediately upon posting on our website.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;