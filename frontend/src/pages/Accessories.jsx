import React, { useState, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import ProductFilter from "../components/filters/accessoriesfilter";  
import ProductCard from "../components/ProductCard";
import { menAccessories, womenAccessories } from "../Dummydata/AccessoriesData"; // Dummy data for accessories

const Accessories = () => {
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
    gender: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?category=accessories");
        if (!res.ok) throw new Error("Failed to fetch from API");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn("Using dummy data for accessories:", err.message);
        setProducts([...menAccessories, ...womenAccessories]); // Fallback to dummy data
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    const { gender, category, color, price, brands, ratings, discount } = selectedFilters;

    if (gender.length > 0) {
      filtered = filtered.filter((p) => gender.includes(p.gender));
    }
    if (category.length > 0) {
      filtered = filtered.filter((p) => category.includes(p.category));
    }
    // if (size.length > 0) {
    //   filtered = filtered.filter((p) => p.sizes?.some((s) => size.includes(s)));
    // }
    if (color.length > 0) {
      filtered = filtered.filter((p) => color.includes(p.color));
    }
    if (price.length > 0) {
      filtered = filtered.filter((p) =>
        price.some((range) => {
          const productPrice = p.price;
          if (range === "Under ₹500") return productPrice < 500;
          if (range === "₹500 - ₹1000") return productPrice >= 500 && productPrice <= 1000;
          if (range === "₹1000 - ₹2000") return productPrice > 1000 && productPrice <= 2000;
          if (range === "Above ₹2000") return productPrice > 2000;
          return true;
        })
      );
    }
    if (brands.length > 0) {
      filtered = filtered.filter((p) => brands.includes(p.brand));
    }
    if (ratings.length > 0) {
      filtered = filtered.filter((p) => ratings.some((r) => p.rating >= r));
    }
    if (discount.length > 0) {
      filtered = filtered.filter((p) => discount.some((range) => {
        const productDiscount = p.discount || 0;
        if (range === "10% or more") return productDiscount >= 10;
        if (range === "20% or more") return productDiscount >= 20;
        if (range === "30% or more") return productDiscount >= 30;
        if (range === "50% or more") return productDiscount >= 50;
        return true;
      }));
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 h-[calc(100vh-80px)]">
      <div className="lg:hidden flex justify-end mb-4">
        <button onClick={toggleSidebar} className="text-xl text-gray-700 p-2 bg-gray-200 rounded-md">
          {isSidebarOpen ? <FiX /> : <FiFilter />}
        </button>
      </div>

      <div className={`w-full lg:w-1/5 border-r-2 h-full self-start transition-all duration-300 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
        <ProductFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} gender="accessories" />
      </div>

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

export default Accessories;
