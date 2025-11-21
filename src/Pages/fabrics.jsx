// src/pages/Fabrics.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { dyedProducts } from "../data/fabricsdata";
import { useCart } from "../context/CartContext";

const fabrics = () => {
  const [filteredProducts, setFilteredProducts] = useState(dyedProducts);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedSpecs, setExpandedSpecs] = useState({});
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const location = useLocation();
  const { addToCart } = useCart();

  // Get category and search term from URL
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category");
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // Filter logic (category from header + search)
  useEffect(() => {
    let filtered = dyedProducts;

    // Filter by category from header
    if (urlCategory) {
      filtered = filtered.filter(
        (product) => product.category === urlCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );

      // Sort so that exact/close matches come first
      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aExact = aName === searchTerm;
        const bExact = bName === searchTerm;
        const aStarts = aName.startsWith(searchTerm);
        const bStarts = bName.startsWith(searchTerm);

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return aName.localeCompare(bName);
      });
    }

    setFilteredProducts(filtered);

    // GSAP animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [urlCategory, searchTerm]);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    console.log(`${product.name} added to cart!`);
  };

  // Toggle specifications visibility
  const toggleSpecs = (productId) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Open Image Modal
  const openImageModal = (product) => {
    setSelectedImage(product);
    document.body.style.overflow = "hidden";
  };

  // Close Image Modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking outside the image
  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      closeImageModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedImage) {
        closeImageModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  // Render specifications
  const renderSpecifications = (specs, productId) => {
    if (!specs) return null;

    const isExpanded = expandedSpecs[productId];
    
    return (
      <div className="mt-3 border-t border-gray-300 pt-3">
        <button
          onClick={() => toggleSpecs(productId)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 hover:text-gray-900 transition-colors"
        >
          <span>📋 Product Specifications</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-2 animate-fadeIn text-xs">
            {specs.weave && (
              <div className="flex justify-between">
                <span className="text-gray-600">Weave:</span>
                <span className="text-gray-900 font-medium">{specs.weave}</span>
              </div>
            )}
            {specs.count && (
              <div className="flex justify-between">
                <span className="text-gray-600">Count:</span>
                <span className="text-gray-900 font-medium">{specs.count}</span>
              </div>
            )}
            {specs.gsm && (
              <div className="flex justify-between">
                <span className="text-gray-600">GSM:</span>
                <span className="text-gray-900 font-medium">{specs.gsm}</span>
              </div>
            )}
            {specs.width && (
              <div className="flex justify-between">
                <span className="text-gray-600">Width:</span>
                <span className="text-gray-900 font-medium">{specs.width}</span>
              </div>
            )}
            {specs.composition && (
              <div className="flex justify-between">
                <span className="text-gray-600">Composition:</span>
                <span className="text-gray-900 font-medium text-right">{specs.composition}</span>
              </div>
            )}
            {specs.finish && (
              <div className="flex justify-between">
                <span className="text-gray-600">Finish:</span>
                <span className="text-gray-900 font-medium">{specs.finish}</span>
              </div>
            )}
            {specs.usage && (
              <div className="flex justify-between">
                <span className="text-gray-600">Usage:</span>
                <span className="text-gray-900 font-medium text-right">{specs.usage}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (urlCategory) {
      // Convert URL parameter to display name
      const categoryNames = {
        'plain weaves': 'Plain Weaves',
        'Twill weaves': 'Twill Weaves', 
        'satin weave': 'Satin Weave',
        'Drill weaves': 'Drill Weaves',
        'Dobby weave': 'Dobby Weave',
        'Jacquars weave': 'Jacquard Weave'
      };
      return categoryNames[urlCategory] || urlCategory;
    }
    return "All Fabrics";
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            {getCurrentCategoryName()}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Discover our premium collection of high-quality fabrics
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300"
              >
                {/* Clickable Image with Zoom Effect */}
                <div 
                  className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer"
                  onClick={() => openImageModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Product Details */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-gray-900 font-bold mb-3 text-xl">
                    ₹{product.price.toLocaleString()}
                  </p>
                  
                  {/* Product Tags */}
                  {product.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Product Specifications */}
                  {product.specifications && renderSpecifications(product.specifications, product.id)}
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg mt-3 border border-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-300">
            <div className="max-w-md mx-auto">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                No fabrics found
              </h2>
              <p className="text-gray-600 text-base mb-8">
                {searchTerm 
                  ? `No fabrics found for "${searchTerm}". Try different keywords.`
                  : urlCategory
                  ? `No fabrics available in ${getCurrentCategoryName()}.`
                  : "No fabrics available at the moment."
                }
              </p>
              {(searchTerm || urlCategory) && (
                <button
                  onClick={() => window.location.href = '/fabrics'}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition font-semibold text-base shadow-md hover:shadow-lg border border-gray-700"
                >
                  View All Fabrics
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          <div className="relative max-w-4xl max-h-full w-full bg-white rounded-xl overflow-hidden border border-gray-300">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Product Image */}
              <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-100">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.name}
                  className="max-w-full max-h-96 object-contain rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 p-6 bg-white overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.name}</h3>
                <p className="text-xl font-semibold text-gray-900 mb-4">
                  ₹{selectedImage.price.toLocaleString()}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedImage.description}
                </p>

                {/* Specifications in Modal */}
                {selectedImage.specifications && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                      📋 Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {Object.entries(selectedImage.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-200 pb-2 last:border-b-0">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="text-gray-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags in Modal */}
                {selectedImage.tags && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add to Cart Button in Modal */}
                <button 
                  onClick={() => {
                    handleAddToCart(selectedImage);
                    closeImageModal();
                  }}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-700"
                >
                  Add to Cart - ₹{selectedImage.price.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default fabrics;