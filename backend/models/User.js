const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },

    // ✅ Email is required for local login, optional for Facebook
    email: {
      type: String,
      unique: true,
      sparse: true, // allow multiple nulls
    },

    // ✅ mobileNumber is optional for Facebook
    mobileNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ✅ password is optional for Facebook
    password: {
      type: String,
    },
    
    // ✅ Facebook login
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },

    profilePic: { type: String },

    //Google login
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    avatar: String,

    provider: {
      type: String,
      default: "local",
      enum: ["local", "facebook", "google"],
    },
    
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

// ✅ Automatically hash password before saving (only if modified and exists)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Password comparison method for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
