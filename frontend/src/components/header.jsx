import { Search, Heart, ShoppingBag, Menu,UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './modals/loginmodal';


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // modal state

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
      <div className="flex items-center justify-between mr-4  border-b">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-2 md:gap-8">
          <div className="text-xl md:text-2xl font-bold p-5 bg-indigo-100 tracking-wide text-black">
           <Link to="/">TRENDIFY<sup>®</sup></Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-5 md:gap-8 text-sm font-semibold">
            <Link to="/men" className="hover:text-red-600 transition">MEN</Link>
            <Link to="/women" className="hover:text-red-600 transition">WOMEN</Link>
            <Link to="/accessories" className="hover:text-red-600 transition">ACCESSORIES</Link>
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
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Products"
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-48 md:w-64 bg-gray-100 focus:outline-slate-700-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
          </div>
          <div className="flex gap-1 cursor-pointer hover:text-red-600 transition">
          <UserCircle className="w-5 h-5 "/>
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-sm"
            >
            Login
          </button>
            </div>
          <Heart className="w-5 h-5 cursor-pointer hover:text-red-600 transition" />
          <Link to="/cart">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-red-600 transition" />
          </Link>
        </div>
      </div>

      {/* Mobile Search + Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-b animate-slide-down">
          {/* Mobile Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by Products"
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-full bg-gray-100"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
          </div>

          {/* Mobile Nav */}
          <nav className="flex flex-col gap-2 text-sm font-semibold">
            {[
              { label: "MEN", to: "/men" },
              { label: "WOMEN", to: "/women" },
              { label: "ACCESSORIES", to: "/accessories" },
              { label: "PLUSSIZE", to: "/plussize" },
              { label: "HEAVYDUTY", to: "/heavyduty" },
              { label: "SNEAKERS", to: "/sneakers" },
              { label: "CUSTOMIZATION", to: "/customization" },
              { label: "NEW ARRIVAL", to: "/new-arrivals" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-red-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLoginModal(true);
              }}
              className="text-left hover:text-red-600 transition"
            >
              Login
            </button>
          </nav>
        </div>
      )}

      {/* Sub Navigation - Desktop Only */}
      <div className="hidden md:flex bg-slate-600 text-white text-center py-2 px-5">
        <nav className="flex justify-center gap-6 text-sm font-semibold w-full">
          {[
            "MEN",
            "WOMEN",
            "PLUSSIZE",
            "ACCESSORIES",
            "HEAVYDUTY",
            "SNEAKERS",
            "CUSTOMIZATION",
            "NEW ARRIVAL"
          ].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase().replace(" ", "-")}`}
              className="hover:text-indigo-200 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
