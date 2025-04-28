// components/Auth/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("trendify_token");
    if (token) {
      try {
        const base64UrlPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(base64UrlDecode(base64UrlPayload));
        setUser(decodedPayload);
        console.log("AuthContext - User state set from token on load:", decodedPayload); // ADD THIS LOG
      } catch (error) {
        console.error("AuthContext - Error decoding token:", error);
        localStorage.removeItem("trendify_token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("trendify_token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trendify_token");
  };

  function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <div>Checking authentication...</div>}
    </AuthContext.Provider>
  );
};