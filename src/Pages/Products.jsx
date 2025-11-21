// src/pages/Products.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { allProducts } from "../data/products";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedSpecs, setExpandedSpecs] = useState({});
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const zoomRef = useRef(null);
  const location = useLocation();
  const { addToCart } = useCart();

  // Get all URL parameters
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category");
  const urlSubCategory = queryParams.get("subCategory");
  const urlType = queryParams.get("type");
  const urlFabricType = queryParams.get("fabricType");
  const urlNestedCategory = queryParams.get("nestedCategory");
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // Check if current category needs vertical layout
  const needsVerticalLayout = () => {
    return urlCategory && (
      urlCategory.toLowerCase() === 'fabrics structure' || 
      urlCategory.toLowerCase() === 'fabrics finish'
    );
  };

  // FIXED: Enhanced image URL handler with null/undefined check
  const getImageUrl = (imageSrc) => {
    // If imageSrc is null, undefined, or not a string, return placeholder
    if (!imageSrc || typeof imageSrc !== 'string') {
      return 'https://via.placeholder.com/400x400/4A5568/FFFFFF?text=Product+Image';
    }

    // If it's base64 image (from localStorage)
    if (imageSrc.startsWith('data:image/')) {
      return imageSrc;
    }

    // If it's a full URL (placeholder or external)
    if (imageSrc.startsWith('http')) {
      return imageSrc;
    }

    // If it's a relative path from backend
    if (imageSrc.startsWith('/uploads/')) {
      return `http://localhost:5000${imageSrc}`;
    }

    // If it's just a filename (from backend)
    if (imageSrc.includes('product-') && imageSrc.includes('.') && !imageSrc.startsWith('/')) {
      return `http://localhost:5000/uploads/${imageSrc}`;
    }

    // Default fallback
    return 'https://via.placeholder.com/400x400/4A5568/FFFFFF?text=Product+Image';
  };

  // Enhanced image error handler
  const handleImageError = (e, productName) => {
    console.error(`❌ Image failed to load for ${productName}:`, e.target.src);
    e.target.src = 'https://via.placeholder.com/400x400/4A5568/FFFFFF?text=Image+Not+Found';
    e.target.onerror = null;
    e.target.className = e.target.className + ' bg-gray-200';
  };

  // PERFECT MATCH FILTERING LOGIC - Header URLs to Product Data
  const filterProducts = (products) => {
    let filtered = products;

    // If no category parameters, return all products
    if (!urlCategory && !searchTerm) {
      return filtered;
    }

    // Enhanced filtering logic for PERFECT URL matching
    if (urlCategory) {
      filtered = filtered.filter(product => {
        const productMainCategory = product.mainCategory?.toLowerCase() || product.category?.toLowerCase();
        const productSubCategory = product.subCategory?.toLowerCase();
        const productNestedCategory = product.nestedCategory?.toLowerCase();
        
        const urlCategoryLower = urlCategory.toLowerCase();
        const urlSubCategoryLower = urlSubCategory?.toLowerCase();
        const urlTypeLower = urlType?.toLowerCase();
        const urlFabricTypeLower = urlFabricType?.toLowerCase();
        const urlNestedCategoryLower = urlNestedCategory?.toLowerCase();

        // Main category must match
        if (productMainCategory !== urlCategoryLower) {
          return false;
        }

        // FABRICS STRUCTURE: /products?category=fabrics structure&subCategory=plain weaves
        if (urlCategoryLower === 'fabrics structure') {
          if (urlSubCategoryLower) {
            return productSubCategory === urlSubCategoryLower;
          }
          return true; // Show all fabrics structure if no subcategory
        }

        // WOVEN FABRICS: Complex matching for process types and fabric types
        if (urlCategoryLower === 'woven fabrics') {
          // Case 1: Direct fabric type - /products?category=woven fabrics&subCategory=cotton
          if (urlSubCategoryLower && !urlTypeLower) {
            return productSubCategory === urlSubCategoryLower;
          }
          
          // Case 2: Process type with fabric type - /products?category=woven fabrics&type=greige&fabricType=cotton
          if (urlTypeLower && urlFabricTypeLower) {
            return productSubCategory === urlTypeLower && productNestedCategory === urlFabricTypeLower;
          }
          
          // Case 3: Process type only - /products?category=woven fabrics&type=greige
          if (urlTypeLower && !urlFabricTypeLower) {
            return productSubCategory === urlTypeLower;
          }
          
          return true; // Show all woven fabrics if no specific filters
        }

        // FABRICS FINISH: /products?category=fabrics finish&subCategory=printed&nestedCategory=digital printing
        if (urlCategoryLower === 'fabrics finish') {
          if (urlSubCategoryLower && urlNestedCategoryLower) {
            return productSubCategory === urlSubCategoryLower && productNestedCategory === urlNestedCategoryLower;
          }
          if (urlSubCategoryLower && !urlNestedCategoryLower) {
            return productSubCategory === urlSubCategoryLower;
          }
          return true; // Show all fabrics finish if no subcategory
        }

        return true; // Default case
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          product.category?.toLowerCase().includes(searchTerm) ||
          product.subCategory?.toLowerCase().includes(searchTerm) ||
          product.mainCategory?.toLowerCase().includes(searchTerm) ||
          product.nestedCategory?.toLowerCase().includes(searchTerm) ||
          product.specifications?.composition?.toLowerCase().includes(searchTerm) ||
          product.specifications?.weave?.toLowerCase().includes(searchTerm)
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

    return filtered;
  };

  // Combine static products and admin products with PERFECT filtering
  useEffect(() => {
    // Get admin products from localStorage
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    
    // Combine both product sources
    const allAvailableProducts = [...allProducts, ...adminProducts];

    const filtered = filterProducts(allAvailableProducts);

    console.log('🔍 Filtering Results:', {
      urlCategory,
      urlSubCategory,
      urlType,
      urlFabricType,
      urlNestedCategory,
      totalProducts: allAvailableProducts.length,
      filteredCount: filtered.length,
      filteredProducts: filtered.map(p => ({
        name: p.name,
        mainCategory: p.mainCategory,
        subCategory: p.subCategory,
        nestedCategory: p.nestedCategory
      }))
    });

    setFilteredProducts(filtered);

    // GSAP animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [urlCategory, urlSubCategory, urlType, urlFabricType, urlNestedCategory, searchTerm]);

  // Image Zoom Functions
  const handleImageMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
    
    if (zoomRef.current) {
      zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const clearFilters = () => {
    window.location.href = '/products';
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
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
    setIsZoomed(false);
    document.body.style.overflow = "auto";
  };

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

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (urlCategory) {
      const categoryMap = {
        'fabrics structure': 'Fabrics Structure',
        'woven fabrics': 'Woven Fabrics',
        'fabrics finish': 'Fabrics Finish'
      };
      
      return categoryMap[urlCategory.toLowerCase()] || urlCategory.split(/[_\s]+/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return "All Products";
  };

  // Get current subcategory name for display
  const getCurrentSubCategoryName = () => {
    if (urlSubCategory) {
      const subCategoryMap = {
        'plain weaves': 'Plain Weaves',
        'twill weaves': 'Twill Weaves',
        'satin weave': 'Satin Weave',
        'drill weaves': 'Drill Weaves',
        'dobby weave': 'Dobby Weave',
        'jacquard weave': 'Jacquard Weave',
        'oxford weave': 'Oxford Weave',
        'silk': 'Silk',
        'cotton': 'Cotton',
        'viscose': 'Viscose',
        'modal': 'Modal',
        'linen': 'Linen',
        'bamboo': 'Bamboo',
        'banana': 'Banana',
        'hemp': 'Hemp',
        'cotton linen blend': 'Cotton Linen Blend',
        'greige': 'Greige',
        'rfd': 'RFD',
        'solid': 'Solid',
        'printed': 'Printed'
      };
      
      return subCategoryMap[urlSubCategory.toLowerCase()] || urlSubCategory.split(/[_\s]+/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    
    return null;
  };

  // Get current type name for display (for woven fabrics)
  const getCurrentTypeName = () => {
    if (urlType) {
      const typeMap = {
        'greige': 'Greige',
        'rfd': 'RFD',
        'solid': 'Solid',
        'printed': 'Printed'
      };
      
      return typeMap[urlType.toLowerCase()] || urlType.charAt(0).toUpperCase() + urlType.slice(1);
    }
    return null;
  };

  // Get current fabric type name for display
  const getCurrentFabricTypeName = () => {
    if (urlFabricType) {
      const fabricTypeMap = {
        'silk': 'Silk',
        'cotton': 'Cotton',
        'viscose': 'Viscose',
        'modal': 'Modal',
        'linen': 'Linen',
        'bamboo': 'Bamboo',
        'banana': 'Banana',
        'hemp': 'Hemp',
        'cotton linen blend': 'Cotton Linen Blend'
      };
      
      return fabricTypeMap[urlFabricType.toLowerCase()] || urlFabricType.charAt(0).toUpperCase() + urlFabricType.slice(1);
    }
    return null;
  };

  // Get current nested category name for display (for fabrics finish)
  const getCurrentNestedCategoryName = () => {
    if (urlNestedCategory) {
      const nestedCategoryMap = {
        'table printing': 'Table Printing',
        'rotary': 'Rotary',
        'digital printing': 'Digital Printing'
      };
      
      return nestedCategoryMap[urlNestedCategory.toLowerCase()] || urlNestedCategory.charAt(0).toUpperCase() + urlNestedCategory.slice(1);
    }
    return null;
  };

  // Helper function to get product specifications
  const getProductSpecs = (product) => {
    if (product.specifications) {
      return product.specifications;
    }
    
    return {
      category: product.category,
      composition: product.composition,
      gsm: product.gsm,
      width: product.width,
      count: product.count,
      weave: product.weave,
      finish: product.finish
    };
  };

  // Render price - show "Contact for Price" if price is 0
  const renderPrice = (product) => {
    const price = product.price;
    
    return (
      <p className="text-black font-bold mb-3 text-xl">
        {!price || price === 0 || price === '0' ? (
          <span className="text-black text-lg">Price on Request</span>
        ) : (
          `₹${typeof price === 'number' ? price.toLocaleString() : price}`
        )}
      </p>
    );
  };

  // Render specifications
  const renderSpecifications = (product, productId) => {
    const specs = getProductSpecs(product);
    
    if (!specs || Object.keys(specs).length === 0) return null;

    const isExpanded = expandedSpecs[productId];
    const isVerticalLayout = needsVerticalLayout();
    
    return (
      <div className={`mt-3 border-t border-gray-300 pt-3 ${isVerticalLayout ? 'border-0 pt-0' : ''}`}>
        {!isVerticalLayout ? (
          // Original collapsible specs for other categories
          <>
            <button
              onClick={() => toggleSpecs(productId)}
              className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-700 hover:text-black transition-colors"
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
                    <span className="text-gray-600">Category:</span>
                    <span className="text-black font-medium">{specs.category}</span>
                  </div>
                )}
                {specs.subCategory && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub Category:</span>
                    <span className="text-black font-medium">{specs.subCategory}</span>
                  </div>
                )}
                {specs.count && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Count:</span>
                    <span className="text-black font-medium">{specs.count}</span>
                  </div>
                )}
                {specs.weave && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weave:</span>
                    <span className="text-black font-medium">{specs.weave}</span>
                  </div>
                )}
                {specs.gsm && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">GSM:</span>
                    <span className="text-black font-medium">{specs.gsm}</span>
                  </div>
                )}
                {specs.width && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Width:</span>
                    <span className="text-black font-medium">{specs.width}</span>
                  </div>
                )}
                {specs.composition && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Composition:</span>
                    <span className="text-black font-medium text-right">{specs.composition}</span>
                  </div>
                )}
                {specs.finish && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Finish:</span>
                    <span className="text-black font-medium">{specs.finish}</span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          // Expanded specs always visible for vertical layout categories
          <div className="space-y-3 animate-fadeIn">
            <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-400 pb-1">
              📋 Product Specifications
            </h4>
            
            <div className="grid grid-cols-1 gap-2 text-sm">
              {specs.weave && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Weave Type:</span>
                  <span className="text-black font-semibold">{specs.weave}</span>
                </div>
              )}
              {specs.count && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Thread Count:</span>
                  <span className="text-black font-semibold">{specs.count}</span>
                </div>
              )}
              {specs.gsm && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">GSM:</span>
                  <span className="text-black font-semibold">{specs.gsm}</span>
                </div>
              )}
              {specs.width && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Width:</span>
                  <span className="text-black font-semibold">{specs.width}</span>
                </div>
              )}
              {specs.composition && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Composition:</span>
                  <span className="text-black font-semibold text-right">{specs.composition}</span>
                </div>
              )}
              {specs.finish && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Finish:</span>
                  <span className="text-black font-semibold">{specs.finish}</span>
                </div>
              )}
              {specs.category && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Category:</span>
                  <span className="text-black font-semibold">{specs.category}</span>
                </div>
              )}
              {specs.subCategory && (
                <div className="flex justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-gray-700 font-medium">Sub Category:</span>
                  <span className="text-black font-semibold">{specs.subCategory}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCategoryBadges = (product) => {
    const mainCategory = product.mainCategory || product.category;
    const subCategory = product.subCategory;
    const nestedCategory = product.nestedCategory;

    return (
      <div className="flex flex-col gap-2 mt-1">
        {mainCategory && (
          <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded capitalize border border-gray-300 shadow-lg">
            {mainCategory.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        )}
        {subCategory && (
          <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded capitalize border border-gray-300 shadow-lg">
            {subCategory}
          </span>
        )}
        {nestedCategory && (
          <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded capitalize border border-gray-300 shadow-lg">
            {nestedCategory}
          </span>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Active Filters */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">
            {getCurrentCategoryName()}
          </h1>
          
          {getCurrentSubCategoryName() && (
            <p className="text-lg text-gray-700 font-semibold mb-2">
              {getCurrentSubCategoryName()}
            </p>
          )}
          
          {getCurrentTypeName() && (
            <p className="text-md text-gray-600 mb-1">
              Type: {getCurrentTypeName()}
            </p>
          )}
          
          {getCurrentFabricTypeName() && (
            <p className="text-md text-gray-600">
              Fabric: {getCurrentFabricTypeName()}
            </p>
          )}

          {getCurrentNestedCategoryName() && (
            <p className="text-md text-gray-600">
              Finish: {getCurrentNestedCategoryName()}
            </p>
          )}
          
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto mt-4">
            {searchTerm 
              ? `Search results for "${searchTerm}"`
              : "Explore our exclusive range of high-quality textile products"
            }
          </p>

          {/* Active Filters Display */}
          {(urlCategory || urlSubCategory || urlType || urlFabricType || urlNestedCategory || searchTerm) && (
            <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {urlCategory && (
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full flex items-center gap-1 border border-gray-700">
                  {getCurrentCategoryName()}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlSubCategory) params.append('subCategory', urlSubCategory);
                      if (urlType) params.append('type', urlType);
                      if (urlFabricType) params.append('fabricType', urlFabricType);
                      if (urlNestedCategory) params.append('nestedCategory', urlNestedCategory);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {urlSubCategory && (
                <span className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full flex items-center gap-1 border border-gray-500">
                  {getCurrentSubCategoryName()}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlCategory) params.append('category', urlCategory);
                      if (urlType) params.append('type', urlType);
                      if (urlFabricType) params.append('fabricType', urlFabricType);
                      if (urlNestedCategory) params.append('nestedCategory', urlNestedCategory);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {urlType && (
                <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full flex items-center gap-1 border border-gray-600">
                  {getCurrentTypeName()}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlCategory) params.append('category', urlCategory);
                      if (urlSubCategory) params.append('subCategory', urlSubCategory);
                      if (urlFabricType) params.append('fabricType', urlFabricType);
                      if (urlNestedCategory) params.append('nestedCategory', urlNestedCategory);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {urlFabricType && (
                <span className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full flex items-center gap-1 border border-gray-400">
                  {getCurrentFabricTypeName()}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlCategory) params.append('category', urlCategory);
                      if (urlSubCategory) params.append('subCategory', urlSubCategory);
                      if (urlType) params.append('type', urlType);
                      if (urlNestedCategory) params.append('nestedCategory', urlNestedCategory);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}

              {urlNestedCategory && (
                <span className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full flex items-center gap-1 border border-gray-400">
                  {getCurrentNestedCategoryName()}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlCategory) params.append('category', urlCategory);
                      if (urlSubCategory) params.append('subCategory', urlSubCategory);
                      if (urlType) params.append('type', urlType);
                      if (urlFabricType) params.append('fabricType', urlFabricType);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full flex items-center gap-1 border border-gray-600">
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (urlCategory) params.append('category', urlCategory);
                      if (urlSubCategory) params.append('subCategory', urlSubCategory);
                      if (urlType) params.append('type', urlType);
                      if (urlFabricType) params.append('fabricType', urlFabricType);
                      if (urlNestedCategory) params.append('nestedCategory', urlNestedCategory);
                      window.location.href = `/products?${params.toString()}`;
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {(urlCategory || urlSubCategory || urlType || urlFabricType || urlNestedCategory || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors border border-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          needsVerticalLayout() ? (
            // Vertical layout for specific categories - ONE BY ONE VERTICAL
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-300"
                  >
                    <div className="flex flex-col xl:flex-row">
                      {/* Image Section - Left Side */}
                      <div 
                        className="xl:w-2/5 h-80 xl:h-auto overflow-hidden cursor-pointer relative bg-gray-100 flex items-center justify-center"
                        onClick={() => openImageModal(product)}
                      >
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500"
                          onError={(e) => handleImageError(e, product.name)}
                          loading="lazy"
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs px-3 py-2 rounded-lg">
                          🔍 Click to Zoom
                        </div>
                      </div>
                      
                      {/* Content Section - Right Side */}
                      <div className="xl:w-3/5 p-8">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <h3 className="font-bold text-black mb-3 text-2xl xl:text-3xl">
                              {product.name}
                            </h3>
                            
                            {/* Price - Show "Contact for Price" if 0 */}
                            {renderPrice(product)}
                            
                            {/* Category Badges */}
                            <div className="mb-4">
                              {renderCategoryBadges(product)}
                            </div>
                            
                            <p className="text-base text-gray-700 mb-6 leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Product Specifications - Always expanded for vertical layout */}
                            {renderSpecifications(product, product.id)}
                          </div>
                          
                          <div className="mt-6">
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-700"
                            >
                              {!product.price || product.price === 0 || product.price === '0' 
                                ? 'Contact for Price' 
                                : 'Add to Cart'
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Original grid layout for other categories
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300"
                >
                  {/* Image Section */}
                  <div 
                    className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer relative bg-gray-100 flex items-center justify-center"
                    onClick={() => openImageModal(product)}
                  >
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                      onError={(e) => handleImageError(e, product.name)}
                      loading="lazy"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      🔍 Click to Zoom
                    </div>
                  </div>
                  
                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-black mb-2 text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Price - Show "Contact for Price" if 0 */}
                    {renderPrice(product)}
                    
                    {/* Category Badges */}
                    {renderCategoryBadges(product)}
                    
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                    
                    {/* Product Specifications */}
                    {renderSpecifications(product, product.id)}
                    
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg mt-3 border border-gray-700"
                    >
                      {!product.price || product.price === 0 || product.price === '0' 
                        ? 'Contact for Price' 
                        : 'Add to Cart'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-300">
            <div className="max-w-md mx-auto">
              <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">
                No products found
              </h2>
              <p className="text-gray-600 text-base mb-8">
                {searchTerm 
                  ? `No products found for "${searchTerm}". Try different keywords.`
                  : urlCategory
                  ? `No products available in ${getCurrentCategoryName()}${getCurrentSubCategoryName() ? ` - ${getCurrentSubCategoryName()}` : ''}${getCurrentTypeName() ? ` - ${getCurrentTypeName()}` : ''}${getCurrentFabricTypeName() ? ` - ${getCurrentFabricTypeName()}` : ''}${getCurrentNestedCategoryName() ? ` - ${getCurrentNestedCategoryName()}` : ''}.`
                  : "No products available at the moment."
                }
              </p>
              {(searchTerm || urlCategory || urlSubCategory || urlType || urlFabricType || urlNestedCategory) && (
                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-base shadow-md hover:shadow-lg border border-gray-700"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal with Zoom */}
      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          <div className="relative max-w-6xl max-h-full w-full bg-white rounded-xl overflow-hidden border border-gray-300">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black z-10 bg-white rounded-full p-2 shadow-lg border border-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Zoom Toggle Button */}
            <button
              onClick={toggleZoom}
              className="absolute top-4 left-4 text-gray-600 hover:text-black z-10 bg-white rounded-full p-2 shadow-lg border border-gray-300"
            >
              {isZoomed ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0l-3-3m3 3l3-3" />
                </svg>
              )}
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-100 relative min-h-[500px]">
                {isZoomed ? (
                  <div 
                    ref={zoomRef}
                    className="w-full h-full bg-cover bg-no-repeat cursor-crosshair"
                    style={{
                      backgroundImage: `url(${getImageUrl(selectedImage.image)})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%'
                    }}
                    onMouseMove={handleImageMouseMove}
                    onMouseLeave={() => setZoomPosition({ x: 50, y: 50 })}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={getImageUrl(selectedImage.image)}
                      alt={selectedImage.name}
                      className="max-w-full max-h-full object-contain rounded-lg cursor-zoom-in"
                      onClick={toggleZoom}
                      onError={(e) => handleImageError(e, selectedImage.name)}
                      loading="lazy"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}
                
                {/* Zoom Instructions */}
                {isZoomed && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-xs px-3 py-2 rounded">
                    🖱️ Move mouse to zoom • Click to exit zoom
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-6 bg-white overflow-y-auto">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {selectedImage.name}
                </h3>
                
                {/* Price in Modal - Show "Contact for Price" if 0 */}
                <p className="text-xl font-semibold text-black mb-4">
                  {!selectedImage.price || selectedImage.price === 0 || selectedImage.price === '0' ? (
                    <span className="text-red-600 text-lg">Contact for Price</span>
                  ) : (
                    `₹${typeof selectedImage.price === 'number' ? selectedImage.price.toLocaleString() : selectedImage.price}`
                  )}
                </p>

                {/* Specifications in Modal */}
                {(() => {
                  const specs = getProductSpecs(selectedImage);
                  if (specs && Object.keys(specs).length > 0) {
                    return (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-black mb-3 border-b border-gray-600 pb-2">
                          📋 Specifications
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          {Object.entries(specs).map(([key, value]) => (
                            value && (
                              <div key={key} className="flex justify-between border-b border-gray-300 pb-2 last:border-b-0">
                                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span className="text-black font-medium text-right">{value}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                <button 
                  onClick={() => {
                    handleAddToCart(selectedImage);
                    closeImageModal();
                  }}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-700"
                >
                  {!selectedImage.price || selectedImage.price === 0 || selectedImage.price === '0' 
                    ? 'Contact for Price' 
                    : `Add to Cart - ₹${typeof selectedImage.price === 'number' ? selectedImage.price.toLocaleString() : selectedImage.price}`
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;