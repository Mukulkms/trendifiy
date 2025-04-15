import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Router and Routes for routing
import HomePage from "./pages/home"; // Import the HomePage component
import Header from "./components/header";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router> {/* Wrapping the application with Router */}
    <Header/>
      <Routes>
        {/* Defining the routes */}
        <Route path="/" element={<HomePage />} />  {/* HomePage will be shown at /home path */}
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;