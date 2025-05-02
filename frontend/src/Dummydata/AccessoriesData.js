// Image imports
import menWallet1 from "../assets/images/a3.jpg";
import menBelt1 from "../assets/images/a1.jpg";
import menWatch1 from "../assets/images/a4.jpg";
import menSunglasses1 from "../assets/images/a2.jpg";
import menBag1 from "../assets/images/a5.jpg";

import womenWallet1 from "../assets/images/a7.jpg";
import womenhat from "../assets/images/a6.jpg";
import womenwatch from "../assets/images/a9.jpg";
import womenSunglasses1 from "../assets/images/a8.jpg";
import womenBag1 from "../assets/images/a10.jpg";

const menAccessories = [
  {
    _id: "m1",
    name: "Men's Leather Wallet",
    brand: "Wildcraft",
    price: 999,
    originalPrice: 1499,
    image: menWallet1,
    category: "wallets",
    color: "gray",
    rating: 4,
    gender: "men",
    discount: Math.round(((1499 - 999) / 1499) * 100),
  },
  {
    _id: "m2",
    name: "Men's Casual Belt",
    brand: "AlphaGear",
    price: 799,
    originalPrice: 1299,
    image: menBelt1,
    category: "belts",
    color: "black",
    rating: 5,
    gender: "men",
    discount: Math.round(((1299 - 799) / 1299) * 100),
  },
  {
    _id: "m3",
    name: "Men's Luxury Watch",
    brand: "Elegant Co.",
    price: 2999,
    originalPrice: 4999,
    image: menWatch1,
    category: "watches",
    color: "gold",
    rating: 2,
    gender: "men",
    discount: Math.round(((4999 - 2999) / 4999) * 100),
  },
  {
    _id: "m4",
    name: "Men's Aviator Sunglasses",
    brand: "Classic Line",
    price: 1499,
    originalPrice: 2499,
    image: menSunglasses1,
    category: "sunglasses",
    color: "black",
    rating: 4,
    gender: "men",
    discount: Math.round(((2499 - 1499) / 2499) * 100),
  },
  {
    _id: "m5",
    name: "Men's Travel Backpack",
    brand: "StreetStyle",
    price: 1799,
    originalPrice: 2499,
    image: menBag1,
    category: "bags",
    color: "black",
    rating: 4,
    gender: "men",
    discount: Math.round(((2499 - 1799) / 2499) * 100),
  },
];

const womenAccessories = [
  {
    _id: "w1",
    name: "Women's Leather Wallet",
    brand: "Parada",
    price: 999,
    originalPrice: 1499,
    image: womenWallet1,
    category: "wallets",
    color: "tan",
    rating: 4,
    gender: "women",
    discount: Math.round(((1499 - 999) / 1499) * 100),
  },
  {
    _id: "w2",
    name: "Women's Hat",
    brand: "Urban Edge",
    price: 399,
    originalPrice: 1199,
    image: womenhat,
    category: "hats",
    color: "brown", 
    rating: 4,
    gender: "women",
    discount: Math.round(((1199 - 399) / 1199) * 100),
  },
  {
    _id: "w3",
    name: "Women's Elegant Watch",
    brand: "AlphaGear",
    price: 2499,
    originalPrice: 3999,
    image: womenwatch,
    category: "watches",
    color: "Gold",
    rating: 4,
    gender: "women",
    discount: Math.round(((3999 - 2499) / 3999) * 100),
  },
  {
    _id: "w4",
    name: "Women's Cat-Eye Sunglasses",
    brand: "Classic Line",
    price: 1599,
    originalPrice: 2299,
    image: womenSunglasses1,
    category: "sunglasses",
    color: "black",
    rating: 4,
    gender: "women",
    discount: Math.round(((2299 - 1599) / 2299) * 100),
  },
  {
    _id: "w5",
    name: "Women's Leather Tote Bag",
    brand: "StreetStyle",
    price: 2999,
    originalPrice: 4999,
    image: womenBag1,
    category: "bags",
    color: "tan",
    rating: 5,
    gender: "women",
    discount: Math.round(((4999 - 2999) / 4999) * 100),
  },
];

export { menAccessories, womenAccessories };