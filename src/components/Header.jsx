// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Menu, X, Search, ChevronDown, Settings, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0);

  // Synchronized Navigation structure - UPDATED WITH GFARMENT
  const navItems = [
    { path: "/", label: "Home", key: "home" },
    { path: "/gfarment", label: "Gfarment Manufacturing", key: "gfarment" }, // ✅ ADDED HERE
    { 
      path: "/products?category=fabrics%20structure",
      label: "Fabrics Structure",
      key: "fabrics-main",
      subItems: [
        { path: "/products?category=fabrics%20structure&subCategory=plain%20weaves", label: "Plain Weave", key: "plain-weaves" },
        { path: "/products?category=fabrics%20structure&subCategory=twill%20weaves", label: "Twill Weave", key: "twill-weaves" },
        { path: "/products?category=fabrics%20structure&subCategory=satin%20weave", label: "Satin Weave", key: "satin-weave" },
        { path: "/products?category=fabrics%20structure&subCategory=drill%20weaves", label: "Drill Weave", key: "drill-weaves" },
        { path: "/products?category=fabrics%20structure&subCategory=dobby%20weave", label: "Dobby Weave", key: "dobby-weave" },
        { path: "/products?category=fabrics%20structure&subCategory=jacquard%20weave", label: "Jacquard Weave", key: "jacquard-weave" },
        { path: "/products?category=fabrics%20structure&subCategory=oxford%20weave", label: "Oxford Weave", key: "oxford-weave" }
      ]
    },
    { 
      path: "/products?category=woven%20fabrics",
      label: "Woven Fabrics",
      key: "woven-fabrics",
      subItems: [
        // Process types with nested fabric types
        { 
          path: "/products?category=woven%20fabrics&type=greige",
          label: "Greige",
          key: "greige",
          subItems: [
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=silk", label: "Silk", key: "greige-silk" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=cotton", label: "Cotton", key: "greige-cotton" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=viscose", label: "Viscose", key: "greige-viscose" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=modal", label: "Modal", key: "greige-modal" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=linen", label: "Linen", key: "greige-linen" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=bamboo", label: "Bamboo", key: "greige-bamboo" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=banana", label: "Banana", key: "greige-banana" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=hemp", label: "Hemp", key: "greige-hemp" },
            { path: "/products?category=woven%20fabrics&type=greige&fabricType=cotton%20linen%20blend", label: "Cotton Linen Blend", key: "greige-cotton-linen" },
          ]
        },
        { 
          path: "/products?category=woven%20fabrics&type=rfd",
          label: "RFD",
          key: "rfd",
          subItems: [
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=silk", label: "Silk", key: "rfd-silk" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=cotton", label: "Cotton", key: "rfd-cotton" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=viscose", label: "Viscose", key: "rfd-viscose" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=modal", label: "Modal", key: "rfd-modal" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=linen", label: "Linen", key: "rfd-linen" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=bamboo", label: "Bamboo", key: "rfd-bamboo" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=banana", label: "Banana", key: "rfd-banana" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=hemp", label: "Hemp", key: "rfd-hemp" },
            { path: "/products?category=woven%20fabrics&type=rfd&fabricType=cotton%20linen%20blend", label: "Cotton Linen Blend", key: "rfd-cotton-linen" },
          ]
        },
        { 
          path: "/products?category=woven%20fabrics&type=solid",
          label: "Solid",
          key: "solid",
          subItems: [
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=silk", label: "Silk", key: "solid-silk" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=cotton", label: "Cotton", key: "solid-cotton" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=viscose", label: "Viscose", key: "solid-viscose" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=modal", label: "Modal", key: "solid-modal" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=linen", label: "Linen", key: "solid-linen" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=bamboo", label: "Bamboo", key: "solid-bamboo" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=banana", label: "Banana", key: "solid-banana" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=hemp", label: "Hemp", key: "solid-hemp" },
            { path: "/products?category=woven%20fabrics&type=solid&fabricType=cotton%20linen%20blend", label: "Cotton Linen Blend", key: "solid-cotton-linen" },
          ]
        },
        { 
          path: "/products?category=woven%20fabrics&type=printed",
          label: "Printed",
          key: "printed",
          subItems: [
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=silk", label: "Silk", key: "printed-silk" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=cotton", label: "Cotton", key: "printed-cotton" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=viscose", label: "Viscose", key: "printed-viscose" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=modal", label: "Modal", key: "printed-modal" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=linen", label: "Linen", key: "printed-linen" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=bamboo", label: "Bamboo", key: "printed-bamboo" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=banana", label: "Banana", key: "printed-banana" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=hemp", label: "Hemp", key: "printed-hemp" },
            { path: "/products?category=woven%20fabrics&type=printed&fabricType=cotton%20linen%20blend", label: "Cotton Linen Blend", key: "printed-cotton-linen" },
          ]
        }
      ]
    },
    { 
      path: "/products?category=fabrics%20finish",
      label: "Fabrics Finish",
      key: "fabrics-finish",
      subItems: [
        { path: "/products?category=fabrics%20finish&subCategory=greige", label: "Greige", key: "greige-finish" },
        { path: "/products?category=fabrics%20finish&subCategory=rfd", label: "RFD", key: "rfd-finish" },
        { path: "/products?category=fabrics%20finish&subCategory=solid", label: "Solid", key: "solid-finish" },
        { 
          path: "/products?category=fabrics%20finish&subCategory=printed", 
          label: "Printed", 
          key: "printed-finish",
          subItems: [
            { path: "/products?category=fabrics%20finish&subCategory=table%20printing", label: "Table Printing", key: "table-printing" },
            { path: "/products?category=fabrics%20finish&subCategory=rotary", label: "Rotary", key: "rotary-printed" },
            { path: "/products?category=fabrics%20finish&subCategory=digital%20printing", label: "Digital Printing", key: "digital-printing" },
          ]
        }
      ]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  // Check if current path is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    
    const basePath = path.split('?')[0];
    const currentBasePath = location.pathname;
    
    return currentBasePath === basePath || currentBasePath.startsWith(basePath + '/');
  };

  // Handle dropdown hover
  const handleDropdownEnter = (itemLabel) => {
    setActiveDropdown(itemLabel);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Toggle expand/collapse for mobile
  const toggleExpand = (key) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  // Enhanced dropdown for Woven Fabrics and Fabrics Finish with nested categories
  const renderDropdown = (subItems, parentPath, isNestedCategory = false) => {
    const isWovenFabrics = parentPath.includes('woven%20fabrics');
    const isFabricsFinish = parentPath.includes('fabrics%20finish');
    
    return (
      <div className={`absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-200 z-50 py-2 ${
        isWovenFabrics ? 'w-80 max-h-96 overflow-y-auto' : 'w-64'
      }`}>
        {/* Parent category link */}
        {parentPath && (
          <Link
            to={parentPath}
            className="block px-4 py-3 font-semibold text-black hover:bg-gray-50 border-b border-gray-200 bg-gray-100 transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            View All {parentPath.includes('category=')}
          </Link>
        )}
        
        {subItems.map((subItem) => (
          <div key={subItem.key} className="relative">
            {subItem.subItems && (isWovenFabrics || isFabricsFinish) ? (
              // Nested menu - Woven Fabrics & Fabrics Finish Printed
              <div className="border-b border-gray-100 last:border-b-0">
                {/* Clickable parent item (Greige, RFD, Printed, etc.) */}
                <div className="flex items-center justify-between px-4 py-3 font-semibold text-gray-900 text-sm bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors group">
                  <Link
                    to={subItem.path}
                    className="flex-1"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {subItem.label}
                  </Link>
                  <ChevronRight size={14} className="text-gray-500 group-hover:rotate-90 transition-transform" />
                </div>
                {/* Nested items - Fabric types or Printing types */}
                <div className="py-1">
                  {subItem.subItems.map((nestedItem) => (
                    <Link
                      key={nestedItem.key}
                      to={nestedItem.path}
                      className="block px-6 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors flex items-center"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      {nestedItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Direct link - normal categories
              <Link
                to={subItem.path}
                className="block px-4 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => setActiveDropdown(null)}
              >
                {subItem.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Mobile-optimized navigation renderer
  const renderMobileNavItem = (item, level = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.has(item.key);
    const isNested = level > 0;
    const isWovenFabrics = item.key === 'woven-fabrics';
    const isFabricsFinish = item.key === 'fabrics-finish';

    return (
      <div key={item.key} className={`${isNested ? 'ml-3' : ''}`}>
        <div className={`flex items-center justify-between p-3 transition-all duration-300 border border-gray-200 rounded-lg ${
          isActive(item.path)
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-gray-50"
        } ${(isWovenFabrics || isFabricsFinish) ? 'bg-blue-50 border-blue-200' : ''}`}>
          <Link
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex-1"
          >
            {item.label}
          </Link>
          
          {hasSubItems && (
            <button
              onClick={() => toggleExpand(item.key)}
              className="p-1 hover:bg-gray-200 rounded transition-colors ml-2"
            >
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          )}
        </div>

        {/* Expandable subitems */}
        {hasSubItems && isExpanded && (
          <div className="mt-1 ml-3 space-y-1">
            {/* View All link for main categories */}
            {!isNested && (
              <Link
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
              >
                View All {item.label}
              </Link>
            )}
            
            {/* Subitems with scroll for Woven Fabrics */}
            <div className={`${(isWovenFabrics || isFabricsFinish) ? 'max-h-60 overflow-y-auto' : ''}`}>
              {item.subItems.map((subItem) => (
                <div key={subItem.key}>
                  {subItem.subItems ? (
                    // Nested submenu with expand/collapse
                    <div className="mt-1">
                      <div className={`flex items-center justify-between p-2 transition-all duration-300 border border-gray-200 rounded-lg ${
                        isActive(subItem.path)
                          ? "bg-gray-800 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}>
                        <Link
                          to={subItem.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-sm font-medium"
                        >
                          {subItem.label}
                        </Link>
                        
                        <button
                          onClick={() => toggleExpand(subItem.key)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors ml-2"
                        >
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-300 ${expandedItems.has(subItem.key) ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </div>

                      {/* Nested subitems */}
                      {expandedItems.has(subItem.key) && (
                        <div className="ml-3 mt-1 space-y-1">
                          {subItem.subItems.map((nestedItem) => (
                            <Link
                              key={nestedItem.key}
                              to={nestedItem.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200 rounded transition-colors flex items-center"
                            >
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              {nestedItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Direct subitem link
                    <Link
                      to={subItem.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200 rounded transition-colors flex items-center"
                    >
                      {!isNested && <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>}
                      {subItem.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          <img 
            src="/sssventures.jpg" 
            alt="SSS Ventures Logo"
            className="w-10 h-10 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300 border border-gray-200"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 hidden"
          >
            <span className="text-white font-bold text-lg">S</span>
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-gray-900">SSS Ventures</h1>
            <p className="text-xs text-gray-600">Textile Solutions</p>
          </div>
        </Link>

        {/* Desktop Navigation (Laptop/Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div 
              key={item.key} 
              className="relative group"
              onMouseEnter={() => handleDropdownEnter(item.label)}
              onMouseLeave={handleDropdownLeave}
            >
              {item.subItems ? (
                // Dropdown items
                <div className="relative">
                  <Link
                    to={item.path}
                    className="flex items-center space-x-1 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-gray-600 hover:text-black hover:bg-gray-50 group"
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* FIXED: Woven Fabrics & Fabrics Finish have enhanced nested dropdown */}
                  {activeDropdown === item.label && (
                    renderDropdown(
                      item.subItems, 
                      item.path, 
                      item.key === 'woven-fabrics' || item.key === 'fabrics-finish'
                    )
                  )}
                </div>
              ) : (
                // Regular link - INCLUDES GFARMENT MANUFACTURING
                <Link
                  to={item.path}
                  className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 relative ${
                    isActive(item.path)
                      ? "text-black bg-gray-100"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-black rounded-full"></div>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Search & Cart & Admin (Tablet/Laptop) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all duration-300"
          >
            <input
              type="text"
              placeholder="Search fabrics..."
              className="px-2 py-1 text-sm w-48 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="text-gray-500 hover:text-black transition-colors duration-300"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Admin Button */}
          <Link
            to="/admin"
            className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 group ${
              location.pathname === "/admin" 
                ? "bg-blue-100 text-blue-600 shadow-md" 
                : "bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md"
            }`}
            title="Admin login"
          >
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 text-gray-600 hover:text-black transition-all duration-300 bg-white rounded-full shadow-sm hover:shadow-md group"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-bounce shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button (Mobile Only) */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Cart Button - Mobile */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-black transition-colors"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 text-gray-600 hover:text-black transition-transform duration-300 bg-white rounded-full shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION (Mobile Only) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-300 shadow-xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-3">
          {/* Mobile Search - Compact */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black transition-all duration-300"
          >
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search fabrics..."
              className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Navigation Links - INCLUDES GFARMENT MANUFACTURING */}
          <div className="space-y-2">
            {navItems.map((item) => renderMobileNavItem(item))}

            {/* Admin Link - Mobile */}
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 font-semibold transition-all duration-300 ${
                  location.pathname === "/admin"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Settings size={16} />
                  <span className="text-sm">Admin Panel</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;