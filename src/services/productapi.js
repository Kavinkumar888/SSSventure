// src/api/productAPI.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`🔄 API Call: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`📡 Response Status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error ${response.status}:`, errorText);
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Success:', data);
    return data;
  } catch (error) {
    console.error('🚨 API Request Failed:', error);
    throw error;
  }
};

export const productAPI = {
  // Health check
  healthCheck: async () => {
    return await apiRequest('/api/health');
  },

  // Get all products
  getProducts: async () => {
    const data = await apiRequest('/api/products');
    return data.data || [];
  },

  // Create product
  createProduct: async (productData) => {
    const formData = new FormData();
    
    console.log('📦 Creating product:', productData);
    
    // Append all fields
    Object.keys(productData).forEach(key => {
      if (key === 'specifications') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'image' && productData[key]) {
        formData.append('image', productData[key]);
        console.log('📸 Image attached:', productData[key].name);
      } else {
        formData.append(key, productData[key]);
      }
    });

    // Log form data contents
    for (let [key, value] of formData.entries()) {
      console.log(`📝 FormData: ${key} =`, value);
    }

    return await apiRequest('/api/products', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header for FormData - browser will set it automatically
    });
  },

  // Update product
  updateProduct: async (id, productData) => {
    const formData = new FormData();
    
    Object.keys(productData).forEach(key => {
      if (key === 'specifications') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'image' && productData[key]) {
        formData.append('image', productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });

    return await apiRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },

  // Delete product
  deleteProduct: async (id) => {
    return await apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Test connection
  testConnection: async () => {
    return await apiRequest('/api/test');
  }
};

export default productAPI;