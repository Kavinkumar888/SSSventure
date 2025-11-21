// src/data/products.js
export const categories = [
  {
    id: 'Mill Dyed',
    name: 'Mill Dyed',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    description: 'Traditional and contemporary sarees'
  },
  {
    id: 'yarnDyed',
    name: 'yarnDyed',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Western and ethnic dresses'
  },
  {
    id: 'Denim',
    name: 'Denim',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Casual and designer kurtis'
  },
];
export const subCategories = {
  MillDyed: ["coton", "Vescose", "Linezing", "Linen"],
  yarnDyed: ["Explore Fabrics","Buy sample yardage"],
  Denim: ["Explore Fabrics"," Buy sample yardage"]
};

// Export all products combined
export const allProducts = [...products, ...dyedProducts];