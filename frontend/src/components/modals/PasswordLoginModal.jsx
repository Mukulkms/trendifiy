import React from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordLoginModal({
  isOpen,
  onClose,
  password,
  setPassword,
  mobileNumber,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePasswordLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        // Just log the error, no alerts or toasts
        console.warn("Login failed:", data.message || "Unknown error");
        return;
      }

      localStorage.setItem("trendify_token", data.token);
      onClose(); // close the modal
      navigate("/home"); // 🔥 Redirect to home
    } catch (err) {
      console.error("Login error", err);
      // Silent fail, as requested
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">Login via Password</h3>

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-4 border px-4 py-2 rounded-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
