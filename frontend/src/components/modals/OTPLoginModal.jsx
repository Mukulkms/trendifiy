import React from "react";

export default function OTPLoginModal({
  isOpen,
  onClose,
  otp,
  setOtp,
  timer,
  handleSubmit,
  resendOtp,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">Login via OTP</h3>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-3 border px-4 py-2 rounded-lg outline-none"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          disabled={timer > 0}
          onClick={resendOtp}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
