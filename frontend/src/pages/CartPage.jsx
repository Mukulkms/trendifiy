import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Trash2, CheckCircle, MapPin, Gift } from "lucide-react";

const CartPage = () => {
  const location = useLocation();
  
  // Initializing cartItems with localStorage value (on initial load)
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : []; // Fallback to an empty array
  });
  
  const [coupon, setCoupon] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");

  // Persist cartItems to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update cart items when a new item is passed via route (only if the user manually adds it)
  useEffect(() => {
    const newProduct = location.state;

    if (newProduct) {
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          item => item.productId === newProduct.productId && item.size === newProduct.size
        );

        if (existingIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex].quantity += newProduct.quantity;
          return updatedItems;
        } else {
          return [...prevItems, newProduct];
        }
      });
    }
  }, [location.state]); // Only run when location.state changes

  // Remove item from cart
  const removeFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => {
      const itemPrice = item.price || item.originalPrice || 0;
      return total + itemPrice * item.quantity;
    }, 0);

  const calculateDiscount = () =>
    cartItems.reduce((total, item) => {
      const originalPrice = item.originalPrice || 0;
      const price = item.price || 0;
      return total + (originalPrice - price) * item.quantity;
    }, 0);

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    let total = subtotal - discount;
    if (coupon === "DISCOUNT10") total *= 0.9;
    return total;
  };

  const handlePinCodeChange = (e) => setPinCode(e.target.value);
  const handleCheckPinCode = () => {
    if (pinCode.length === 6) {
      setDeliveryEstimate("Expected Delivery: 5-7 Business Days");
    } else {
      setDeliveryEstimate("Invalid Pincode");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://m.media-amazon.com/images/G/31/নে/events/2023/Jupiter/PC/Empty_State_Bag.png"
            alt="Empty Cart"
            className="w-64 h-auto mx-auto mb-4"
          />
          <p className="text-gray-600">Hey, your bag feels so light!</p>
          <p className="text-gray-600 mb-4">Let's add some items to your bag.</p>
          <button
            onClick={() => {}} // Your shopping logic here
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-6 rounded-md"
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-40 h-auto md:h-40 object-cover mb-4 md:mb-0 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-bold text-md">
                      ₹{(item.price || item.originalPrice || 0) * item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Price Summary</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-500">-₹{calculateDiscount()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{calculateTotalPrice()}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-semibold mb-2 flex items-center gap-2 text-gray-900">
                  <MapPin className="text-blue-500 h-4 w-4" />
                  Delivery Estimate
                </h4>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pinCode}
                    onChange={handlePinCodeChange}
                    className="w-full border rounded-md py-2 px-3"
                    maxLength={6}
                  />
                  <button
                    onClick={handleCheckPinCode}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  >
                    Check
                  </button>
                </div>
                {deliveryEstimate && <p className="text-gray-600 text-sm">{deliveryEstimate}</p>}
              </div>

              <div className="mt-6">
                <h4 className="text-md font-semibold mb-2 flex items-center gap-2 text-gray-900">
                  <Gift className="text-purple-500 h-4 w-4" />
                  Coupons & Offers
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Apply Coupon/Gift Card"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                  />
                  <button
                    onClick={() => {}}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md"
                onClick={() => {}}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center text-gray-600 text-sm flex items-center justify-center gap-1.5">
                <CheckCircle className="text-green-500 h-4 w-4 inline-block" />
                100% Secure Payment
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
