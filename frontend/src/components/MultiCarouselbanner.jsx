// components/MultiCarousel.jsx
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../assets/images/banner1.jpeg"
import banner2 from "../assets/images/banner2.jpeg"
import banner3 from "../assets/images/banner3.jpeg"
import banner4 from "../assets/images/banner4.jpeg"
import banner5 from "../assets/images/banner5.jpeg"

const items = [
  {
    title: "Mountain Escape",
    img:banner1,
  },
  {
    title: "City Lights",
    img:banner2,
  },
  {
    title: "Desert Dreams",
    img: banner3,
  },
  {
    title: "Ocean Breeze",
    img: banner4,
  },
  {
    title: "Forest Trail",
    img: banner5,
  }
];

const responsive = {
  allScreens: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export default function MultiCarouselbanner() {
  return (
    <div className="w-full  overflow-hidden">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        showDots
        containerClass="carousel-container"
        itemClass="px-5"
        dotListClass="custom-dot-list-style"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
      >
        {items.map((item, index) => (
          <div key={index} className="relative w-screen">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[550px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4 text-center">
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
