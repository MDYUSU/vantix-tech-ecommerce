import React, { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
// Import a "Not Found" icon from Lucide (optional, but looks great)
import { SearchX } from "lucide-react"; 

const ProductList = () => {
  const { products } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Function to reset all filters easily
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8 min-h-screen">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <h2 className="text-2xl font-extrabold mx-auto px-4 md:px-4 pt-4 text-white">
          {/* Updated to show filterProducts length */}
          Featured Gear ({filterProducts.length} Items)
        </h2>

        {/* Feature 2: Conditional Rendering Logic */}
        {filterProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center">
            {filterProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-900 p-6 rounded-full mb-6 border border-gray-800 shadow-xl">
               <SearchX className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">No gear matches your search</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any products for "{searchTerm}". Try a different keyword or change categories.
            </p>
            <button 
              onClick={resetFilters}
              className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-900/20 uppercase tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;