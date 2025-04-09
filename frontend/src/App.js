import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Router and Routes for routing
import LoginPage from "./pages/login"; // Import the LoginPage component
import HomePage from "./pages/home"; // Import the HomePage component


function App() {
  return (

    <Router> {/* Wrapping the application with Router */}
    
      <Routes>
        {/* Defining the routes */}
        <Route path="/" element={<LoginPage />} />  {/* LoginPage will be shown at the root path */}
        <Route path="/home" element={<HomePage />} />  {/* HomePage will be shown at /home path */}
      </Routes>
    </Router>
  );
}

export default App;