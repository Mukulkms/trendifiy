// components/MultiCarousel.jsx
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../assets/images/banner1.jpeg";
import banner2 from "../assets/images/banner2.jpeg";
import banner3 from "../assets/images/banner3.jpeg";
import banner4 from "../assets/images/banner4.jpeg";
import banner5 from "../assets/images/banner5.jpeg";

const items = [
  {
    img: banner1,
  },
  {
    img: banner2,
  },
  {
    img: banner3,
  },
  {
    img: banner4,
  },
  {
    img: banner5,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function MultiCarouselbanner() {
  return (
    <div className="w-full h-auto overflow-hidden">
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
        removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
      >
        {items.map((item, index) => (
          <div key={index} className="relative w-full">
            <img
              src={item.img}
              alt={`banner-${index + 1}`}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '78vh' }} // Maintain a maximum height
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}