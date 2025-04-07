import React, { useState, useEffect } from "react";
import loginhero from "../assets/images/loginbanner.jpg";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register";

// Import modals
import OTPLoginModal from "../components/modals/OTPLoginModal";
import PasswordLoginModal from "../components/modals/PasswordLoginModal";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [loginMethods, setLoginMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "otp" or "password"
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber) {
      setError("Mobile number is required.");
      return;
    } else if (!mobileRegex.test(mobileNumber)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();

      if (data.exists) {
        setLoginMethods(data.loginMethods);
        setShowOptions(true);
        setError("");
      } else if (data.token) {
        alert("Login Successful!");
        navigate("/home");
      } else {
        setError(data.error || data.message || "Unknown error.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  const handleModalLogin = async () => {
    const url =
      modalType === "otp"
        ? "http://localhost:5000/api/auth/verify-otp"
        : "http://localhost:5000/api/auth/login-password";

    const body =
      modalType === "otp"
        ? { mobileNumber, otp }
        : { mobileNumber, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.token) {
        alert("Login Successful!");
        setShowModal(false);
        navigate("/home");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during login.");
    }
  };

  const resendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });
      const data = await res.json();
      if (data.success) {
        alert("OTP resent!");
        setTimer(60);
      }
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (modalType === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [modalType, timer]);

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <img src={loginhero} alt="Trendify Banner" className="mb-6 rounded-xl shadow-lg" />
      </div>

      {/* Right side form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-20">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex justify-between mb-6 border-b border-gray-300">
            <button
              onClick={() => {
                setIsLogin(true);
                setShowOptions(false);
                setError("");
              }}
              className={`w-1/2 py-2 text-lg font-medium ${
                isLogin ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setShowOptions(false);
                setError("");
              }}
              className={`w-1/2 py-2 text-lg font-medium ${
                !isLogin ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {isLogin ? "Login" : "Register"} to Trendify
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Join us now and start shopping the trendiest fashion."}
          </p>

          {/* Login Form */}
          {isLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <span className="px-3 bg-gray-100 text-gray-700 flex items-center">+91</span>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="flex-1 px-4 py-2 outline-none"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition mb-4"
              >
                CONTINUE
              </button>

              {/* Login Options */}
              {showOptions && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm text-gray-600">Choose login method:</p>
                  {loginMethods.includes("otp") && (
                    <button
                      onClick={() => {
                        setModalType("otp");
                        setShowModal(true);
                      }}
                      className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Login via OTP
                    </button>
                  )}
                  {loginMethods.includes("password") && (
                    <button
                      onClick={() => {
                        setModalType("password");
                        setShowModal(true);
                      }}
                      className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Login via Password
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <RegisterForm />
          )}

          {/* Divider */}
          <div className="flex items-center justify-between my-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="text-gray-500 px-3 text-sm">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" />
              Continue with Google
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="h-5 w-5" />
              Continue with Facebook
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By creating an account or logging in, you agree to Trendify’s Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Reusable Modals */}
      <OTPLoginModal
        isOpen={showModal && modalType === "otp"}
        onClose={() => setShowModal(false)}
        otp={otp}
        setOtp={setOtp}
        timer={timer}
        handleSubmit={handleModalLogin}
        resendOtp={resendOtp}
      />

      <PasswordLoginModal
        isOpen={showModal && modalType === "password"}
        onClose={() => setShowModal(false)}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleModalLogin}
      />
    </div>
  );
}
