import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the product is already in the wishlist when the component mounts
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = wishlist.some(item => item.id === product._id);
    setIsInWishlist(isProductInWishlist);
  }, [product._id]);

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount) + "% off";
    }
    return null;
  };

  const handleAddToWishlist = () => {
    let existing = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existing.find(item => item.id === product._id);
    if (alreadyExists) {
      // Remove product from wishlist if it's already there
      existing = existing.filter(item => item.id !== product._id);
      localStorage.setItem("wishlist", JSON.stringify(existing));
      setIsInWishlist(false); // Update the icon
    } else {
      // Add product to wishlist if it's not already there
      const productToSave = {
        id: product._id,
        name: product.name,
        description: product.description || product.brand || '',
        price: product.price,
        originalPrice: product.originalPrice,
        discount: calculateDiscount()?.replace('% off', '') || 0,
        imageUrl: product.image,
        size: product.sizes && product.sizes[0], // default to first size if exists
        tags: [product.category, product.fit, product.fabric].filter(Boolean)
      };

      existing = [...existing, productToSave];
      localStorage.setItem("wishlist", JSON.stringify(existing));
      setIsInWishlist(true); // Update the icon
    }
  };

  return (
    <div className="bg-white shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="w-full h-84 overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          {isInWishlist ? (
            <AiFillHeart className="w-6 h-6 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-6 h-6" />
          )}
        </button>

        {product.category && (
          <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-md p-1 text-xs font-semibold">
            {product.category}
          </div>
        )}
        {calculateDiscount() && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white rounded-md px-2 py-1 text-xs font-semibold">
            {calculateDiscount()}
          </div>
        )}
        {product.rating && (
          <div className="absolute bottom-2 right-2 bg-yellow-500 text-white rounded-md px-2 py-1 text-xs font-semibold flex items-center">
            <FaStar className="mr-1" size={12} /> {product.rating}
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">{product.name}</h3>
          <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </Link>

        {product.fit && (
          <div className="mt-2">
            <span className="inline-block bg-gray-300 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
              {product.fit.toUpperCase()} FIT
            </span>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-gray-600">Sizes:</span>
            <div className="flex items-center flex-wrap mt-1">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-1"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.fabric === "thick_premium" && (
          <div className="mt-2">
            <span className="inline-block bg-gray-300 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
              THICK PREMIUM FABRIC
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
