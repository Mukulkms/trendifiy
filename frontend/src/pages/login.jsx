import React from "react";
import loginhero from "../assets/images/loginbanner.jpg"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Slogan */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <div className="text-center">
          <img
            src={loginhero}
            alt="Trendify Banner"
            className="mb-6 rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login / Signup</h2>
          <p className="text-sm text-gray-500 mb-4">
            Join us now to be a part of the Trendify® family.
          </p>

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

          <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition mb-4">
            CONTINUE
          </button>

          <div className="flex items-center justify-between my-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="text-gray-500 px-3 text-sm">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

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
            By creating an account or logging in, you agree with Trendify’s Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
