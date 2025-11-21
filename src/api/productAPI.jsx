// src/api/productAPI.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// FormData for file uploads
const apiFormRequest = async (endpoint, formData, method = 'POST') => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API form request failed:', error);
    throw error;
  }
};

export const productAPI = {
  // Get all products
  getProducts: async () => {
    const data = await apiRequest('/products');
    return data.data || [];
  },

  // Create new product
  createProduct: async (productData) => {
    const formData = new FormData();
    
    // Append all product data
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key] instanceof File) {
        formData.append('image', productData[key]);
      } else if (typeof productData[key] === 'object') {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    return await apiFormRequest('/products', formData);
  },

  // Update product
  updateProduct: async (id, productData) => {
    const formData = new FormData();
    
    // Append all product data
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key] instanceof File) {
        formData.append('image', productData[key]);
      } else if (typeof productData[key] === 'object') {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    return await apiFormRequest(`/products/${id}`, formData, 'PUT');
  },

  // Delete product
  deleteProduct: async (id) => {
    return await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Get single product
  getProduct: async (id) => {
    const data = await apiRequest(`/products/${id}`);
    return data.product;
  }
};