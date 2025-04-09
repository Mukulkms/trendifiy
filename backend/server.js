const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config(); // Load .env file

const app = express();

// Debugging: Check if MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI); 

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));


// Routes
app.get("/", (req, res) => {
    res.send("Trendify API is running...");
});



const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const authRoutes = require("./routes/authRoutes"); // ✅
app.use("/api/auth", authRoutes); // ✅

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
