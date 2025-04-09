const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobileNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    provider: { type: String, default: "local" },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "vendor", "super-admin"],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

// ✅ Automatically hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Password comparison method for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Debug logs if needed
  // console.log("Entered password:", enteredPassword);
  // console.log("Stored hash:", this.password);

  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
