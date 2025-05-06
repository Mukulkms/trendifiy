import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      try {
        return savedWishlist ? JSON.parse(savedWishlist) : [];
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const moveToCart = (item) => {
    console.log('Item moved to cart:', item);
    removeFromWishlist(item.id);
  };

  const handleShopNowClick = () => {
    navigate('/');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
        <div className="text-center">
          <div className="flex items-center justify-center w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full">
            <FontAwesomeIcon icon={faHeart} size="4x" className="text-red-500" />
          </div>
          <p className="text-gray-600 text-lg mb-4">Hey! Your wishlist is empty.</p>
          <p className="text-gray-500 text-sm mb-6">
            Save items in your wishlist. Review and easily move them to your bag.
          </p>
          <button
            className="bg-slate-800 hover:bg-black text-white font-semibold px-6 py-3 rounded-md"
            onClick={handleShopNowClick}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Wishlist ({wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md relative group flex flex-col items-center max-w-[220px] rounded-lg"
            >
              {/* Product Image */}
              <div className="relative w-full h-[250px] flex justify-center items-center mb-4"> {/* Reduced height */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-full h-full " 
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </div>

              {/* Product Details */}
              <div className="w-full px-4 pb-4">
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center mb-2">
                  <span className="text-xl font-semibold text-gray-800 mr-2">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through mr-2">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-green-500 text-sm">
                    {item.discount}% Off
                  </span>
                </div>
                {item.size && <p className="text-gray-500 text-sm mb-4">Size: {item.size}</p>}

                {/* Move to Cart Button */}
                <div className="flex gap-2 mt-2">
                  <button
                    className="w-full bg-slate-700 hover:bg-slate-950 text-white font-semibold py-2 px-3 rounded-md text-sm"
                    onClick={() => moveToCart(item)}
                    aria-label={`Move ${item.name} to cart`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
