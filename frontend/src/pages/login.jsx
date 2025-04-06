import React, { useState } from "react";
import loginhero from "../assets/images/loginbanner.jpg";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <div className="text-center">
          <img
            src={loginhero}
            alt="Trendify Banner"
            className="mb-6 rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-20">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex justify-between mb-6 border-b border-gray-300">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 text-lg font-medium ${
                isLogin
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 text-lg font-medium ${
                !isLogin
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Register
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {isLogin ? "Login" : "Register"} to Trendify
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Join us now and start shopping the trendiest fashion."}
          </p>

          {/* Form */}
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-700 flex items-center">
                +91
              </span>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="flex-1 px-4 py-2 outline-none"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg outline-none"
              />
            </div>
          )}

          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition mb-4">
            {isLogin ? "CONTINUE" : "REGISTER"}
          </button>

          <div className="flex items-center justify-between my-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="text-gray-500 px-3 text-sm">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
              Continue with Facebook
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By creating an account or logging in, you agree to Trendify’s Terms &
            Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
