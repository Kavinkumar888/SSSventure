import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" }
  ];

  const socialLinks = [
    { icon: Facebook, url: "#", label: "Facebook" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Instagram, url: "#", label: "Instagram" },
    { icon: Mail, url: "mailto:contact@sssventures.com", label: "Email" }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Thank you for subscribing with: ${email}`);
    e.target.reset();
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content - 3 Columns Only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">SSS Ventures</h1>
              <h2 className="text-lg text-gray-300">Textile Solutions</h2>
            </div>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={18} />
                <span className="text-base">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-base leading-relaxed">
                  SSS VENTURES,<br />
                  Pallipalayam, Erode - 638008
                </span>
              </div>
            </div>
                        <div>
              <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-600">
                Newsletter
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 text-base">
                  Subscribe to get updates on new products and offers.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Policies Combined */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-600">
                Quick Links
              </h3>
              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium block py-1 hover:translate-x-2 transform transition-transform"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter & Social */}
          <div className="space-y-6">
            {/* Policies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-600">
                Policies
              </h3>
              <div className="space-y-4">
                {policyLinks.map((policy) => (
                  <div key={policy.name}>
                    <Link
                      to={policy.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium block py-1 hover:translate-x-2 transform transition-transform"
                    >
                      {policy.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-600">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center space-y-6">
          {/* Copyright */}
          <div className="space-y-4">
            <p className="text-gray-300 text-base">
              &copy; {currentYear} SSS Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;