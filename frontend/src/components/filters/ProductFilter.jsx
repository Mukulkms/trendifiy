import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ProductFilter = ({ selectedFilters, setSelectedFilters }) => {
  const [openFilters, setOpenFilters] = useState({});

  const categories = ["T-Shirt", "Shirt", "Hoodie", "Jackets", "Joggers"];
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["red", "blue", "black", "white"];
  const priceRanges = [
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "Above ₹2000",
  ];
  const brandsList = [
    "UrbanEdge",
    "DenimFlex",
    "ChillWear",
    "CottonCrew",
    "Nike",
    "Reebok",
    "Puma",
  ];
  const ratingsList = [1, 2, 3, 4, 5];
  const discountRanges = [
    "10% or more",
    "20% or more",
    "30% or more",
    "50% or more",
  ];

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleChange = (type, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (updated[type]?.includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type] = [...(updated[type] || []), value];
      }
      return updated;
    });
  };

  return (
    <div className="bg-white p-4 w-full sm:w-64 top-20 overflow-y-auto max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="space-y-2">
        {/* Category */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("category")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Category</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.category ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.category && (
            <div className="mt-2 pl-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.category?.includes(cat) || false}
                    onChange={() => handleChange("category", cat)}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Size */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("size")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Size</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.size ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.size && (
            <div className="mt-2 pl-2">
              {sizes.map((size) => (
                <label key={size} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.size?.includes(size) || false}
                    onChange={() => handleChange("size", size)}
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("color")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Color</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.color ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.color && (
            <div className="mt-2 pl-2">
              {colors.map((color) => (
                <label key={color} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.color?.includes(color) || false}
                    onChange={() => handleChange("color", color)}
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("price")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Price</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.price ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.price && (
            <div className="mt-2 pl-2">
              {priceRanges.map((price) => (
                <label key={price} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.price?.includes(price) || false}
                    onChange={() => handleChange("price", price)}
                  />
                  <span className="text-sm">{price}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("brands")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Brands</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.brands ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.brands && (
            <div className="mt-2 pl-2">
              {brandsList.map((brand) => (
                <label key={brand} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.brands?.includes(brand) || false}
                    onChange={() => handleChange("brands", brand)}
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ratings */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("ratings")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Ratings</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.ratings ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.ratings && (
            <div className="mt-2 pl-2">
              {ratingsList.map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2 mb-1"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.ratings?.includes(rating) || false}
                    onChange={() => handleChange("ratings", rating)}
                  />
                  <span className="text-sm">
                    {Array.from({ length: rating }, (_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - rating }, (_, i) => (
                      <span key={i} className="text-gray-300">
                        ★
                      </span>
                    ))}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Discount */}
        <div>
          <button
            type="button"
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFilter("discount")}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Discount</h3>
              <FaChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openFilters.discount ? "-rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {openFilters.discount && (
            <div className="mt-2 pl-2">
              {discountRanges.map((discount) => (
                <label
                  key={discount}
                  className="flex items-center space-x-2 mb-1"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters.discount?.includes(discount) || false}
                    onChange={() => handleChange("discount", discount)}
                  />
                  <span className="text-sm">{discount}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
