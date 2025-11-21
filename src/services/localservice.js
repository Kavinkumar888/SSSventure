// src/services/localStorageService.js
const STORAGE_KEYS = {
  PRODUCTS: 'sss_ventures_products',
  ORDERS: 'sss_ventures_orders',
  CART: 'sss_ventures_cart'
};

export const localStorageService = {
  // Products
  getProducts: () => {
    try {
      const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('Error reading products from localStorage:', error);
      return [];
    }
  },

  saveProduct: (product) => {
    try {
      const products = localStorageService.getProducts();
      const existingIndex = products.findIndex(p => p.id === product.id);
      
      if (existingIndex >= 0) {
        products[existingIndex] = { ...products[existingIndex], ...product };
      } else {
        products.push({
          ...product,
          id: product.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: product.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      return products;
    } catch (error) {
      console.error('Error saving product to localStorage:', error);
      throw error;
    }
  },

  deleteProduct: (productId) => {
    try {
      const products = localStorageService.getProducts();
      const filteredProducts = products.filter(p => p.id !== productId);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filteredProducts));
      return filteredProducts;
    } catch (error) {
      console.error('Error deleting product from localStorage:', error);
      throw error;
    }
  },

  updateProduct: (productId, updates) => {
    try {
      const products = localStorageService.getProducts();
      const productIndex = products.findIndex(p => p.id === productId);
      
      if (productIndex >= 0) {
        products[productIndex] = {
          ...products[productIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return products[productIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating product in localStorage:', error);
      throw error;
    }
  }
};