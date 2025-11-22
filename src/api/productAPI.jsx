// src/api/productAPI.js

// ✅ Use Vite environment variable (correct way for Vite + Hostinger)
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Debug
console.log("🌐 Connected to backend:", API_BASE_URL);

// Helper for GET/DELETE requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log("🔍 API Request:", url);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Failed:", url, error);
    throw error;
  }
};

// ----- HEALTH CHECK -----
export const healthCheck = () => apiRequest("/health");

// ----- GET ALL PRODUCTS -----
export const getProducts = () => apiRequest("/products");

// ----- GET PRODUCT -----
export const getProductById = (id) => apiRequest(`/products/${id}`);

// ----- CREATE PRODUCT -----
export const createProduct = async (productData) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (key === "specifications") {
      formData.append(key, JSON.stringify(productData[key]));
    } else if (key === "image" && productData[key]) {
      formData.append("image", productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Create Product Failed:", error);
    throw error;
  }
};

// ----- UPDATE PRODUCT -----
export const updateProduct = async (id, productData) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (key === "specifications") {
      formData.append(key, JSON.stringify(productData[key]));
    } else if (key === "image" && productData[key]) {
      formData.append("image", productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Update Product Failed:", error);
    throw error;
  }
};

// ----- DELETE PRODUCT -----
export const deleteProduct = (id) =>
  apiRequest(`/products/${id}`, { method: "DELETE" });

// ----- CATEGORY FILTER -----
export const getProductsByCategory = (category) =>
  apiRequest(`/products/category/${category}`);

// ----- SEARCH -----
export const searchProducts = (query) =>
  apiRequest(`/products/search/${query}`);

// ----- EXPORT -----
export const productAPI = {
  healthCheck,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
};

export default productAPI;
