import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Router and Routes for routing
import HomePage from "./pages/home"; // Import the HomePage component
import Header from "./components/header";
import LoginPage from "./pages/login";
import MenClothingPage from "./pages/Menclothing";
import Footer from "./pages/footer";

function App() {
  return (
    <Router> {/* Wrapping the application with Router */}
    <Header/>
      <Routes>
        {/* Defining the routes */}
        <Route path="/" element={<HomePage />} />  {/* HomePage will be shown at /home path */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/men" element={<MenClothingPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;