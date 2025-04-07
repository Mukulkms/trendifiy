const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  mobileNumber: { type: String, unique: true },
  password: String,
  provider: { type: String, default: "local" },
  role: { type: String, default: "user", enum: ["user", "admin", "vendor", "super-admin"] },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
