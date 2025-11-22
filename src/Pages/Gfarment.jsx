// src/pages/Gfarment.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Gfarment = () => {
  const [activeCategory, setActiveCategory] = useState('men');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  // Product data with unique IDs
  const categories = {
    men: {
      title: "Men's Wear",
      subtitle: "Shirts, T-shirts, Custom Tailoring",
      items: [
        { 
          id: 'men-shirt-1',
          name: "Formal Shirts", 
          price: 1299, 
          image: "👔",
          description: "Premium cotton formal shirts with perfect fit",
          features: ["100% Cotton", "Wrinkle-free", "Custom Sizing"]
        },
        { 
          id: 'men-tshirt-1',
          name: "Casual T-shirts", 
          price: 599, 
          image: "👕",
          description: "Comfortable casual t-shirts for everyday wear",
          features: ["Soft Fabric", "Multiple Colors", "Breathable"]
        },
        { 
          id: 'men-suit-1',
          name: "Custom Tailored Suits", 
          price: 4999, 
          image: "🥼",
          description: "Bespoke suits tailored to your measurements",
          features: ["Premium Wool", "Perfect Fit", "Elegant Finish"]
        },
        { 
          id: 'men-jeans-1',
          name: "Denim Jeans", 
          price: 1199, 
          image: "👖",
          description: "Stylish denim jeans with modern cuts",
          features: ["Stretch Denim", "Multiple Fits", "Durable"]
        }
      ],
      description: "Premium quality men's clothing with perfect fit and custom tailoring options"
    },
    women: {
      title: "Women's Wear",
      subtitle: "Kurtis, Traditional Wear, Long Dresses",
      items: [
        { 
          id: 'women-kurti-1',
          name: "Designer Kurtis", 
          price: 1599, 
          image: "👗",
          description: "Elegant designer kurtis with intricate work",
          features: ["Embroidered", "Soft Fabric", "Traditional Patterns"]
        },
        { 
          id: 'women-saree-1',
          name: "Traditional Sarees", 
          price: 2999, 
          image: "🥻",
          description: "Beautiful traditional sarees for special occasions",
          features: ["Silk Blend", "Zari Work", "Premium Border"]
        },
        { 
          id: 'women-dress-1',
          name: "Long Evening Dresses", 
          price: 3499, 
          image: "💃",
          description: "Stunning evening dresses for formal events",
          features: ["Flow Fabric", "Elegant Design", "Perfect Drape"]
        },
        { 
          id: 'women-top-1',
          name: "Casual Tops", 
          price: 899, 
          image: "🎽",
          description: "Comfortable casual tops for daily wear",
          features: ["Cotton Blend", "Multiple Styles", "Easy Care"]
        }
      ],
      description: "Elegant and comfortable women's fashion with custom measurements and latest trends"
    },
    kids: {
      title: "Kids Wear",
      subtitle: "Newborn Sets, Kids Tops & Bottom Wear",
      items: [
        { 
          id: 'kids-newborn-1',
          name: "Newborn Gift Sets", 
          price: 799, 
          image: "👶",
          description: "Adorable clothing sets for newborns",
          features: ["Soft Cotton", "Skin-friendly", "Gift Ready"]
        },
        { 
          id: 'kids-top-1',
          name: "Kids Tops", 
          price: 499, 
          image: "👚",
          description: "Colorful and comfortable tops for kids",
          features: ["Fun Prints", "Easy Wear", "Durable"]
        },
        { 
          id: 'kids-bottom-1',
          name: "Bottom Wear", 
          price: 599, 
          image: "🩳",
          description: "Comfortable pants and shorts for active kids",
          features: ["Stretchable", "Multiple Sizes", "Play-friendly"]
        },
        { 
          id: 'kids-outfit-1',
          name: "Complete Outfits", 
          price: 1199, 
          image: "👦",
          description: "Complete coordinated outfits for special occasions",
          features: ["Matching Sets", "Premium Quality", "Special Occasion"]
        }
      ],
      description: "Adorable, comfortable and safe clothing for your little ones with premium fabrics"
    },
    home: {
      title: "Home & Lifestyle",
      subtitle: "Home Textiles, Bags & Accessories",
      items: [
        { 
          id: 'home-bedlinen-1',
          name: "Bed Linens", 
          price: 2499, 
          image: "🛏️",
          description: "Luxurious bed linens for comfortable sleep",
          features: ["Premium Cotton", "Soft Finish", "Multiple Sizes"]
        },
        { 
          id: 'home-curtain-1',
          name: "Curtains", 
          price: 1799, 
          image: "🪟",
          description: "Elegant curtains to enhance your home decor",
          features: ["Light Control", "Durable Fabric", "Modern Designs"]
        },
        { 
          id: 'home-bag-1',
          name: "Designer Bags", 
          price: 1299, 
          image: "👜",
          description: "Stylish bags for everyday use",
          features: ["Durable Material", "Multiple Compartments", "Trendy Designs"]
        },
        { 
          id: 'home-tablecover-1',
          name: "Table Covers", 
          price: 899, 
          image: "🍽️",
          description: "Beautiful table covers for dining elegance",
          features: ["Stain Resistant", "Easy Clean", "Elegant Patterns"]
        }
      ],
      description: "Premium home textiles and lifestyle products to enhance your living space"
    }
  };

  const features = [
    {
      icon: "✂️",
      title: "Custom Tailoring",
      description: "Made-to-order with perfect measurements and personalized fitting"
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description: "High-quality materials and excellent craftsmanship in every product"
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick turnaround times with reliable shipping across India"
    },
    {
      icon: "💝",
      title: "Eco Friendly",
      description: "Sustainable manufacturing practices and eco-friendly materials"
    }
  ];

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    closeProductModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Gfarment Manufacturing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Premium Clothing & Textile Manufacturers with Custom Tailoring Services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg border border-gray-300"
              >
                🛍️ Order Now
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition duration-300">
                📞 Get Quote
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Why Choose Gfarment?</h2>
          <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern technology to deliver exceptional quality products
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 group hover:transform hover:scale-105 transition duration-300 border border-gray-200 rounded-2xl bg-gray-50">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-300 transition duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Our Collections</h2>
          <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
            Explore our wide range of premium clothing and textile products
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 border ${
                  activeCategory === category
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 shadow-md hover:shadow-lg hover:border-gray-400'
                }`}
              >
                {categories[category].title}
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-black mb-3">
                {categories[activeCategory].title}
              </h3>
              <p className="text-xl text-gray-600 font-semibold mb-4">
                {categories[activeCategory].subtitle}
              </p>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {categories[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories[activeCategory].items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group cursor-pointer border border-gray-200"
                  onClick={() => openProductModal(item)}
                >
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition duration-300 border border-gray-300">
                    <span className="text-4xl">{item.image}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-black text-center mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-center text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-black">₹{item.price}</span>
                    <span className="text-gray-400">⭐⭐⭐⭐⭐</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(item);
                    }}
                    className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 border border-black"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600 font-semibold">Happy Customers</div>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="text-4xl font-bold text-black mb-2">1000+</div>
              <div className="text-gray-600 font-semibold">Products Delivered</div>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="text-4xl font-bold text-black mb-2">50+</div>
              <div className="text-gray-600 font-semibold">Designs</div>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="text-4xl font-bold text-black mb-2">5+</div>
              <div className="text-gray-600 font-semibold">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-black">{selectedProduct.name}</h3>
              <button 
                onClick={closeProductModal}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-300">
              <span className="text-5xl">{selectedProduct.image}</span>
            </div>
            
            <p className="text-gray-600 mb-4 text-center">{selectedProduct.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-black mb-2">Features:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-black">₹{selectedProduct.price}</span>
              <span className="text-gray-400">⭐⭐⭐⭐⭐</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleAddToCart(selectedProduct)}
                className="flex-1 bg-black text-white py-3 rounded-xl font-semibold text-center hover:bg-gray-800 transition duration-300 border border-black"
              >
                Add to Cart
              </button>
              <button 
                onClick={closeProductModal}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gfarment;