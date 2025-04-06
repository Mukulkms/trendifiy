const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const dummyProducts = [
  {
    name: "Classic White T-Shirt",
    price: 19.99,
    category: "T-Shirts",
    image: "https://via.placeholder.com/300x300.png?text=White+Tee",
    stock: 100,
    ratings: 4.5,
  },
  {
    name: "Denim Jacket",
    price: 59.99,
    category: "Jackets",
    image: "https://via.placeholder.com/300x300.png?text=Denim+Jacket",
    stock: 50,
    ratings: 4.8,
  },
  {
    name: "Leather Boots",
    price: 89.99,
    category: "Footwear",
    image: "https://via.placeholder.com/300x300.png?text=Leather+Boots",
    stock: 30,
    ratings: 4.6,
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await Product.deleteMany(); // optional: clears old data
    const inserted = await Product.insertMany(dummyProducts);
    console.log(`🛍️ Inserted ${inserted.length} products!`);
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  });
