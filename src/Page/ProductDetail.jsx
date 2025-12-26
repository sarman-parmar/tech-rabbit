import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setSelectedSize(sizes[2]); // Default to M
      })
      .catch(() => setError("Failed to load product"));
  }, [id]);

  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="text-xl font-semibold text-black">Loading product...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT: IMAGE GALLERY */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.title}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                    mainImage === img ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="flex-1 order-1 sm:order-2">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-sm" 
              />
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-block px-3 py-1 bg-gray-100 text-black text-xs sm:text-sm font-medium rounded-full">
              {product.category}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${
                  i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                }`}>★</span>
              ))}
              <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-xl sm:text-2xl font-bold text-black">
                ₹{Math.round(product.price * 0.8)}
              </div>
              <div className="text-base sm:text-lg text-gray-500 line-through">
                ₹{product.price}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-black">Stock:</span>
                <span className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>
            </div>
            
            {/* DELIVERY INFO */}
            <div className="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-black">Estimate delivery times:</p>
                  <p className="text-xs sm:text-sm text-gray-600">3-5 days International</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-black">Discount Code:</p>
                  <p className="text-xs sm:text-sm text-gray-600">Use code "WELCOME15" for 15% off your first order</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-black">Free shipping & returns:</p>
                  <p className="text-xs sm:text-sm text-gray-600">On all orders over $150</p>
                </div>
              </div>
            </div>

            {/* SIZE SELECTION */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-black">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 border-2 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-black hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & ADD TO CART */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <div className="flex items-center border border-gray-300 rounded-2xl w-fit">
                <button 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-l-2xl"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-r-2xl"
                >
                  +
                </button>
              </div>
              
              <button className="flex-1 bg-black text-white py-3 px-6 rounded-2xl font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Add to Cart
              </button>
              
              <div className="flex space-x-2 sm:space-x-0">
                <button className="w-12 h-12 border-2 border-black bg-white text-black rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <button className="w-12 h-12 border-2 border-black bg-white text-black rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* TERMS CHECKBOX */}
            <div className="flex items-start space-x-3 mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2 flex-shrink-0"
              />
              <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-black underline hover:no-underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-black underline hover:no-underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* BUY NOW BUTTON */}
            <button 
              disabled={!acceptTerms}
              className={`w-full py-3 sm:py-4 px-6 rounded-2xl mt-4 font-semibold text-base sm:text-lg transition-all duration-200 ${
                acceptTerms
                  ? "bg-gradient-to-r from-orange-500 to-[#D0473E] text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105"
                  : "bg-gray-400 text-white opacity-70 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
