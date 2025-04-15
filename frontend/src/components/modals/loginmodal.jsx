import React from "react";
import LoginPage from "../../pages/login";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[100vh] overflow-y-auto relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-black"
        >
          &times;
        </button>
        <LoginPage closeModal={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
