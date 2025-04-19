// components/header.js
import { Search, Heart, ShoppingBag, Menu, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full font-sans">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center bg-black px-4 text-xs text-white">
        <div className="flex gap-4 py-1">
          <span>Download App</span>
          <span>Offers</span>
        </div>
        <div className="flex gap-4 py-1">
          <span>Contact us</span>
          <span>Track orders</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between h-16 border-b px-4 md:px-6"> {/* Increased height and padding */}
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-2 md:gap-6"> {/* Reduced gap */}
          <div className="text-xl md:text-2xl font-bold  bg-white tracking-wide text-black"> {/* Reduced padding */}
            <Link to="/">Trendify<sup>®</sup></Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 text-sm font-semibold"> {/* Reduced gap */}
            <Link to="/men" className="text-indigo-500  hover:text-indigo-800">MEN</Link>
            <Link to="/women" className="text-indigo-500 hover:text-indigo-800">WOMEN</Link>
            <Link to="/Kids" className="text-indigo-500 hover:text-indigo-800">KIDS</Link>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <X className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
          )}
        </div>

        {/* Search + Icons */}
        <div className="hidden md:flex items-center gap-3"> 
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Products"
              className="pl-8 pr-2 py-1 border rounded-md text-sm w-40 md:w-56 focus:outline-slate-700"
            />
            <Search className="absolute left-2 top-1.5 text-gray-500 w-4 h-4" />
          </div>
          <div className="flex gap-1 cursor-pointer hover:text-indigo-500 transition">
            <UserCircle className="w-6 h-6" />
            <Link to="/login" className="text-md">
              Login
            </Link>
          </div>
          <Heart className="w-6 h-6 cursor-pointer hover:text-indigo-500 transition" /> {/* Reduced icon size */}
          <Link to="/cart">
            <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-indigo-500 transition" /> {/* Reduced icon size */}
          </Link>
        </div>
      </div>

      {/* Mobile Search + Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-b animate-slide-down">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search by Products"
              className="pl-8 pr-2 py-1 border rounded-md text-sm w-full bg-gray-100" 
            />
            <Search className="absolute left-2 top-1.5 text-gray-500 w-4 h-4" />
          </div>

          {/* Mobile Nav */}
          <nav className="flex flex-col gap-1 text-sm font-semibold"> 
            {[
              { label: "Men", to: "/men" },
              { label: "Women", to: "/women" },
              { label: "Kids", to: "/Kids" },
              { label: "Accessories", to: "/accessories" },
              { label: "Heavy duty", to: "/heavyduty" },
              { label: "sneakers", to: "/sneakers" },
              { label: "New arrival", to: "/new-arrivals" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-indigo-500 py-1" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-left hover:text-indigo-500 py-1" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}

      {/* Sub Navigation - Desktop Only */}
      <div className="hidden md:flex bg-slate-900 text-white text-center p-5 border-b"> {/* Changed background and text color, reduced padding, added bottom border */}
        <nav className="flex justify-center gap-8 text-md font-semibold w-full"> {/* Reduced gap */}
          {[
            "Men",
            "Women",
            "Kids",
            "Accessories",
            "Heavy duty",
            "Sneakers",
            "New Arrival"
          ].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase().replace(" ", "-")}`}
              className=" hover:text-gray-400 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}