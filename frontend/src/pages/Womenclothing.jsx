import React, { useState, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import ProductFilter from "../components/filters/ProductFilter";
import ProductCard from "../components/ProductCard";
import dummyProducts from "../Dummydata/Products"; // Update to women-specific dummy data if needed

const WomenClothing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    size: [],
    color: [],
    price: [],
    brands: [],
    ratings: [],
    discount: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Update API endpoint to fetch women's clothing
        const res = await fetch("/api/products?category=women");
        if (!res.ok) throw new Error("Failed to fetch from API");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn("Using dummy data due to fetch error:", err.message);
        // Use women-specific dummy data
        setProducts(dummyProducts.filter((p) => p.gender === "women")); // Adjust based on your data structure
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((p) => p.gender === "women");

    if (selectedFilters.category.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.category.includes(p.category)
      );
    }

    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedFilters.size.includes(size))
      );
    }

    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.color.includes(p.color)
      );
    }

    if (selectedFilters.price.length > 0) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        return selectedFilters.price.some((range) => {
          if (range === "Under ₹500") return price < 500;
          if (range === "₹500 - ₹1000") return price >= 500 && price <= 1000;
          if (range === "₹1000 - ₹2000") return price > 1000 && price <= 2000;
          if (range === "Above ₹2000") return price > 2000;
          return true;
        });
      });
    }

    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.brands.includes(p.brand)
      );
    }

    if (selectedFilters.ratings.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.ratings.some((rating) => p.rating >= rating)
      );
    }

    if (selectedFilters.discount.length > 0) {
      filtered = filtered.filter((p) => {
        const discount = p.discount || 0;
        return selectedFilters.discount.some((range) => {
          if (range === "10% or more") return discount >= 10;
          if (range === "20% or more") return discount >= 20;
          if (range === "30% or more") return discount >= 30;
          if (range === "50% or more") return discount >= 50;
          return true;
        });
      });
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 h-[calc(100vh-80px)]">
      {/* Toggle Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-700 p-2 bg-gray-200 rounded-md"
        >
          {isSidebarOpen ? <FiX /> : <FiFilter />}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`w-full lg:w-1/5 border-r-2 h-full self-start transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <ProductFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          gender="women" // Pass gender prop to customize filters
        />
      </div>

     {/* Product Grid Scrollable */}
     <div className="w-full lg:w-4/5 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default WomenClothing;