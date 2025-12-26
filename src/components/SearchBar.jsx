import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-gray-200 transition-all duration-200 text-black placeholder-gray-400 text-sm"
      />
    </div>
  );
};

export default SearchBar;
