import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import sneaker1 from '../assets/images/artem-bondarchuk-XPBYi4K8vFI-unsplash.jpg';
import sneaker2 from '../assets/images/taylor-smith-aDZ5YIuedQg-unsplash.jpg';
import sneaker3 from '../assets/images/the-dk-photography-NUoPWImmjCU-unsplash.jpg';
import sneaker4 from '../assets/images/xavier-teo-SxAXphIPWeg-unsplash.jpg';

// ✅ Data for Sneakers
const sneakersData = [
  {
    id: 1,
    name: 'Urban Blazer: Mocha',
    category: 'Sneakers',
    price: 2899,
    imageSrc: sneaker1,
    checkoutUrl: '/checkout/1',
  },
  {
    id: 2,
    name: 'Nike: Warhead',
    category: 'Sneakers',
    price: 10499,
    imageSrc: sneaker2,
    checkoutUrl: '/checkout/2',
  },
  {
    id: 3,
    name: 'Puma',
    category: 'Sneakers',
    price: 3799,
    imageSrc: sneaker3,
    checkoutUrl: '/checkout/3',
  },
  {
    id: 4,
    name: 'Nike: Sleek',
    category: 'Sneakers',
    price: 8199,
    imageSrc: sneaker4,
    checkoutUrl: '/checkout/4',
  },
];

// ✅ Responsive breakpoints
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1600 }, items: 4 },
  desktop: { breakpoint: { max: 1600, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// ✅ Memoized Sneaker Card Component
const SneakerCard = memo(({ sneaker }) => (
  <div className="bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2 overflow-hidden rounded-lg">
    <Link to={sneaker.checkoutUrl} className="block">
      <img
        src={sneaker.imageSrc}
        alt={sneaker.name}
        className="w-full object-cover"
        style={{ aspectRatio: '3 / 4' }}
        loading="lazy"
      />
    </Link>
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-800 truncate">
        <Link to={sneaker.checkoutUrl} className="hover:underline">
          {sneaker.name}
        </Link>
      </h3>
      <p className="text-sm text-gray-500">{sneaker.category}</p>
      <p className="text-lg font-bold text-gray-900 mt-1">₹{sneaker.price}</p>
    </div>
  </div>
));

// ✅ Main Component
const SneakerOfTheWeek = () => {
  const sneakersList = useMemo(() => sneakersData, []);

  return (
    <section className="bg-gray-100 py-12 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Sneakers of the Week
        </h2>

        <Carousel
          responsive={responsive}
          swipeable
          draggable
          arrows
          infinite={false}
          keyBoardControl
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="px-2"
        >
          {sneakersList.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default SneakerOfTheWeek;
