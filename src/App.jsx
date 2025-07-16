import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Notes from "./components/Notes/Notes";
import CreateNote from "./components/Notes/CreateNote";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={
          <ProtectedRoute><Notes /></ProtectedRoute>
          } />
        <Route path="/create-note" element={
          <ProtectedRoute> <CreateNote /></ProtectedRoute>
         } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

