// src/pages/Dyed.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { dyedProducts } from "../data/products";
import { useCart } from "../context/CartContext";

const Dyed = () => {
  const [filteredProducts, setFilteredProducts] = useState(dyedProducts);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedSpecs, setExpandedSpecs] = useState({});
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const location = useLocation();
  const { addToCart } = useCart();

  // Get search term from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    let filtered = dyedProducts;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredProducts(filtered);

    // GSAP animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [searchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log(`${product.name} added to cart!`);
  };

  const toggleSpecs = (productId) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const openImageModal = (product) => {
    setSelectedImage(product);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      closeImageModal();
    }
  };

  // Clear search filter
  const clearFilters = () => {
    window.location.href = '/dyed';
  };

  // Render specifications
  const renderSpecifications = (specs, productId) => {
    if (!specs) return null;

    const isExpanded = expandedSpecs[productId];
    
    return (
      <div className="mt-3 border-t border-gray-600 pt-3">
        <button
          onClick={() => toggleSpecs(productId)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 hover:text-black transition-colors"
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
            {specs.category && (
              <div className="flex justify-between">
                <span className="text-gray-700">Category:</span>
                <span className="text-black font-medium">{specs.category}</span>
              </div>
            )}
            {specs.subCategory && (
              <div className="flex justify-between">
                <span className="text-gray-700">Sub Category:</span>
                <span className="text-black font-medium">{specs.subCategory}</span>
              </div>
            )}
            {specs.count && (
              <div className="flex justify-between">
                <span className="text-gray-700">Count:</span>
                <span className="text-black font-medium">{specs.count}</span>
              </div>
            )}
            {specs.weave && (
              <div className="flex justify-between">
                <span className="text-gray-700">Weave:</span>
                <span className="text-black font-medium">{specs.weave}</span>
              </div>
            )}
            {specs.gsm && (
              <div className="flex justify-between">
                <span className="text-gray-700">GSM:</span>
                <span className="text-black font-medium">{specs.gsm}</span>
              </div>
            )}
            {specs.width && (
              <div className="flex justify-between">
                <span className="text-gray-700">Width:</span>
                <span className="text-black font-medium">{specs.width}</span>
              </div>
            )}
            {specs.composition && (
              <div className="flex justify-between">
                <span className="text-gray-700">Composition:</span>
                <span className="text-black font-medium text-right">{specs.composition}</span>
              </div>
            )}
            {specs.finish && (
              <div className="flex justify-between">
                <span className="text-gray-700">Finish:</span>
                <span className="text-black font-medium">{specs.finish}</span>
              </div>
            )}
            {specs.usage && (
              <div className="flex justify-between">
                <span className="text-gray-700">Usage:</span>
                <span className="text-black font-medium text-right">{specs.usage}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">
            Premium Dyed Fabrics
          </h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
            Discover our exclusive collection of high-quality dyed fabrics with vibrant colors and excellent finish
          </p>

          {/* Active Filters Display */}
          {searchTerm && (
            <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
              <span className="text-sm text-gray-700">Active filter:</span>
              
              <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button 
                  onClick={clearFilters}
                  className="text-gray-300 hover:text-white"
                >
                  ×
                </button>
              </span>
              
              <button
                onClick={clearFilters}
                className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors border border-gray-700"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300"
              >
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
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-black mb-2 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-black font-bold mb-3 text-xl">
                    ₹{product.price.toLocaleString()}
                  </p>
                  
                  {/* Product Tags */}
                  {product.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full border border-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {product.description || 'Premium dyed fabric with excellent color fastness and finish'}
                  </p>
                  
                  {/* Product Specifications */}
                  {product.specifications && renderSpecifications(product.specifications, product.id)}
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg mt-3 border border-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-300">
            <div className="max-w-md mx-auto">
              <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">
                No dyed fabrics found
              </h2>
              <p className="text-gray-700 text-base mb-8">
                {searchTerm 
                  ? `No dyed fabrics found for "${searchTerm}". Try searching with different keywords.`
                  : "Currently no dyed fabrics available."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-base shadow-md hover:shadow-lg border border-gray-700"
                >
                  View All Dyed Fabrics
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
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-black z-10 bg-white rounded-full p-2 shadow-lg border border-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-100">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.name}
                  className="max-w-full max-h-96 object-contain rounded-lg"
                />
              </div>

              <div className="lg:w-1/2 p-6 bg-white overflow-y-auto">
                <h3 className="text-2xl font-bold text-black mb-2">{selectedImage.name}</h3>
                <p className="text-xl font-semibold text-black mb-4">
                  ₹{selectedImage.price.toLocaleString()}
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedImage.description || 'Premium dyed fabric with excellent quality'}
                </p>

                {selectedImage.specifications && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-3 border-b border-gray-600 pb-2">
                      📋 Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {Object.entries(selectedImage.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-300 pb-2 last:border-b-0">
                          <span className="text-gray-700 capitalize">{key}:</span>
                          <span className="text-black font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags in Modal */}
                {selectedImage.tags && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full border border-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    handleAddToCart(selectedImage);
                    closeImageModal();
                  }}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-700"
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

export default Dyed;