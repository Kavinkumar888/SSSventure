
export const categories = [
  {
    id: 'plain weaves',
    name: 'plain weaves',
    image: 'https://images.unsplash.com/photo-1583391738853-4682c0350d44?w=400',
    description: 'Premium mill-dyed fabrics with consistent color quality'
  },
  {
    id: 'Twill weaves',
    name: 'Twill weaves',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Yarn-dyed fabrics with intricate patterns and weaves'
  },
  {
    id: 'satin weave',
    name: 'satin weave',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Durable denim fabrics for various applications'
  },
  {
    id: 'Drill weaves',
    name: 'Drill weaves',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Durable denim fabrics for various applications'
  },
  {
    id: 'Dobby weave',
    name: 'Dobby weave',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Durable denim fabrics for various applications'
  },
    {
    id: 'Jacquars weave',
    name: 'Jacquars weave',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400',
    description: 'Durable denim fabrics for various applications'
  },
];

// Mill Dyed Products Data with Specifications
export const millDyedProducts = [
 
];

// Export all products combined
export const allProducts = [
  ...millDyedProducts
];

// Export individual categories for filtering
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category === category);
};

// Export for backward compatibility
export const products = allProducts;
export const dyedProducts = millDyedProducts;