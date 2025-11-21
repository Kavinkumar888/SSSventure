// src/pages/ShippingPolicy.jsx
import React, { useRef, useEffect } from 'react';
import { Truck, Clock, Package, MapPin, Phone, Mail, Shield } from 'lucide-react';
import gsap from 'gsap';

const ShippingPolicy = () => {
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

  const shippingRates = [
    {
      region: "Local (Erode & nearby)",
      deliveryTime: "1-2 business days",
      cost: "Free",
      minOrder: "No minimum"
    },
    {
      region: "Tamil Nadu",
      deliveryTime: "2-3 business days",
      cost: "₹100 - ₹300",
      minOrder: "₹5,000+ (Free shipping)"
    },
    {
      region: "South India",
      deliveryTime: "3-4 business days",
      cost: "₹300 - ₹600",
      minOrder: "₹10,000+ (Free shipping)"
    },
    {
      region: "Rest of India",
      deliveryTime: "4-7 business days",
      cost: "₹500 - ₹1,000",
      minOrder: "₹15,000+ (Free shipping)"
    },
    {
      region: "International",
      deliveryTime: "7-15 business days",
      cost: "Calculated at checkout",
      minOrder: "Custom quote required"
    }
  ];

  const shippingMethods = [
    {
      method: "Standard Shipping",
      time: "3-7 business days",
      cost: "Based on location",
      description: "Regular ground transportation for bulk fabrics"
    },
    {
      method: "Express Shipping",
      time: "1-3 business days",
      cost: "Additional 50% of standard",
      description: "Priority handling and faster delivery"
    },
    {
      method: "White Glove Delivery",
      time: "5-10 business days",
      cost: "Custom quote",
      description: "Special handling for delicate and premium fabrics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
                <Truck className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Shipping Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reliable fabric delivery across India and worldwide
            </p>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Introduction */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Shipping Overview</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At <strong>SSS Ventures</strong>, we understand the importance of timely delivery 
                  for your textile business. Our comprehensive shipping policy ensures your 
                  fabric orders reach you safely and on time, every time.
                </p>
                <p>
                  We partner with trusted logistics providers to offer reliable shipping 
                  solutions across India and international destinations.
                </p>
              </div>
            </div>

            {/* Processing Time */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Order Processing</h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "Order Confirmation",
                      time: "Within 2 hours",
                      description: "Instant email confirmation after payment"
                    },
                    {
                      step: "Fabric Inspection",
                      time: "24-48 hours",
                      description: "Quality check and measurement verification"
                    },
                    {
                      step: "Dispatch Ready",
                      time: "1-2 business days",
                      description: "Packaging and shipping label generation"
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.step}</h3>
                      <p className="text-blue-700 font-medium text-sm mb-1">{item.time}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <strong>Note:</strong> Processing time may vary for custom dyeing orders and 
                  bulk quantities. We'll notify you of any delays.
                </p>
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Methods</h2>
              <div className="space-y-4">
                {shippingMethods.map((method, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{method.method}</h3>
                        <p className="text-gray-600 mb-2">{method.description}</p>
                      </div>
                      <div className="text-right mt-4 md:mt-0">
                        <p className="text-gray-800 font-semibold">{method.time}</p>
                        <p className="text-blue-600 font-medium">{method.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Rates & Delivery Time */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Rates & Delivery Time</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                        Delivery Region
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                        Estimated Delivery
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                        Shipping Cost
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                        Free Shipping Minimum
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((rate, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                          {rate.region}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">
                          {rate.deliveryTime}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">
                          {rate.cost}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">
                          {rate.minOrder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bulk Order Shipping */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bulk Order Shipping</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  For bulk fabric orders (typically 100+ meters), we offer specialized 
                  shipping solutions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dedicated truckload services for large quantities</li>
                  <li>Custom packaging with moisture-resistant materials</li>
                  <li>Tracking and monitoring throughout transit</li>
                  <li>Flexible delivery scheduling</li>
                  <li>On-site delivery coordination available</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Bulk order shipping rates are calculated based on 
                    weight, volume, and destination. Contact us for a custom quote.
                  </p>
                </div>
              </div>
            </div>

            {/* International Shipping */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">International Shipping</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We ship fabrics worldwide with complete documentation and customs support:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Included Services</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Customs documentation</li>
                      <li>• Export packaging</li>
                      <li>• Real-time tracking</li>
                      <li>• Insurance coverage</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">⚠️ Customer Responsibility</h4>
                    <ul className="space-y-1 text-orange-700 text-sm">
                      <li>• Import duties and taxes</li>
                      <li>• Customs clearance delays</li>
                      <li>• Local delivery coordination</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking & Support */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Order Tracking & Support</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Once your order is shipped, you'll receive:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Shipping confirmation email with tracking number</li>
                  <li>Real-time tracking updates via SMS and email</li>
                  <li>Estimated delivery date notifications</li>
                  <li>24/7 customer support for shipping inquiries</li>
                </ul>
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <p className="text-gray-700">
                    <strong>Delivery Attempts:</strong> We make 2 delivery attempts. If unsuccessful, 
                    the package will be held at the local courier office for 5 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Damaged or Lost Shipments */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Damaged or Lost Shipments</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Immediate Action Required</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• <strong>Inspect delivery immediately</strong> upon receipt</li>
                    <li>• <strong>Note any damage</strong> on the delivery receipt</li>
                    <li>• <strong>Take photos</strong> of damaged packaging/products</li>
                    <li>• <strong>Contact us within 24 hours</strong> of delivery</li>
                  </ul>
                </div>
                <p>
                  We fully insure all shipments against loss or damage during transit. 
                  In case of issues, we'll promptly arrange for replacement or refund.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="policy-section bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Shipping Address & Contact</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Warehouse Address</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>SSS VENTURES</p>
                    <p>Pallipalayam</p>
                    <p>Erode - 638008</p>
                    <p>Tamil Nadu, India</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Shipping Support</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>+91 95855 19593</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>sssventures6@gmail.com</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Available Mon-Sat: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="policy-section mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Shipping rates and delivery times are subject to change based on carrier 
                availability and seasonal demands. Current rates are confirmed at checkout.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;