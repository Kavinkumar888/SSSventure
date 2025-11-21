// src/pages/PrivacyPolicy.jsx
import React, { useRef, useEffect } from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import gsap from 'gsap';

const PrivacyPolicy = () => {
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
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Privacy Policy
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
                <FileText className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At <strong>SSS Ventures</strong> ("we," "our," or "us"), we are committed to protecting 
                  your privacy and ensuring the security of your personal information. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services.
                </p>
                <p>
                  By accessing our website or providing your information to us, you accept and agree to 
                  the practices described in this Privacy Policy.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Name and contact details (email address, phone number)</li>
                    <li>Company name and business information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="policy-section mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Service Provision",
                    description: "To process your orders, provide textile solutions, and manage your account"
                  },
                  {
                    title: "Communication",
                    description: "To respond to your inquiries and provide customer support"
                  },
                  {
                    title: "Improvement",
                    description: "To enhance our website, services, and customer experience"
                  },
                  {
                    title: "Marketing",
                    description: "To send relevant updates about our products and services (with your consent)"
                  },
                  {
                    title: "Legal Compliance",
                    description: "To comply with applicable laws and regulations"
                  },
                  {
                    title: "Security",
                    description: "To protect against fraud and maintain website security"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sharing and Disclosure */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With service providers who assist in our business operations</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>In connection with business transfers or mergers</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Security</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, 
                  or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Rights</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Right to access your personal information",
                  "Right to correct inaccurate data",
                  "Right to delete your personal information",
                  "Right to restrict processing",
                  "Right to data portability",
                  "Right to object to processing",
                  "Right to withdraw consent",
                  "Right to lodge complaints"
                ].map((right, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-600">{right}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cookies */}
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and understand user behavior. You can control cookie 
                  preferences through your browser settings.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="policy-section bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> sssventures6@gmail.com</p>
                  <p><strong>Phone:</strong> +91 95855 19593</p>
                  <p><strong>Address:</strong> SSS VENTURES, Pallipalayam, Erode - 638008</p>
                </div>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="policy-section mt-8 text-center">
              <p className="text-gray-500 text-sm">
                We may update this Privacy Policy from time to time. Any changes will be posted 
                on this page with an updated revision date.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;