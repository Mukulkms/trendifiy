/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from "react";
import { ArrowUp } from "lucide-react";
import { UserCircle } from "lucide-react";
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
        { name: "Accessories", href: "#" },
        { name: "Heavyduty", href: "#" },
        { name: "Sneakers", href: "#" },
        { name: "Customization", href: "#" },
        { name: "New Arrival", href: "#" },
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
    <footer className="bg-white text-gray-700 border-t border-gray-200 text-sm mt-auto">
      {/* Red Bottom Bar */}
      <div className="bg-[#b11116] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-center items-center gap-y-2">
          <div className="text-center text-2xl">&copy; 2025 TRENDIFY</div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-semibold uppercase mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social + Account Section */}
        <div>
          <h4 className="font-semibold uppercase mb-3">Connect</h4>
          <div className="flex space-x-4 text-xl mb-4">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href}>
                <i className={social.icon}></i>
              </a>
            ))}
          </div>

          <div className="flex gap-1 cursor-pointer hover:text-red-600 transition">
            <UserCircle className="w-5 h-5 " />
            <Link to="/login" className="text-sm"> {/* Changed to Link */}
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-black text-white text-xs text-center py-2">
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:underline">
            Download App
          </a>
          <a href="#" className="hover:underline">
            Offers
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:underline">
            Track Orders
          </a>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-black text-white p-2 rounded-full shadow hover:bg-gray-800"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
      
    </footer>
  );
};

export default Footer;
