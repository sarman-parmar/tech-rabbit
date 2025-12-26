import React, { useState } from "react";

const ProductCard = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const discountedPrice = Math.round(product.price * 0.8);
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="w-full h-48 sm:h-56 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-48 sm:h-56 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-xs sm:text-sm">Image not available</span>
          </div>
        ) : (
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className={`w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      <div className="p-3 sm:p-4 text-center">
        <h4 className="text-xs sm:text-sm font-semibold text-black mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h4>
        
        <div className="flex justify-center mb-2">
          {renderStars(product.rating || 4.5)}
        </div>
        
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2">
          <span className="text-base sm:text-lg font-bold text-black">
            ₹{discountedPrice}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 line-through">
            ₹{product.price}
          </span>
        </div>
        
        <div className="flex justify-center space-x-1">
          {product.images && product.images.slice(0, 3).map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={product.title}
              className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
