import React, { useState } from "react";

const Sidebar = ({ categories, selected, onSelect, onPriceChange, onAvailabilityChange, priceRange, availability, allProducts, isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Count products per category
  const getCategoryCount = (category) => {
    if (category === "all") return allProducts.length;
    return allProducts.filter(p => p.category === category).length;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full lg:h-auto
        w-80 lg:w-[350px] xl:w-[400px]
        bg-white rounded-none lg:rounded-2xl shadow-lg 
        p-4 sm:p-6 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-visible
      `}>
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h3 className="text-lg font-bold text-black">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CATEGORY DROPDOWN */}
        <div className="mb-6 sm:mb-8">
          <h4 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6 flex items-center">
            <span className="w-2 h-6 bg-black rounded-full mr-3"></span>
            Product Categories
          </h4>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-300 rounded-xl text-left font-medium text-black hover:border-black focus:border-black focus:ring-2 focus:ring-gray-200 transition-all duration-200 flex justify-between items-center text-sm sm:text-base"
            >
              <span className="capitalize truncate">
                {selected === "all" ? "All Products" : selected.replace(/-/g, ' ')}
                <span className="ml-2 text-xs px-2 py-1 bg-gray-200 text-black rounded-full">
                  {getCategoryCount(selected)}
                </span>
              </span>
              <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                <div
                  className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-all duration-200 font-medium flex justify-between items-center text-sm sm:text-base ${
                    selected === "all" 
                      ? "bg-black text-white" 
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    onSelect("all");
                    setIsDropdownOpen(false);
                  }}
                >
                  <span>All Products</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selected === "all" ? "bg-white/20 text-white" : "bg-gray-200 text-black"
                  }`}>
                    {getCategoryCount("all")}
                  </span>
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-all duration-200 font-medium capitalize flex justify-between items-center border-t border-gray-200 text-sm sm:text-base ${
                      selected === cat 
                        ? "bg-black text-white" 
                        : "text-black hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      onSelect(cat);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="truncate">{cat.replace(/-/g, ' ')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                      selected === cat ? "bg-white/20 text-white" : "bg-gray-200 text-black"
                    }`}>
                      {getCategoryCount(cat)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
          <h4 className="text-base sm:text-lg font-bold text-black mb-3 sm:mb-4 flex items-center">
            <span className="w-2 h-5 bg-black rounded-full mr-3"></span>
            Availability
          </h4>
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2" 
                checked={availability.inStock}
                onChange={(e) => onAvailabilityChange('inStock', e.target.checked)}
              />
              <span className="ml-2 sm:ml-3 text-black group-hover:text-gray-600 transition-colors font-medium text-sm sm:text-base">In Stock</span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2" 
                checked={availability.outOfStock}
                onChange={(e) => onAvailabilityChange('outOfStock', e.target.checked)}
              />
              <span className="ml-2 sm:ml-3 text-black group-hover:text-gray-600 transition-colors font-medium text-sm sm:text-base">Out of Stock</span>
            </label>
          </div>
        </div>

        {/* PRICE */}
        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
          <h4 className="text-base sm:text-lg font-bold text-black mb-3 sm:mb-4 flex items-center">
            <span className="w-2 h-5 bg-black rounded-full mr-3"></span>
            Price Range (USD)
          </h4>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
              <input 
                type="number" 
                value="0" 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-gray-200"
                readOnly
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
              <input 
                type="number" 
                value={priceRange} 
                onChange={(e) => onPriceChange(e.target.value)}
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-gray-200"
              />
            </div>
          </div>
          
          <div className="relative mb-2">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              value={priceRange}
              onChange={(e) => onPriceChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$5000</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
