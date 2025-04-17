import hoodie1 from "../assets/images/hoodie1.webp";
import hoodie2 from "../assets/images/hoodie2.webp";
import hoodie3 from "../assets/images/sporthoodie.webp";
import tshirt1 from "../assets/images/t-shirt.webp";
import tshirt2 from "../assets/images/tshirt2.webp";
import joggers from "../assets/images/joggers.webp";
import jeans from "../assets/images/jeans.webp";
import tshirt3 from "../assets/images/tshirt3.webp";

const dummyProducts = [
  {
    _id: "1",
    name: "Casual Printed T-Shirt",
    brand: "UrbanEdge",
    price: 799,
    originalPrice: 1299,
    image: tshirt1,
    sizes: ["S"],
    category: "T-Shirt",
    color: "red",
    rating: 4,
    discount: Math.round(((1299 - 799) / 1299) * 100), // 38%
  },
  {
    _id: "2",
    name: "Slim Fit Jeans",
    brand: "DenimFlex",
    price: 1499,
    originalPrice: 1999,
    image: jeans,
    sizes: ["S", "M", "XL"],
    category: "Jeans",
    color: "blue",
    rating: 3,
    discount: Math.round(((1999 - 1499) / 1999) * 100), // 25%
  },
  {
    _id: "3",
    name: "Oversized Hoodie",
    brand: "ChillWear",
    price: 1799,
    originalPrice: 2499,
    image: hoodie1,
    sizes: ["L", "XL"],
    category: "Hoodie",
    color: "black",
    rating: 5,
    discount: Math.round(((2499 - 1799) / 2499) * 100), // 28%
  },
  {
    _id: "4",
    name: "Basic Round Neck Tee",
    brand: "CottonCrew",
    price: 499,
    originalPrice: 799,
    image: tshirt2,
    sizes: ["S", "M"],
    category: "T-Shirt",
    color: "blue",
    rating: 4,
    discount: Math.round(((799 - 499) / 799) * 100), // 38%
  },
  {
    _id: "5",
    name: "Graphic T-Shirt",
    brand: "Nike",
    price: 999,
    originalPrice: 1499,
    image: tshirt3,
    sizes: ["S", "L", "XL"],
    category: "T-Shirt",
    color: "black",
    rating: 5,
    discount: Math.round(((1499 - 999) / 1499) * 100), // 33%
  },
  {
    _id: "6",
    name: "Reebok Sportswear Hoodie",
    brand: "Reebok",
    price: 1899,
    originalPrice: 2499,
    image: hoodie2,
    sizes: ["M"],
    category: "Hoodie",
    color: "red",
    rating: 3,
    discount: Math.round(((2499 - 1899) / 2499) * 100), // 24%
  },
  {
    _id: "7",
    name: "Puma Joggers",
    brand: "Puma",
    price: 1299,
    originalPrice: 1999,
    image: joggers,
    sizes: ["S", "M", "L"],
    category: "Joggers",
    color: "blue",
    rating: 4,
    discount: Math.round(((1999 - 1299) / 1999) * 100), // 35%
  },
  {
    _id: "8",
    name: "R-Hoodie",
    brand: "Reebok",
    price: 1859,
    originalPrice: 2199,
    image: hoodie3,
    sizes: ["M"],
    category: "Hoodie",
    color: "black",
    rating: 3,
    discount: Math.round(((2199 - 1859) / 2199) * 100), // 15%
  },
];

export default dummyProducts;
