import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTag, faStar, faPalette, faRulerHorizontal, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons'; // Assuming solid style for shop
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'; // For price

const ProductFilter = ({ selectedFilters, setSelectedFilters }) => {
  const [openFilters, setOpenFilters] = useState({});

  const filterData = [
    {
      name: "category",
      title: "Category",
      icon: <FontAwesomeIcon icon={faFilter} className="mr-2 text-gray-500" />,
      options: [
        { label: "T-Shirt", value: "T-Shirt" },
        { label: "Shirt", value: "Shirt" },
        { label: "Hoodie", value: "Hoodie" },
        { label: "Jackets", value: "Jackets" },
        { label: "Joggers", value: "Joggers" },
      ],
    },
    {
      name: "size",
      title: "Size",
      icon: <FontAwesomeIcon icon={faRulerHorizontal} className="mr-2 text-gray-500" />,
      options: [
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
      ],
    },
    {
      name: "color",
      title: "Color",
      icon: <FontAwesomeIcon icon={faPalette} className="mr-2 text-gray-500" />,
      options: [
        { label: "Red", value: "red", color: "bg-red-500" },
        { label: "Blue", value: "blue", color: "bg-blue-500" },
        { label: "Black", value: "black", color: "bg-black" },
        { label: "White", value: "white", color: "bg-white border border-gray-300" },
      ],
    },
    {
      name: "price",
      title: "Price",
      icon: <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-2 text-gray-500" />,
      options: [
        { label: "Under ₹500", value: "Under ₹500" },
        { label: "₹500 - ₹1000", value: "₹500 - ₹1000" },
        { label: "₹1000 - ₹2000", value: "₹1000 - ₹2000" },
        { label: "Above ₹2000", value: "Above ₹2000" },
      ],
    },
    {
      name: "brands",
      title: "Brands",
      icon: <FontAwesomeIcon icon={faShop} className="mr-2 text-gray-500" />,
      options: [
        { label: "UrbanEdge", value: "UrbanEdge" },
        { label: "DenimFlex", value: "DenimFlex" },
        { label: "ChillWear", value: "ChillWear" },
        { label: "CottonCrew", value: "CottonCrew" },
        { label: "Nike", value: "Nike" },
        { label: "Reebok", value: "Reebok" },
        { label: "Puma", value: "Puma" },
      ],
    },
    {
      name: "ratings",
      title: "Ratings",
      icon: <FontAwesomeIcon icon={faStar} className="mr-2 text-gray-500" />,
      options: [
        { label: "★★★★★", value: 5 },
        { label: "★★★★☆", value: 4 },
        { label: "★★★☆☆", value: 3 },
        { label: "★★☆☆☆", value: 2 },
        { label: "★☆☆☆☆", value: 1 },
      ],
    },
    {
      name: "discount",
      title: "Discount",
      icon: <FontAwesomeIcon icon={faTag} className="mr-2 text-gray-500" />,
      options: [
        { label: "10% or more", value: "10% or more" },
        { label: "20% or more", value: "20% or more" },
        { label: "30% or more", value: "30% or more" },
        { label: "50% or more", value: "50% or more" },
      ],
    },
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
    <div className="bg-white p-4 w-full sm:w-64 top-20 overflow-y-auto max-h-screen rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={faFilter} className="w-6 h-6 mr-2 text-gray-700" />
        Filters
      </h2>

      <div className="space-y-3">
        {filterData.map((filter) => (
          <div key={filter.name} className="border-b border-gray-200 pb-3">
            <button
              type="button"
              className="w-full text-left py-2 focus:outline-none"
              onClick={() => toggleFilter(filter.name)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">{filter.icon} {filter.title}</h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFilters[filter.name] ? "-rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            {openFilters[filter.name] && (
              <div className="mt-2 pl-2">
                {filter.options.map((option) => (
                  <label key={`${filter.name}-${option.value}`} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={selectedFilters[filter.name]?.includes(option.value) || false}
                      onChange={() => handleChange(filter.name, option.value)}
                    />
                    <span className="text-sm flex items-center">
                      {option.color && <span className={`inline-block w-4 h-4 rounded-full mr-2 ${option.color}`}></span>}
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;