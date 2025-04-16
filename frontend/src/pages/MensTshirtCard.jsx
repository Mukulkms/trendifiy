import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import menstshirt1 from '../assets/images/alex-haigh-fEt6Wd4t4j0-unsplash.jpg';
import menstshirt2 from '../assets/images/alexander-london-KL8EGoKDNcQ-unsplash.jpg';
import menstshirt3 from '../assets/images/mehrab-zahedbeigi-IeUiAuDK0XY-unsplash.jpg';
import menstshirt4 from '../assets/images/jusdevoyage-nvZ4NubOIZE-unsplash.jpg';

// ✅ Sample Data
const mensTshirts = [
  {
    id: 1,
    name: 'Harry Potter: Magic',
    category: 'Holiday Shirts',
    price: 1499,
    imageSrc: menstshirt1,
    checkoutUrl: '/checkout/mens-tshirt/1',
  },
  {
    id: 2,
    name: 'Naruto Shippuden: Kakashi Uniform',
    category: 'Men Utility Shirts',
    price: 1799,
    imageSrc: menstshirt2,
    checkoutUrl: '/checkout/mens-tshirt/2',
  },
  {
    id: 3,
    name: 'TSS Originals: Blue Slate',
    category: 'Oversized T-Shirts',
    price: 1499,
    imageSrc: menstshirt3,
    checkoutUrl: '/checkout/mens-tshirt/3',
  },
  {
    id: 4,
    name: 'Marvel: Classic Logo',
    category: 'Oversized T-Shirts',
    price: 1199,
    imageSrc: menstshirt4,
    checkoutUrl: '/checkout/mens-tshirt/4',
  },
  {
    id: 5,
    name: 'Another Cool Tee',
    category: 'Graphic Tees',
    price: 999,
    imageSrc: 'https://via.placeholder.com/400/ADD8E6/FFFFFF?Text=Tee5',
    checkoutUrl: '/checkout/mens-tshirt/5',
  },
  {
    id: 6,
    name: 'Yet Another Tee',
    category: 'Printed T-Shirts',
    price: 1299,
    imageSrc: 'https://via.placeholder.com/400/90EE90/FFFFFF?Text=Tee6',
    checkoutUrl: '/checkout/mens-tshirt/6',
  },
];

// ✅ Responsive Breakpoints
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

// ✅ Reusable Card
const MensTshirtCard = ({ tshirt }) => (
  <div className="bg-white  shadow hover:shadow-lg transition-transform duration-300 hover:scale-105 mx-2">
    <Link to={tshirt.checkoutUrl} className="block">
      <img
        src={tshirt.imageSrc}
        alt={tshirt.name}
        className="w-full object-cover "
        style={{ aspectRatio: '3/3' }}
        loading="lazy"
      />
    </Link>
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-800 truncate">
        <Link to={tshirt.checkoutUrl} className="hover:underline">
          {tshirt.name}
        </Link>
      </h3>
      <p className="text-sm text-gray-500">{tshirt.category}</p>
      <p className="text-lg font-bold text-gray-900 mt-1">₹{tshirt.price}</p>
    </div>
  </div>
);

// ✅ Main Component
const MensTshirtsOfWeek = () => {
  return (
    <section className="bg-gray-100 py-12 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Men's T-Shirts of the Week
        </h2>

        <Carousel
          responsive={responsive}
          infinite={false}
          swipeable
          draggable
          arrows
          autoPlay={false}
          keyBoardControl
          containerClass="carousel-container"
          itemClass="px-2"
        >
          {mensTshirts.map((tshirt) => (
            <MensTshirtCard key={tshirt.id} tshirt={tshirt} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default MensTshirtsOfWeek;
