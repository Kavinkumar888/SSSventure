// src/api/productAPI.jsx
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API calls
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

// Get all products
export const getProducts = async () => {
  return apiRequest('/products');
};

// Get product by ID
export const getProductById = async (id) => {
  return apiRequest(`/products/${id}`);
};

// Create new product with image
export const createProduct = async (productData) => {
  const formData = new FormData();
  
  // Append all product fields
  Object.keys(productData).forEach(key => {
    if (key === 'specifications') {
      formData.append(key, JSON.stringify(productData[key]));
    } else if (key === 'image' && productData[key] instanceof File) {
      formData.append('image', productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Update product with image
export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  
  // Append all product fields
  Object.keys(productData).forEach(key => {
    if (key === 'specifications') {
      formData.append(key, JSON.stringify(productData[key]));
    } else if (key === 'image' && productData[key] instanceof File) {
      formData.append('image', productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Delete product
export const deleteProduct = async (id) => {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE',
  });
};

// Get products by category
export const getProductsByCategory = async (category) => {
  return apiRequest(`/products/category/${category}`);
};

// Search products
export const searchProducts = async (query) => {
  return apiRequest(`/products/search/${query}`);
};

// Named export for productAPI object
export const productAPI = {
  healthCheck,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
};

// Default export
export default productAPI;