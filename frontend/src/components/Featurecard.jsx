import React from "react";
import { FiGlobe } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { FaGift } from "react-icons/fa";

const Featurecard = () => {
  return (
    <>
      <div className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Feature Card */}
          {[
            {
              title: "Worldwide Shipping",
              desc: "World-Wide Free Shipping.",
              icon: <FiGlobe className="w-12 h-12 bg-gray-200 rounded-full" />, // Replace with your actual icon
            },
            {
              title: "Secured Payment",
              desc: "Safe & Secured Payments.",
              icon: <BiWallet className="w-10 h-10 text-gray-700" />,
            },
            {
              title: "30-Days Free Returns",
              desc: "Within 30 Days for an Exchange.",
              icon: <GiReturnArrow className="w-10 h-10 text-gray-700" />,
            },
            {
              title: "Surprise Gift",
              desc: "Free gift cards & vouchers.",
              icon: <FaGift className="w-10 h-10 text-gray-700" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center border border-gray-200 rounded-lg p-6" // Added border classes
            >
              <div className="rounded-full border border-gray-300 p-4 mb-3">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Featurecard;