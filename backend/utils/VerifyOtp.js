import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mobileNumber = location.state?.mobileNumber;

  const validateOtp = () => {
    if (!otp) {
      setError("OTP is required.");
      return false;
    }

    if (otp.length !== 6) {
      setError("OTP should be 6 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    if (!validateOtp()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const data = await res.json();
      console.log("📬 OTP Verification Response:", data);

      if (!res.ok || data.error) {
        setError(data.error || "OTP verification failed.");
        setLoading(false);
        return;
      }

      alert("✅ OTP verified successfully!");
      navigate("/"); // Redirect to the dashboard or another page
    } catch (err) {
      console.error("❌ Error in OTP verification:", err);
      setError("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">OTP Verification</h2>
      <p>We sent an OTP to +91{mobileNumber}</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg outline-none"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleOtpVerification}
        disabled={loading}
        className={`w-full ${loading ? "bg-gray-500" : "bg-black"} text-white py-2 rounded-lg hover:bg-gray-800 transition mb-4`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
}
