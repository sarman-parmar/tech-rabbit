import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-800 mb-2">Loading Products...</p>
        <p className="text-gray-600">Please wait while we fetch the latest products</p>
      </div>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  );
};

export default Loader;
