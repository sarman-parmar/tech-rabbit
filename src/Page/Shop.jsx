import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState(500);
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PRODUCTS_PER_PAGE = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (search) {
          const searchRes = await fetch(`https://dummyjson.com/products/search?q=${search}`);
          const searchData = await searchRes.json();
          setAllProducts(searchData.products);
        } else {
          const res = await fetch('https://dummyjson.com/products?limit=0');
          const data = await res.json();
          setAllProducts(data.products);
          
          const uniqueCategories = [...new Set(data.products.map(p => p.category))];
          setCategories(uniqueCategories);
        }
      } catch {
        setError("Unable to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  const filteredProducts = allProducts.filter((p) => {
    const matchesPrice = p.price <= priceRange;
    const matchesAvailability = 
      (!availability.inStock && !availability.outOfStock) ||
      (availability.inStock && p.stock > 0) ||
      (availability.outOfStock && p.stock === 0);
    const matchesCategory = category === "all" || p.category === category;
    
    return matchesPrice && matchesAvailability && matchesCategory;
  });
  
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE, 
    page * PRODUCTS_PER_PAGE
  );

  if (error) return <ErrorMessage message={error} />;

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />

      <div className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
          <Sidebar
            categories={categories}
            selected={category}
            onSelect={(cat) => {
              setCategory(cat);
              setPage(1);
              setSidebarOpen(false);
            }}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            availability={availability}
            onAvailabilityChange={(type, checked) => {
              setAvailability(prev => ({ ...prev, [type]: checked }));
            }}
            allProducts={allProducts}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-4 bg-black rounded-full"></div>
                <p className="text-sm text-gray-600">
                  There are <span className="font-semibold text-black">{filteredProducts.length}</span> products in result
                </p>
              </div>
              <div className="w-full sm:w-64">
                <SearchBar value={search} onChange={handleSearch} />
              </div>
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
                  <p className="text-black font-medium">Loading products...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                    ))}
                  </div>

                  {paginatedProducts.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-1">No products found</h3>
                      <p className="text-gray-600 text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <Pagination
              currentPage={page}
              totalPages={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
              onPageChange={setPage}
              total={filteredProducts.length}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
