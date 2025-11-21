// src/services/productapi.js
import api from "./api";

export const productAPI = {
  // ✅ FIXED: correct backend route
  healthCheck: async () => {
    const response = await api.get("/api/health");
    return response.data;
  },

  // ✅ FIXED: correct route + safe return
  getProducts: async () => {
    const response = await api.get("/api/products");
    return response.data.data || [];
  },

  // ✅ FIXED: correct route + FormData handling
  createProduct: async (productData) => {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "specifications") {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === "tags" && Array.isArray(productData[key])) {
        formData.append(key, productData[key].join(","));
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  // ✅ FIXED: correct route + FormData handling
  updateProduct: async (id, productData) => {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "specifications") {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === "tags" && Array.isArray(productData[key])) {
        formData.append(key, productData[key].join(","));
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.put(`/api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  // ✅ FIXED: correct route
  deleteProduct: async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};
