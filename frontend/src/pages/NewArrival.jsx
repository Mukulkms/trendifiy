import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//  Images
import men1 from '../assets/images/n1.jpg';
import men2 from '../assets/images/n2.jpg';
import women1 from '../assets/images/n3.jpg';
import women2 from '../assets/images/n4.jpg';
import shoes1 from '../assets/images/n5.jpg';
import shoes2 from '../assets/images/the-dk-photography-NUoPWImmjCU-unsplash.jpg';
import baby1 from '../assets/images/n7.jpg';
import baby2 from '../assets/images/n6.jpg';

const newArrivalsData = [
  { id: 1, name: 'Lee Cooper: Black T-Shirt', category: 'Men', price: 1499, imageSrc: men1, checkoutUrl: '/checkout/men/1' },
  { id: 2, name: 'RareRabbit: Cheetah Shirt Classic Fit', category: 'Men', price: 1699, imageSrc: men2, checkoutUrl: '/checkout/men/2' },
  { id: 3, name: 'Broken Saints: Black t-shirt', category: 'Women', price: 1999, imageSrc: women1, checkoutUrl: '/checkout/women/1' },
  { id: 4, name: 'Colors: Summer Top', category: 'Women', price: 1399, imageSrc: women2, checkoutUrl: '/checkout/women/2' },
  { id: 5, name: 'Clarks: Sneaker X', category: 'Shoes', price: 2999, imageSrc: shoes1, checkoutUrl: '/checkout/shoes/1' },
  { id: 6, name: 'Puma: Runner Pro', category: 'Shoes', price: 2799, imageSrc: shoes2, checkoutUrl: '/checkout/shoes/2' },
  { id: 7, name: 'Hamps: Cute Romper', category: 'Baby', price: 899, imageSrc: baby1, checkoutUrl: '/checkout/baby/1' },
  { id: 8, name: 'DNMX: Soft Onesie', category: 'Baby', price: 199, imageSrc: baby2, checkoutUrl: '/checkout/baby/2' },
];

//  Responsive Breakpoints for Carousel
const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1600 }, items: 4 },
    desktop: { breakpoint: { max: 1600, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };
  
  const NewArrivalsCard = React.memo(({ item }) => (
    <div className="bg-white shadow-md hover:shadow-lg transition-transform duration-300 transform-gpu hover:scale-105 mx-2 overflow-hidden">
      <Link to={item.checkoutUrl} className="block">
        <img
          src={item.imageSrc}
          alt={item.name}
          className="w-full object-cover"
          style={{ aspectRatio: '3 / 4' }}
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          <Link to={item.checkoutUrl} className="hover:underline">
            {item.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">₹{item.price}</p>
      </div>
    </div>
  ));
  
  const NewArrivals = () => {
    const data = useMemo(() => newArrivalsData, []);
  
    return (
      <section className="bg-gray-100 py-12 font-sans">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            New Arrivals
          </h2>
          <Carousel
            responsive={responsive}
            infinite={false}
            swipeable
            draggable
            arrows
            autoPlay={false}
            keyBoardControl
            lazyLoad="ondemand"
            containerClass="carousel-container"
            itemClass="px-2"
          >
            {data.map((item) => (
              <NewArrivalsCard key={item.id} item={item} />
            ))}
          </Carousel>
        </div>
      </section>
    );
  };
  
  export default NewArrivals;