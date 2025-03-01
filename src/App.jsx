import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Nav";
import About from "./components/about/About";
import Signup from "./components/login/SignUp";
import UserProfile from "./components/profile/Profile";
import Content from "./container/content/Content";
import LearningDashboard from "./container/coursesAndTest/LearningDashboard";
import TestPaper from "./container/coursesAndTest/TestPaper";
import StudentForm from "../src/components/login/StundentForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("key");
    if (username) {
      setIsAuthenticated(true);
    }
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/Login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {isAuthenticated && (
          <>
            <Route path="/profile" element={<UserProfile />} />
          </>
        )}
        <Route path="/learningDashboard" element={<LearningDashboard />} />
        <Route path="/testPaper" element={<TestPaper />} />
        <Route path="/studentForm" element={<StudentForm />} />
      </Routes>
    </>
  );
}

export default App;
