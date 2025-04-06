const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  provider: { type: String, default: "local" }, // "google", "facebook"
  role: { type: String, default: "user", enum: ["user", "admin", "vendor", "super-admin"] },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
