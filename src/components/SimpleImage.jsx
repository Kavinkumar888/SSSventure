// src/components/SimpleImage.js
import React from 'react';

const SimpleImage = ({ src, alt, className, onClick, fallbackSrc }) => {
  const handleError = (e) => {
    console.log('🖼️ Image failed to load:', src);
    if (fallbackSrc) {
      e.target.src = fallbackSrc;
    } else {
      e.target.src = 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=No+Image';
    }
    e.target.onerror = null; // Prevent infinite loop
  };

  // Handle different image source types
  const getImageUrl = (imageSrc) => {
    if (!imageSrc) {
      return 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=No+Image';
    }

    // If it's a base64 image or full URL
    if (imageSrc.startsWith('data:') || imageSrc.startsWith('http')) {
      return imageSrc;
    }

    // If it's a relative path from backend
    if (imageSrc.startsWith('/uploads/')) {
      return `http://localhost:5000${imageSrc}`;
    }

    // If it's just a filename
    if (imageSrc.includes('.')) {
      return `http://localhost:5000/uploads/${imageSrc}`;
    }

    return imageSrc;
  };

  const imageUrl = getImageUrl(src);

  return (
    <img
      src={imageUrl}
      alt={alt || 'Product Image'}
      className={className}
      onClick={onClick}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default SimpleImage;