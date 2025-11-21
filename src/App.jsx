// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// API service
import api from "./services/api";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./components/AdminPanel";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dyed from "./pages/Dyed";
import Contact from "./pages/contact";
import Fabrics from "./pages/fabrics";
import AboutUs from "./pages/about";

// Policy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsConditions from "./pages/TermsandConditions";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    async function testAPI() {
      try {
        const endpoints = ["/health", "/products", "/test"];
        for (const endpoint of endpoints) {
          try {
            const res = await api.get(endpoint);
            console.log(`✅ Backend Connected via ${endpoint}:`, res.data);
            setBackendStatus("online");
            return;
          } catch (endpointError) {
            console.log(`⚠️ Endpoint ${endpoint} failed:`, endpointError.message);
            continue;
          }
        }
        setBackendStatus("offline");
        console.error("🚨 All backend endpoints failed");
      } catch (err) {
        setBackendStatus("offline");
        console.error("🚨 Backend Connection Failed:", {
          message: err.message,
          code: err.code,
          url: err.config?.url,
        });
      }
    }

    testAPI();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            {backendStatus === "offline" && (
              <div className="bg-red-500 text-white text-center py-2 px-4">
                ⚠️ Backend connection failed. Some features may not work.
              </div>
            )}
            {backendStatus === "checking" && (
              <div className="bg-blue-500 text-white text-center py-2 px-4">
                🔍 Checking backend connection...
              </div>
            )}

            {/* Header */}
            <Routes>
              <Route path="/admin/login" element={null} />
              <Route path="*" element={<Header />} />
            </Routes>

            <main className="flex-grow pt-20 pb-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dyed" element={<Dyed />} />
                <Route path="/fabrics" element={<Fabrics />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsConditions />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={<Footer />} />
            </Routes>

            <Cart />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
