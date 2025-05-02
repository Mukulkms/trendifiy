import React, { useState, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import NewArrivalsFilter from "../components/filters/NewArrivalsFilter";
import ProductCard from "../components/ProductCard";
import newArrivalsDummyData from "../Dummydata/newArrivals"; // Fallback dummy data

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    launchDate: [],
    discount: [],
    size: [],
    color: [],
    brands: [],
    gender: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?category=new");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn("Using dummy data for new arrivals:", err.message);
        setProducts(newArrivalsDummyData);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Gender filter
    if (selectedFilters.gender.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.gender.includes(p.gender)
      );
    }

    // Size filter
    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes?.some((size) => selectedFilters.size.includes(size))
      );
    }

    // Color filter
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.color.includes(p.color)
      );
    }

    // Brands filter
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.brands.includes(p.brand)
      );
    }

    // Discount filter
    if (selectedFilters.discount.length > 0) {
      const getDiscountThreshold = (label) => parseInt(label); // e.g., "30% or more" → 30
      const minDiscounts = selectedFilters.discount.map(getDiscountThreshold);
      const maxRequired = Math.min(...minDiscounts); // show products with >= any selected discount
      filtered = filtered.filter(
        (p) => parseInt(p.discount || 0) >= maxRequired
      );
    }

    // Launch Date filter (if supported by product model)
    if (selectedFilters.launchDate.length > 0) {
      const now = new Date();
      filtered = filtered.filter((p) => {
        const launch = new Date(p.launchDate);
        return selectedFilters.launchDate.some((range) => {
          const diff = (now - launch) / (1000 * 60 * 60 * 24); // days difference
          if (range === "last7") return diff <= 7;
          if (range === "last14") return diff <= 14;
          if (range === "last30") return diff <= 30;
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        className={`w-full lg:w-1/5 border-r-2 h-full transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <NewArrivalsFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      {/* Product Grid */}
      <div className="w-full lg:w-4/5 overflow-y-auto pr-2">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found with selected filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
