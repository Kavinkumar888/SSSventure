// src/data/products.js
export const categories = [
  {
    id: 'WovenFabric',
    name: 'Woven Fabric',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    description: 'Premium woven fabrics with various weaves and compositions'
  },
  {
    id: 'SustainableFabric',
    name: 'Sustainable Fabric',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Eco-friendly and sustainable fabric options'
  },
  {
    id: 'GreigeFabric',
    name: 'Greige Fabric',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400',
    description: 'Unbleached and undyed fabrics ready for processing'
  },
  {
    id: 'BuySwatches',
    name: 'Buy Swatches',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400',
    description: 'Fabric samples and swatches for evaluation'
  }
];

export const subCategories = {
  WovenFabric: ['Silk', 'Cotton', 'Viscose', 'Modal', 'Linen', 'Bamboo', 'Banana', 'Hemp'],
  SustainableFabric: ['LENZING Fabric', 'LIVA Fabric', 'BEMBERG CUPRO', 'Organic Cotton'],
  GreigeFabric: ['Cotton Greige', 'Linen Greige', 'Viscose Greige', 'Blended Greige'],
  BuySwatches: ['Cotton Swatches', 'Linen Swatches', 'Sustainable Swatches', 'Premium Swatches']
};

// Mill Dyed Products Data with Specifications
export const millDyedProducts = [
  {
    id: "mill-1",
    name: "Oxford Linen Fabric",
    price: 85,
    originalPrice: 100,
    description: "Premium oxford weave linen fabric with excellent durability and texture",
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    category: "WovenFabric",
    subCategory: "Linen",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Linen",
      count: "30×44 lee",
      weave: "Oxford",
      gsm: 61,
      width: "58 inches",
      composition: "100% Linen",
      finish: "Soft Finish",
      usage: "Apparel, Home Textiles"
    },
    tags: ["linen", "oxford", "woven", "premium", "breathable"],
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    id: "mill-2",
    name: "Cotton Poplin Fabric",
    price: 65,
    originalPrice: 80,
    description: "Smooth cotton poplin fabric perfect for shirts and dresses",
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    category: "WovenFabric",
    subCategory: "Cotton",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Cotton",
      count: "80×80",
      weave: "Plain",
      gsm: 110,
      width: "44 inches",
      composition: "100% Cotton",
      finish: "Mercerized",
      usage: "Shirts, Dresses, Blouses"
    },
    tags: ["cotton", "poplin", "smooth", "shirting"],
    rating: 4.5,
    reviews: 67,
    inStock: true
  },
  {
    id: "mill-3",
    name: "Viscose Twill Fabric",
    price: 75,
    originalPrice: 90,
    description: "Luxurious viscose twill with excellent drape and comfort",
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    category: "WovenFabric",
    subCategory: "Viscose",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Viscose",
      count: "60×60",
      weave: "Twill",
      gsm: 140,
      width: "54 inches",
      composition: "100% Viscose",
      finish: "Soft Finish",
      usage: "Dresses, Skirts, Trousers"
    },
    tags: ["viscose", "twill", "drape", "luxury"],
    rating: 4.6,
    reviews: 78,
    inStock: true
  },
  {
    id: "mill-4",
    name: "Linen Canvas",
    price: 90,
    originalPrice: 110,
    description: "Durable linen canvas fabric for heavy-duty applications",
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    category: "WovenFabric",
    subCategory: "Linen",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Linen",
      count: "20×20",
      weave: "Canvas",
      gsm: 280,
      width: "58 inches",
      composition: "100% Linen",
      finish: "Heavy Duty",
      usage: "Bags, Upholstery, Workwear"
    },
    tags: ["linen", "canvas", "heavy-duty", "durable"],
    rating: 4.7,
    reviews: 89,
    inStock: true
  }
];

