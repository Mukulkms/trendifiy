/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from "react";
import { ArrowUp, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: "Customer Care",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Call Now: 8979364897", href: "#" },
        { name: "Track Your Order", href: "#" },
      ],
    },
    {
      title: "Our Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Terms of Use", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Conditions of Sale", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal Area",
      links: [
        { name: "Credits", href: "#" },
        { name: "Accessibility Statement", href: "#" },
        // { name: "California Privacy Rights", href: "#" },
        { name: "Do Not Sell or Share My Personal Information", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Men", href: "/men" },
        { name: "Women", href: "/women" },
        { name: "Kids", href: "/kids" },
        { name: "Accessories", href: "/accessories" },
        { name: "Heavyduty", href: "#" },
        { name: "Sneakers", href: "#" },
        { name: "Customization", href: "#" },
        { name: "New Arrival", href: "/new-arrival" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "ri-instagram-line", href: "#" },
    { icon: "ri-facebook-fill", href: "#" },
    { icon: "ri-twitter-x-line", href: "#" },
    { icon: "ri-youtube-fill", href: "#" },
    { icon: "ri-pinterest-line", href: "#" },
  ];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200 text-sm mt-auto">
      {/* Primary Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-semibold text-gray-800 uppercase mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-indigo-700 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Connect & Account Section */}
        <div>
          <h4 className="font-semibold text-gray-800 uppercase mb-4">Connect</h4>
          <div className="flex space-x-4 text-lg text-gray-500 mb-4">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} className="hover:text-indigo-700 transition-colors">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
          <div className="flex gap-2 items-center cursor-pointer hover:text-indigo-700 transition-colors">
            <UserCircle className="w-5 h-5 text-gray-500" />
            <Link to="/login" className="text-sm text-gray-800 hover:text-indigo-700">
              Login / Register
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Footer Bar with Black */}
      <div className="bg-black border-t border-gray-800 py-4 text-center text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">&copy; 2025 TRENDIFY - All Rights Reserved</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-700 transition-colors">Download App</a>
            <span className="hidden md:inline text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-700 transition-colors">Offers</a>
            <span className="hidden md:inline text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-700 transition-colors">Contact Us</a>
            <span className="hidden md:inline text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-700 transition-colors">Track Orders</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button with Black */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full shadow hover:bg-gray-800 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;