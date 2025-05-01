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
    trending: [],
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

    if (selectedFilters.gender.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters.gender.includes(p.gender)
      );
    }

    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes?.some(size => selectedFilters.size.includes(size))
      );
    }

    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters.color.includes(p.color)
      );
    }

    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters.brands.includes(p.brand)
      );
    }

    // Optional: handle trending and launchDate filters here if your data supports it

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
