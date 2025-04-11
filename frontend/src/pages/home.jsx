import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("trendify_token", token);
      // Clean up URL
      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in or registered!</p>
    </div>
  );
}
