import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import banner5 from "../assets/images/banner5.jpg";

const items = [
  {
    img: banner1,
    title: "Embrace Spring Style",
    description: "Discover fresh looks to brighten your season.",
    buttonText: "Shop Spring",
  },
  {
    img: banner2,
    title: "Summer's Here: New Arrivals",
    description: "Explore the latest trends for sunny days and warm nights.",
    buttonText: "See New Arrivals",
  },
  {
    img: banner3,
    title: "Curated Collection",
    description: "Unique and stylish pieces selected just for you.",
    buttonText: "Explore Now",
  },
  {
    img: banner4,
    title: "Kids' Summer Adventures",
    description: "Cool and comfortable styles for all their summer fun.",
    buttonText: "Shop for Kids",
  },
  {
    img: banner5,
    title: "Summer Sale: Up to 50% Off",
    description: "Incredible deals on your favorite summer essentials.",
    buttonText: "View Sale",
  },
];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const MultiCarouselbanner = () => {
  return (
    <div className="w-full h-auto overflow-hidden relative">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        showDots
        containerClass="carousel-container"
        itemClass="px-0"
        dotListClass="custom-dot-list-style"
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
      >
        {items.map((item, index) => (
          <div key={index} className="relative w-full">
            <img
              src={item.img}
              alt={`banner-${index + 1}`}
              loading="lazy"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "80vh" }}
            />
            <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 text-left text-white">
              <h2 className="text-3xl md:text-4xl lg:text-6xl mb-2 md:mb-3 leading-tight">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 max-w-md leading-relaxed">
                {item.description}
              </p>
              <button className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(MultiCarouselbanner);
