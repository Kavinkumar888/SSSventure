// src/components/AdminPanel.js - Updated version
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SimpleImage from './SimpleImage';
import { productAPI } from '../api/productAPI';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mainCategory: '',
    subCategory: '',
    nestedCategory: '',
    composition: '',
    gsm: '',
    width: '',
    count: '',
    construction: '',
    weave: '',
    finish: '',
    image: null
  });

  const { user, logout } = useAuth();

  // Categories structure
  const categories = {
    'fabrics structure': {
      name: 'Fabrics Structure',
      subCategories: {
        'plain weaves': { name: 'Plain Weaves', nested: [] },
        'twill weaves': { name: 'Twill Weaves', nested: [] },
        'satin weave': { name: 'Satin Weave', nested: [] },
        'drill weaves': { name: 'Drill Weaves', nested: [] },
        'dobby weave': { name: 'Dobby Weave', nested: [] },
        'jacquard weave': { name: 'Jacquard Weave', nested: [] },
        'oxford weave': { name: 'Oxford Weave', nested: [] }
      }
    },
    'woven fabrics': {
      name: 'Woven Fabrics',
      subCategories: {
        'greige': {
          name: 'Greige',
          nested: [
            'silk', 'cotton', 'viscose', 'modal', 'linen', 
            'bamboo', 'banana', 'hemp', 'cotton linen blend'
          ]
        },
        'rfd': {
          name: 'RFD',
          nested: [
            'silk', 'cotton', 'viscose', 'modal', 'linen', 
            'bamboo', 'banana', 'hemp', 'cotton linen blend'
          ]
        },
        'solid': {
          name: 'Solid',
          nested: [
            'silk', 'cotton', 'viscose', 'modal', 'linen', 
            'bamboo', 'banana', 'hemp', 'cotton linen blend'
          ]
        },
        'printed': {
          name: 'Printed',
          nested: [
            'silk', 'cotton', 'viscose', 'modal', 'linen', 
            'bamboo', 'banana', 'hemp', 'cotton linen blend'
          ]
        }
      }
    },
    'fabrics finish': {
      name: 'Fabrics Finish',
      subCategories: {
        'greige': { name: 'Greige', nested: [] },
        'rfd': { name: 'RFD', nested: [] },
        'solid': { name: 'Solid', nested: [] },
        'printed': { 
          name: 'Printed', 
          nested: ['table printing', 'rotary', 'digital printing'] 
        }
      }
    }
  };

  // Generate product URL
  const generateProductUrl = (product) => {
    if (!product.mainCategory && !product.subCategory) {
      return '/products';
    }

    const baseUrl = '/products?';
    const params = new URLSearchParams();

    if (product.mainCategory) {
      params.append('category', product.mainCategory);
    }

    if (product.mainCategory === 'fabrics structure' && product.subCategory) {
      params.append('subCategory', product.subCategory);
    } 
    else if (product.mainCategory === 'woven fabrics' && product.subCategory) {
      params.append('type', product.subCategory);
      if (product.nestedCategory) {
        params.append('fabricType', product.nestedCategory);
      }
    } 
    else if (product.mainCategory === 'fabrics finish' && product.subCategory) {
      params.append('subCategory', product.subCategory);
      if (product.nestedCategory) {
        params.append('nestedCategory', product.nestedCategory);
      }
    }

    return baseUrl + params.toString();
  };

  // Check backend status and fetch products
  useEffect(() => {
    checkBackendStatus();
    fetchProducts();
  }, []);

  const checkBackendStatus = async () => {
    try {
      console.log('🔍 Checking backend connection...');
      const health = await productAPI.healthCheck();
      console.log('✅ Backend connected successfully:', health);
      setBackendStatus('connected');
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      setBackendStatus('disconnected');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching products from backend...');
      
      await productAPI.healthCheck();
      console.log('✅ Backend is healthy');
      
      const productsData = await productAPI.getProducts();
      console.log('✅ Products loaded from backend:', productsData);
      
      setProducts(productsData);
      localStorage.setItem('adminProducts', JSON.stringify(productsData));
      
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      
      // Fallback to localStorage
      try {
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
          console.log('📦 Loaded products from localStorage:', parsedProducts.length);
        } else {
          console.log('📦 No products found in localStorage');
          setProducts([]);
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError);
        setProducts([]);
      }
      
      setBackendStatus('disconnected');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mainCategory') {
      setFormData(prev => ({
        ...prev,
        mainCategory: value,
        subCategory: '',
        nestedCategory: ''
      }));
    } else if (name === 'subCategory') {
      setFormData(prev => ({
        ...prev,
        subCategory: value,
        nestedCategory: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // UPDATED: Handle file change with 1MB size limit
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file size (1MB = 1,048,576 bytes)
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      
      if (file.size > maxSize) {
        alert('❌ Image size must be less than 1MB. Please choose a smaller image.');
        e.target.value = ''; // Clear the file input
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('❌ Please select a valid image file (JPEG, JPG, PNG, or WebP).');
        e.target.value = ''; // Clear the file input
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        image: null
      }));
    }
  };

  // Edit product function
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      mainCategory: product.mainCategory || product.category || '',
      subCategory: product.subCategory || '',
      nestedCategory: product.nestedCategory || '',
      composition: product.specifications?.composition || '',
      gsm: product.specifications?.gsm || '',
      width: product.specifications?.width || '',
      count: product.specifications?.count || '',
      construction: product.specifications?.construction || '',
      weave: product.specifications?.weave || '',
      finish: product.specifications?.finish || '',
      image: null
    });
    
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      mainCategory: '',
      subCategory: '',
      nestedCategory: '',
      composition: '',
      gsm: '',
      width: '',
      count: '',
      construction: '',
      weave: '',
      finish: '',
      image: null
    });
    const fileInput = document.getElementById('imageInput');
    if (fileInput) fileInput.value = '';
  };

  // Handle form submit with backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get display names for categories
      const mainCategoryDisplay = categories[formData.mainCategory]?.name || formData.mainCategory;
      const subCategoryDisplay = categories[formData.mainCategory]?.subCategories[formData.subCategory]?.name || formData.subCategory;

      // Create specifications object
      const specifications = {
        category: mainCategoryDisplay,
        subCategory: subCategoryDisplay,
        composition: formData.composition,
        gsm: formData.gsm,
        width: formData.width,
        count: formData.count,
        construction: formData.construction,
        weave: formData.weave,
        finish: formData.finish
      };

      // Price is optional - use 0 if empty
      const productPrice = formData.price ? parseFloat(formData.price) : 0;

      // Generate URL for this product
      const productUrl = generateProductUrl({
        mainCategory: formData.mainCategory,
        subCategory: formData.subCategory,
        nestedCategory: formData.nestedCategory
      });

      // Create product data for backend
      const productFormData = {
        name: formData.name,
        price: productPrice,
        mainCategory: formData.mainCategory,
        subCategory: formData.subCategory,
        nestedCategory: formData.nestedCategory,
        composition: formData.composition,
        gsm: formData.gsm,
        width: formData.width,
        count: formData.count,
        construction: formData.construction,
        weave: formData.weave,
        finish: formData.finish,
        image: formData.image,
        specifications: specifications,
        productUrl: productUrl
      };

      console.log('📤 Sending product data to backend...');
      console.log('🔗 Generated URL:', productUrl);

      let result;
      if (editingProduct) {
        // Use _id for MongoDB updates
        const productId = editingProduct._id || editingProduct.id;
        result = await productAPI.updateProduct(productId, productFormData);
        alert('Product updated successfully!');
      } else {
        result = await productAPI.createProduct(productFormData);
        alert('Product uploaded successfully!');
      }

      console.log('✅ Backend response:', result);

      await fetchProducts();
      setEditingProduct(null);
      resetForm();

    } catch (error) {
      console.error('❌ Error saving product:', error);
      alert('Error saving product: ' + error.message);
      
      // Fallback to local storage
      try {
        await handleSubmitLocal(e);
      } catch (localError) {
        console.error('Local save also failed:', localError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback local submit function
  const handleSubmitLocal = async (e) => {
    e.preventDefault();
    
    let imageUrl = 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Product+Image';
    
    if (formData.image) {
      try {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(formData.image);
        });
      } catch (error) {
        console.error('Image conversion failed:', error);
      }
    } else if (editingProduct && editingProduct.imageUrl) {
      imageUrl = editingProduct.imageUrl;
    }

    const mainCategoryDisplay = categories[formData.mainCategory]?.name || formData.mainCategory;
    const subCategoryDisplay = categories[formData.mainCategory]?.subCategories[formData.subCategory]?.name || formData.subCategory;

    // Generate URL for local storage too
    const productUrl = generateProductUrl({
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory,
      nestedCategory: formData.nestedCategory
    });

    const productPrice = formData.price ? parseFloat(formData.price) : 0;

    const productData = {
      id: editingProduct ? editingProduct.id : 'admin-' + Date.now().toString(),
      _id: editingProduct ? editingProduct._id : undefined,
      name: formData.name,
      price: productPrice,
      description: formData.description,
      category: formData.mainCategory,
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory,
      nestedCategory: formData.nestedCategory,
      specifications: {
        category: mainCategoryDisplay,
        subCategory: subCategoryDisplay,
        composition: formData.composition,
        gsm: formData.gsm,
        width: formData.width,
        count: formData.count,
        construction: formData.construction,
        weave: formData.weave,
        finish: formData.finish,
      },
      imageUrl: imageUrl,
      productUrl: productUrl,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inStock: true
    };

    let updatedProducts;
    
    if (editingProduct) {
      updatedProducts = products.map(product => 
        product.id === editingProduct.id ? productData : product
      );
    } else {
      updatedProducts = [...products, productData];
    }
    
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));

    setEditingProduct(null);
    resetForm();
    alert('Product saved locally (Backend offline)');
  };

  // Handle delete with backend
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(productId);
        await fetchProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('❌ Error deleting from backend, deleting locally:', error);
        
        try {
          const updatedProducts = products.filter(product => product.id !== productId);
          setProducts(updatedProducts);
          localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
          
          if (editingProduct && editingProduct.id === productId) {
            handleCancelEdit();
          }
          
          alert('Product deleted locally (Backend offline)');
        } catch (localError) {
          console.error('Local delete failed:', localError);
          alert('Error deleting product');
        }
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  // Helper function to format category names for display
  const formatCategoryName = (name) => {
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Handle image URL - support both MongoDB base64 and file URLs
  const getImageUrl = (product) => {
    // If product has imageUrl (from MongoDB base64 conversion)
    if (product.imageUrl) {
      return product.imageUrl;
    }
    
    // If product has image data (direct MongoDB binary)
    if (product.image && product.image.data) {
      return `data:${product.image.contentType};base64,${product.image.data}`;
    }
    
    // If product has image path (file system)
    if (product.image) {
      if (product.image.startsWith('http') || product.image.startsWith('data:')) {
        return product.image;
      } else if (product.image.startsWith('/uploads/')) {
        return `http://localhost:5000${product.image}`;
      }
    }
    
    // Default placeholder
    return 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Product+Image';
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price || price === 0) {
      return 'Price on request';
    }
    return `₹${typeof price === 'number' ? price.toLocaleString() : price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with user info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
            <p className="text-gray-600">Welcome, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors border border-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload/Edit Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Upload New Product'}
              </h2>
              {editingProduct && (
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm transition-colors border border-gray-400"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            
            <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                    placeholder="Enter price (leave empty for 'Price on request')"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to show "Price on request"
                  </p>
                </div>
              </div>

              {/* Category Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Category *
                  </label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                  >
                    <option value="">Select Main Category</option>
                    {Object.entries(categories).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.mainCategory === 'woven fabrics' ? 'Process Type *' : 'Sub Category *'}
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.mainCategory}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select {formData.mainCategory === 'woven fabrics' ? 'Process Type' : 'Sub Category'}</option>
                    {formData.mainCategory && Object.entries(categories[formData.mainCategory]?.subCategories || {}).map(([key, subCategory]) => (
                      <option key={key} value={key}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.mainCategory === 'woven fabrics' ? 'Fabric Type' : 'Nested Category'}
                  </label>
                  <select
                    name="nestedCategory"
                    value={formData.nestedCategory}
                    onChange={handleInputChange}
                    disabled={!formData.subCategory || !categories[formData.mainCategory]?.subCategories[formData.subCategory]?.nested?.length}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {formData.mainCategory === 'woven fabrics' ? 'Select Fabric Type' : 'Select Nested Category'}
                    </option>
                    {formData.mainCategory && formData.subCategory && 
                     categories[formData.mainCategory]?.subCategories[formData.subCategory]?.nested?.map((nestedCat) => (
                      <option key={nestedCat} value={nestedCat}>
                        {formatCategoryName(nestedCat)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Technical Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Composition
                    </label>
                    <input
                      type="text"
                      name="composition"
                      value={formData.composition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., 100% Cotton"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GSM
                    </label>
                    <input
                      type="text"
                      name="gsm"
                      value={formData.gsm}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width
                    </label>
                    <input
                      type="text"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., 58 inches"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Count
                    </label>
                    <input
                      type="text"
                      name="count"
                      value={formData.count}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., 30×44"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Construction
                    </label>
                    <input
                      type="text"
                      name="construction"
                      value={formData.construction}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., Plain Weave, Twill Weave, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weave Type
                    </label>
                    <input
                      type="text"
                      name="weave"
                      value={formData.weave}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., Plain, Twill, Oxford"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Finish
                    </label>
                    <input
                      type="text"
                      name="finish"
                      value={formData.finish}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      placeholder="e.g., Soft Finish, Mercerized"
                    />
                  </div>
                </div>
              </div>

              {/* UPDATED: Image upload with size limit info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image {!editingProduct && '*'}
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                  required={!editingProduct}
                />
                {formData.image && (
                  <p className="text-green-600 text-sm mt-1">
                    ✅ Selected: {formData.image.name} ({(formData.image.size / 1024).toFixed(1)} KB)
                  </p>
                )}
                {editingProduct && !formData.image && (
                  <p className="text-blue-600 text-sm mt-1">
                    ℹ️ Current image will be kept if no new image is selected
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Supported formats: JPG, PNG, WebP. Max size: 1MB
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 transition duration-200 font-semibold border border-gray-700"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingProduct ? 'Updating...' : 'Uploading...'}
                  </span>
                ) : (
                  editingProduct ? '✏️ Update Product' : '📦 Upload Product'
                )}
              </button>

              {backendStatus === 'disconnected' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Backend is offline. Products will be saved locally.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Existing Products ({products.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={fetchProducts}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition-colors border border-blue-500"
                >
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {products.map((product) => (
                <div key={product._id || product.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  editingProduct?.id === product.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <SimpleImage
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0 border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => window.open(getImageUrl(product), '_blank')}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                      <p className={`font-bold ${
                        !product.price || product.price === 0 
                          ? 'text-gray-500 italic' 
                          : 'text-gray-700'
                      }`}>
                        {formatPrice(product.price)}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded capitalize border border-gray-300">
                          {categories[product.mainCategory || product.category]?.name || product.mainCategory || product.category}
                        </span>
                        <span className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded capitalize border border-gray-400">
                          {categories[product.mainCategory || product.category]?.subCategories[product.subCategory]?.name || product.subCategory}
                        </span>
                        {product.nestedCategory && (
                          <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded capitalize border border-gray-500">
                            {formatCategoryName(product.nestedCategory)}
                          </span>
                        )}
                        {product.updatedAt && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded border border-green-700">
                            Edited
                          </span>
                        )}
                      </div>
                      {product.specifications?.composition && (
                        <p className="text-xs text-gray-600 mt-1">Composition: {product.specifications.composition}</p>
                      )}
                      {product.specifications?.gsm && (
                        <p className="text-xs text-gray-600">GSM: {product.specifications.gsm}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Added: {new Date(product.createdAt).toLocaleDateString()}
                        {product.updatedAt && product.updatedAt !== product.createdAt && (
                          <span> • Edited: {new Date(product.updatedAt).toLocaleDateString()}</span>
                        )}
                      </p>
                      {product.productUrl && (
                        <p className="text-xs text-blue-600 mt-1 truncate">
                          URL: {product.productUrl}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition-colors border border-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id || product.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition-colors border border-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-500">No products uploaded yet</p>
                  <p className="text-sm text-gray-400 mt-2">Upload your first product using the form</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;