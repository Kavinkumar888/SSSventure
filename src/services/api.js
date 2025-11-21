// src/services/api.js
import axios from "axios";
import { localStorageService } from "./localservice";

const API_BASE_URL = import.meta.env.VITE_API_URL;
// Remove fallback to localhost to avoid confusion

console.log("🔗 API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track backend status
let isBackendOnline = false;

export const testBackendConnection = async () => {
  try {
    const response = await api.get("/health");
    isBackendOnline = true;
    console.log("✅ Backend is online:", response.data);
    return true;
  } catch (error) {
    isBackendOnline = false;
    console.warn("❌ Backend is offline, using local storage");
    return false;
  }
};

export const apiService = {
  getProducts: async () => {
    try {
      if (isBackendOnline) {
        const response = await api.get("/products");
        return response.data;
      } else {
        const localProducts = localStorageService.getProducts();
        return {
          success: true,
          data: localProducts,
          count: localProducts.length,
          source: "local",
        };
      }
    } catch (error) {
      console.warn("Failed to get products, using local storage");
      const localProducts = localStorageService.getProducts();
      return {
        success: true,
        data: localProducts,
        count: localProducts.length,
        source: "local",
      };
    }
  },

  createProduct: async (productData) => {
    try {
      if (isBackendOnline) {
        const response = await api.post("/products", productData);
        return response.data;
      } else {
        const savedProduct = localStorageService.saveProduct(productData);
        return {
          success: true,
          message: "Product saved locally",
          product: savedProduct,
          source: "local",
        };
      }
    } catch (error) {
      console.warn("Failed to create product, saving locally");
      const savedProduct = localStorageService.saveProduct(productData);
      return {
        success: true,
        message: "Product saved locally (fallback)",
        product: savedProduct,
        source: "local",
      };
    }
  },

  updateProduct: async (id, productData) => {
    try {
      if (isBackendOnline) {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
      } else {
        const updatedProduct = localStorageService.updateProduct(id, productData);
        return {
          success: true,
          message: "Product updated locally",
          product: updatedProduct,
          source: "local",
        };
      }
    } catch (error) {
      console.warn("Failed to update product, updating locally");
      const updatedProduct = localStorageService.updateProduct(id, productData);
      return {
        success: true,
        message: "Product updated locally (fallback)",
        product: updatedProduct,
        source: "local",
      };
    }
  },

  deleteProduct: async (id) => {
    try {
      if (isBackendOnline) {
        const response = await api.delete(`/products/${id}`);
        return response.data;
      } else {
        localStorageService.deleteProduct(id);
        return {
          success: true,
          message: "Product deleted locally",
          deletedId: id,
          source: "local",
        };
      }
    } catch (error) {
      console.warn("Failed to delete product, deleting locally");
      localStorageService.deleteProduct(id);
      return {
        success: true,
        message: "Product deleted locally (fallback)",
        deletedId: id,
        source: "local",
      };
    }
  },

  getBackendStatus: () => isBackendOnline,
  testConnection: testBackendConnection,
};

export default api;
