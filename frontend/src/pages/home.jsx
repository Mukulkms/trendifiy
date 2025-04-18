import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopSneakersOfWeek from "./TopSneakersOfWeek";
import MensTshirtsOfWeek from "./MensTshirtCard";
import MultiCarouselbanner from "../components/MultiCarouselbanner";
import NewArrivals from "./newarrival";


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
     <MultiCarouselbanner/>
     <TopSneakersOfWeek/>
     <MensTshirtsOfWeek/>
     <NewArrivals/>
    </div>
  );
}
