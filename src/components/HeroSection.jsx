import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      ></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 tracking-tight text-center">
          Shop
        </h1>
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm opacity-90">
          <span className="hover:text-orange-400 transition-colors cursor-pointer">Home</span>
          <span className="text-orange-400">/</span>
          <span className="text-orange-400 font-semibold">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
