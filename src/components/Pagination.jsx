import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, total }) => {
  if (totalPages === 0) return null;

  const PRODUCTS_PER_PAGE = 9;
  const startItem = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * PRODUCTS_PER_PAGE, total);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
      <div className="text-black text-sm order-2 sm:order-1">
        <span className="font-medium">{currentPage}</span>-<span className="font-medium">{totalPages}</span> of {total} products
      </div>
      <div className="flex items-center space-x-2 order-1 sm:order-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${'bg-gray-100 text-black hover:bg-gray-800'
            }`}
        >
          <span className="hidden sm:inline">{startItem}-{endItem}</span>
          <span className="sm:hidden">{currentPage}/{totalPages}</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
            }`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
            }`}
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
