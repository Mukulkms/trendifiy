import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import sneaker1 from '../assets/images/artem-bondarchuk-XPBYi4K8vFI-unsplash.jpg';
import sneaker2 from '../assets/images/taylor-smith-aDZ5YIuedQg-unsplash.jpg';
import sneaker3 from '../assets/images/the-dk-photography-NUoPWImmjCU-unsplash.jpg';
import sneaker4 from '../assets/images/xavier-teo-SxAXphIPWeg-unsplash.jpg';

const sneakers = [
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
  {
    id: 5,
    name: 'Another Sneaker',
    category: 'Limited Edition',
    price: 4500,
    imageSrc: 'https://via.placeholder.com/300/4682B4/FFFFFF?Text=Sneaker5',
    checkoutUrl: '/checkout/5',
  },
  {
    id: 6,
    name: 'Another Sneaker 2',
    category: 'Limited Edition',
    price: 4600,
    imageSrc: 'https://via.placeholder.com/300/4682B4/FFFFFF?Text=Sneaker6',
    checkoutUrl: '/checkout/6',
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 4,
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

const SneakerCard = memo(({ sneaker }) => (
  <div className="p-2 will-change-transform">
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.03]">
      <Link to={sneaker.checkoutUrl}>
        <img
          src={sneaker.imageSrc}
          alt={sneaker.name}
          className="w-full h-80 object-cover rounded-t-2xl"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          <Link to={sneaker.checkoutUrl} className="hover:underline">
            {sneaker.name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500">{sneaker.category}</p>
        <p className="text-sm font-bold text-gray-900 mt-1">₹{sneaker.price}</p>
      </div>
    </div>
  </div>
));

const TopSneakersOfWeek = () => {
  return (
    <section className="bg-gray-100 py-12 font-sans font-normal">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Top 10 Sneakers of the Week
        </h2>
        <Carousel
          responsive={responsive}
          infinite={false}
          autoPlay={false}
          keyBoardControl
          arrows
          draggable
          swipeable
          shouldResetAutoplay={false}
          containerClass="carousel-container"
          itemClass="px-2"
          removeArrowOnDeviceType={['mobile']}
        >
          {sneakers.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TopSneakersOfWeek;
