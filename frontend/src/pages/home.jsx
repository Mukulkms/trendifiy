import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopSneakersOfWeek from "./TopSneakersOfWeek";
import MensTshirtsOfWeek from "./MensTshirtCard";

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
     <TopSneakersOfWeek/>
     <MensTshirtsOfWeek/>
    </div>
  );
}
