import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navigation/Navbar.jsx";
import Register from "./component/auth/Register.jsx";
import Login from "./component/auth/Login.jsx";
import PostJob from "./component/jobs/PostJob.jsx";
import JobList from "./component/jobs/JobList.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<PostJob />} />
        <Route path="/jobslist" element={<JobList />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
