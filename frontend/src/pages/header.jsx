import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center bg-gray-100 px-4 text-xs text-black">
        <div className="flex gap-4 py-1">
          <span>Download App</span>
          <span>Offers</span>
        </div>
        <div className="flex gap-4 py-1">
          <span>Contact us</span>
          <span>Track orders</span>
        </div>
      </div>

      {/* Free Shipping Banner */}
      <div className="bg-black text-white text-sm text-center py-1">
        Free Shipping Sitewide on <strong>Every Order</strong>, Don’t Miss Out!!
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-6 md:gap-12">
          <div className="text-xl md:text-2xl font-bold tracking-wide">
            TRENDIFY<sup>®</sup>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 md:gap-8 text-sm font-semibold">
            <a href="#">MEN</a>
            <a href="#">WOMEN</a>
            <a href="#">ACCESSORIES</a>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>

        {/* Search + Icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Products"
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-48 md:w-64 bg-gray-100"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
          </div>
          <span className="text-sm">Login</span>
          <Heart className="w-5 h-5 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Search + Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-b">
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
            <a href="#">MEN</a>
            <a href="#">WOMEN</a>
            <a href="#">ACCESSORIES</a>
            <a href="#">PLUSSIZE</a>
            <a href="#">HEAVYDUTY</a>
            <a href="#">SNEAKERS</a>
            <a href="#">CUSTOMIZATION</a>
            <a href="#">NEW ARRIVAL</a>
            <a href="#">Login</a>
          </nav>
        </div>
      )}

      {/* Sub Navigation - Desktop Only */}
      <div className="hidden md:flex bg-indigo-100 text-center py-2">
        <nav className="flex justify-center gap-6 text-sm font-semibold">
          <a href="#">MEN</a>
          <a href="#">WOMEN</a>
          <a href="#">PLUSSIZE</a>
          <a href="#">ACCESSORIES</a>
          <a href="#">HEAVYDUTY</a>
          <a href="#">SNEAKERS</a>
          <a href="#">CUSTOMIZATION</a>
          <a href="#">NEW ARRIVAL</a>
        </nav>
      </div>
    </div>
  );
}