// Yarn Dyed Products Data
export const yarnDyedProducts = [
  {
    id: "yarn-1",
    name: "Yarn Dyed Stripes",
    price: 120,
    originalPrice: 145,
    description: "Beautiful yarn dyed striped fabric with colorfast properties",
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    category: "WovenFabric",
    subCategory: "Cotton",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Yarn Dyed",
      count: "60×60",
      weave: "Striped",
      gsm: 130,
      width: "52 inches",
      composition: "100% Cotton",
      finish: "Yarn Dyed",
      usage: "Shirts, Dresses, Home Textiles"
    },
    tags: ["yarn-dyed", "stripes", "colorfast", "premium"],
    rating: 4.7,
    reviews: 92,
    inStock: true
  },
  {
    id: "yarn-2",
    name: "Yarn Dyed Checks",
    price: 135,
    originalPrice: 160,
    description: "Classic check pattern created through yarn dyeing process",
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    category: "WovenFabric",
    subCategory: "Cotton",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Yarn Dyed",
      count: "40×40",
      weave: "Check",
      gsm: 145,
      width: "54 inches",
      composition: "Cotton-Polyester Blend",
      finish: "Yarn Dyed",
      usage: "Shirts, Skirts, Home Decor"
    },
    tags: ["yarn-dyed", "checks", "classic", "blend"],
    rating: 4.6,
    reviews: 78,
    inStock: true
  }
];

// Denim Products Data
export const denimProducts = [
  {
    id: "denim-1",
    name: "Stretch Denim",
    price: 150,
    originalPrice: 180,
    description: "Comfortable stretch denim with excellent recovery",
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    category: "WovenFabric",
    subCategory: "Cotton",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Denim",
      count: "70×70",
      weave: "Twill",
      gsm: 320,
      width: "58 inches",
      composition: "98% Cotton, 2% Elastane",
      finish: "Stretch Finish",
      usage: "Jeans, Jackets, Skirts"
    },
    tags: ["denim", "stretch", "comfort", "jeans"],
    rating: 4.8,
    reviews: 112,
    inStock: true
  }
];

// RFD Products (Ready for Dyeing)
export const rfdProducts = [
  {
    id: "rfd-1",
    name: "Cotton RFD Fabric",
    price: 45,
    originalPrice: 55,
    description: "Pure cotton ready for dyeing fabric in greige state",
    image: 'https://images.unsplash.com/photo-1585487000116-76588d8d61e6?w=400',
    category: "GreigeFabric",
    subCategory: "Cotton Greige",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Cotton RFD",
      count: "40×40",
      weave: "Plain",
      gsm: 120,
      width: "44 inches",
      composition: "100% Cotton",
      finish: "RFD (Ready for Dyeing)",
      usage: "Custom Dyeing, Printing"
    },
    tags: ["cotton", "rfd", "dyeable", "greige"],
    rating: 4.4,
    reviews: 56,
    inStock: true
  },
  {
    id: "rfd-2",
    name: "Linen RFD Fabric",
    price: 65,
    originalPrice: 80,
    description: "Natural linen fabric ready for custom dyeing",
    image: 'https://images.unsplash.com/photo-1566195992017-6c2b6fe6d1b6?w=400',
    category: "GreigeFabric",
    subCategory: "Linen Greige",
    specifications: {
      category: "Woven Fabric",
      subCategory: "Linen RFD",
      count: "30×44",
      weave: "Plain",
      gsm: 160,
      width: "56 inches",
      composition: "100% Linen",
      finish: "RFD (Ready for Dyeing)",
      usage: "Custom Dyeing, Natural Fabrics"
    },
    tags: ["linen", "rfd", "natural", "dyeable"],
    rating: 4.5,
    reviews: 67,
    inStock: true
  }
];

// Export all products combined
export const allProducts = [

];

export const dyedProducts = millDyedProducts;

// Function to get combined products (static + admin uploaded)
export const getCombinedProducts = () => {
  try {
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    return [...allProducts, ...adminProducts];
  } catch (error) {
    console.error('Error getting combined products:', error);
    return allProducts; // Fallback to static products only
  }
};

// Get products by category (combined)
export const getProductsByCategory = (category) => {
  const products = getCombinedProducts();
  return products.filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
};

// Get products by subcategory (combined)
export const getProductsBySubCategory = (category, subCategory) => {
  const products = getCombinedProducts();
  return products.filter(product => 
    product.category === category && product.subCategory === subCategory
  );
};

// Search products (combined)
export const searchProducts = (searchTerm) => {
  const products = getCombinedProducts();
  const term = searchTerm.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description?.toLowerCase().includes(term) ||
    product.tags?.some(tag => tag.toLowerCase().includes(term)) ||
    product.category?.toLowerCase().includes(term) ||
    product.subCategory?.toLowerCase().includes(term)
  );
};
