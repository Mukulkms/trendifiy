import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCalendarAlt,
  faBolt,
  faRulerHorizontal,
  faFilter,
  faTag,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const NewArrivalsFilter = ({ selectedFilters, setSelectedFilters }) => {
  const [openFilters, setOpenFilters] = useState({});
  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('none');

  useEffect(() => {
    const updateMaxHeight = () => {
      if (containerRef.current) {
        const parentHeight = containerRef.current.parentElement?.offsetHeight || window.innerHeight;
        const calculatedMaxHeight = parentHeight - 120;
        setMaxHeight(calculatedMaxHeight > 0 ? `${calculatedMaxHeight}px` : 'none');
      } else {
        setMaxHeight('none');
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  const filterData = [
    {
      name: "launchDate",
      title: "Launch Date",
      icon: <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />,
      options: [
        { label: "Last 7 Days", value: "last7" },
        { label: "Last 14 Days", value: "last14" },
        { label: "Last 30 Days", value: "last30" },
      ],
    },
    {
      name: "discount",
      title: "Discount",
      icon: <FontAwesomeIcon icon={faBolt} className="mr-2 text-yellow-500" />,
      options: [
        { label: "10% or more", value: "10% or more" },
        { label: "20% or more", value: "20% or more" },
        { label: "30% or more", value: "30% or more" },
        { label: "50% or more", value: "50% or more" },
      ],
    },
    {
      name: "size",
      title: "Size",
      icon: <FontAwesomeIcon icon={faRulerHorizontal} className="mr-2 text-gray-500" />,
      options: [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "2-3Y", value: "2-3Y" },
        { label: "4-5Y", value: "4-5Y" },
        { label: "6-7Y", value: "6-7Y" },
      ],
    },
    {
      name: "brands",
      title: "Brands",
      icon: <FontAwesomeIcon icon={faTag} className="mr-2 text-gray-500" />,
      options: [
        { label: "Zudio", value: "Zudio" },
        { label: "Rare Rabbit", value: "Rare Rabbit" },
        { label: "Colors", value: "Colors" },
        { label: "DNMX Kids", value: "DNMX Kids" },
        { label: "Zara", value: "Zara" },
        { label: "H&M", value: "H&M" },
        { label: "Levis", value: "Levis" },
      ],
    },
    // Example of adding gender filter
    {
      name: "gender",
      title: "Gender",
      icon: <FontAwesomeIcon icon={faTag} className="mr-2 text-gray-500" />,
      options: [
        { label: "Men", value: "men" },
        { label: "Female", value: "women" },
        { label: "Boys", value: "boys" },
        { label: "Girls", value: "girls"}
      ],
    },
  ];

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
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

  const handleReset = () => {
    setSelectedFilters({
      launchDate: [],
      discount: [],
      size: [],
      brands: [],
      gender: [],
      color: [],
      trending: [],
    });
  };

  const isChecked = (filterName, value) => {
    return selectedFilters[filterName]?.includes(value) || false;
  };

  const hasActiveFilters = Object.values(selectedFilters || {}).some(arr => arr?.length > 0);

  return (
    <div
      ref={containerRef}
      className="bg-white p-4 w-full sm:w-64 top-20 overflow-y-auto rounded-md shadow"
      style={{ maxHeight: maxHeight }}
    >
      <div className="text-md font-semibold mb-4 flex items-center justify-between">
       <p className="flex items-center">  
        <FontAwesomeIcon icon={faFilter} className="w-6 h-6 mr-2 text-gray-700" />
        Filters 

       </p>
  
      
      {hasActiveFilters && (
        <button
        onClick={handleReset}
        className="  bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded transition"
        >
         <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      </div>

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
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFilters[filter.name] ? "-rotate-180" : ""}`}
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
                      checked={isChecked(filter.name, option.value)}
                      onChange={() => handleChange(filter.name, option.value)}
                    />
                    <span className="text-sm flex items-center">
                      {option.color && (
                        <span className={`inline-block w-4 h-4 rounded-full mr-2 ${option.color}`}></span>
                      )}
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

export default NewArrivalsFilter;
