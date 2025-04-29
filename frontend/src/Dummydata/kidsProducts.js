// Kids image imports (replace with actual image paths)
import boysTee1 from "../assets/images/kids_boy_tee1.webp";
import boysShirt1 from "../assets/images/kids_boy_shirt1.webp";
import girlsDress1 from "../assets/images/kids_girl_dress1.webp";
import girlsTee1 from "../assets/images/kids_girl_tee1.webp";
import boysHoodie1 from "../assets/images/kids_boy_hoodie1.webp";
import girlsTop1 from "../assets/images/kids_girl_top1.webp";

const kidsProducts = [
  {
    _id: "k1",
    name: "Boys Cartoon Print T-Shirt",
    brand: "FunKidz",
    price: 499,
    originalPrice: 799,
    image: boysTee1,
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    category: "T-Shirt",
    color: "blue",
    rating: 4,
    gender: "boys",
    discount: Math.round(((799 - 499) / 799) * 100),
  },
  {
    _id: "k2",
    name: "Girls Polka Dot Dress",
    brand: "CuteCuts",
    price: 799,
    originalPrice: 1199,
    image: girlsDress1,
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    category: "Dress",
    color: "blue",
    rating: 5,
    gender: "girls",
    discount: Math.round(((1199 - 799) / 1199) * 100),
  },

  {
    _id: "k3",
    name: "Boys Shirt",
    brand: "SmartKid",
    price: 699,
    originalPrice: 999,
    image: boysShirt1,
    sizes: ["4-5Y", "6-7Y"],
    category: "Shirt",
    color: "red",
    rating: 3,
    gender: "boys",
    discount: Math.round(((999 - 699) / 999) * 100),
  },
  {
    _id: "k4",
    name: "Girls Graphic Print Fishes",
    brand: "Style Sprouts",
    price: 399,
    originalPrice: 599,
    image: girlsTee1,
    sizes: ["2-3Y", "4-5Y"],
    category: "T-Shirt",
    color: "yellow",
    rating: 5,
    gender: "girls",
    discount: Math.round(((599 - 399) / 599) * 100),
  },
 
  {
    _id: "k6",
    name: "Boys Solid Hoodie",
    brand: "CozyKids",
    price: 999,
    originalPrice: 1499,
    image: boysHoodie1,
    sizes: ["4-5Y", "6-7Y"],
    category: "Hoodie",
    color: "grey",
    rating: 4,
    gender: "boys",
    discount: Math.round(((1499 - 999) / 1499) * 100),
  },
  {
    _id: "k8",
    name: "Girls Hoodie",
    brand: "SweetPea",
    price: 549,
    originalPrice: 799,
    image: girlsTop1,
    sizes: ["2-3Y", "4-5Y"],
    category: "Top",
    color: "white",
    rating: 3,
    gender: "girls",
    discount: Math.round(((799 - 549) / 799) * 100),
  },
];

export default kidsProducts;