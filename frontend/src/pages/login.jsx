import React, { useEffect, useState } from "react";
import loginhero from "../assets/images/loginbanner.jpg";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register";
import OTPLoginModal from "../components/modals/OTPLoginModal";
import PasswordLoginModal from "../components/modals/PasswordLoginModal";

export default function LoginPage({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [loginMethods, setLoginMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  // ⏳ Timer countdown effect
  useEffect(() => {
    let interval;

    if (showModal && modalType === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showModal, modalType, timer]);

  const navigate = useNavigate();

  const mobileRegex = /^[0-9]{10}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobileNumber) {
      setError("Mobile number is required.");
      return;
    } else if (!mobileRegex.test(mobileNumber)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();
      if (data.exists) {
        setLoginMethods(data.loginMethods || []);
        setShowOptions(true);
        setError("");
      } else {
        setError(data.error || "User not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLoginClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await res.json();
      if (data.success) {
        setModalType("otp");
        setShowModal(true);
        setTimer(60);
      } else {
        console.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.log("OTP send error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalLogin = async () => {
    const url =
      modalType === "otp"
        ? "http://localhost:5000/api/auth/verify-otp"
        : "http://localhost:5000/api/auth/login";

    const body =
      modalType === "otp" ? { mobileNumber, otp } : { mobileNumber, password };

    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("trendify_token", data.token);
        setShowModal(false);
        setTimeout(() => {
          navigate("/home");
        }, 100);
      } else {
        // Don't show any alert. Just stay on modal so user can retry.
        console.warn("Login failed:", data.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      // Silently fail
    } finally {
      setIsLoading(false);
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
        console.log("OTP resent!");
        setTimer(60);
      }
    } catch (err) {
      console.log("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className=" md:flex md:w-1/2 h-full">
        <img
          src={loginhero}
          alt="Trendify Banner"
          className="w-full h-1/2 object-cover "
        />
      </div>

      <div className="flex flex-col lg:mt-20 md:mt-20 items-center w-full md:w-1/2 px-6 py-10 md:py-0">
        {" "}
        <div className="w-full max-w-xl">
          <div className="flex justify-between mb-4 border-b border-gray-300">
            <button
              onClick={() => {
                setIsLogin(true);
                setShowOptions(false);
                setError("");
              }}
              className={`w-1/2 py-2 text-lg font-medium ${
                isLogin
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
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
                !isLogin
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {isLogin ? "Login" : "Register"} to Trendify
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Join us now and start shopping the trendiest fashion."}
          </p>

          {isLogin ? (
            <>
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
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition mb-3"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "CONTINUE"}
              </button>

              {showOptions && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm text-gray-600">Choose login method:</p>
                  {loginMethods.includes("otp") && (
                    <button
                      onClick={handleOTPLoginClick}
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

          <div className="flex items-center justify-between my-3">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="text-gray-500 px-3 text-sm">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                window.open("http://localhost:5000/api/auth/google", "_self");
              }}
              className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="google icon"
              />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => {
                window.open("http://localhost:5000/auth/facebook", "_self");
              }}
              className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                className="h-5 w-5"
                alt="fb icon"
              />
              Continue with Facebook
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By creating an account or logging in, you agree to Trendify’s Terms
            & Conditions and Privacy Policy.
          </p>
        </div>
      </div>

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
        mobileNumber={mobileNumber}
      />
    </div>
  );
}
