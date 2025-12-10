import React, { useState } from "react";
import Testimonials from "./components/testimonials/Testimonials.jsx";
import LmsForm from "./components/lms/LmsForm.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import { reviews } from "./data/products.js";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("testimonials");

  return (
    <div className="App">
      <div className="header">
        <h1>Learning Management System</h1>
        <p className="subtitle">MongoDB + React Full Stack Application</p>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "testimonials" ? "active" : ""}`}
          onClick={() => setActiveTab("testimonials")}
        >
          Customer Testimonials
        </button>

        <button
          className={`tab ${activeTab === "enroll" ? "active" : ""}`}
          onClick={() => setActiveTab("enroll")}
        >
          Course Enrollment
        </button>

        <button
          className={`tab ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          MongoDB Data
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        {activeTab === "testimonials" ? (
          <Testimonials reviews={reviews} />
        ) : activeTab === "enroll" ? (
          <LmsForm />
        ) : (
          <AdminPanel />
        )}
      </div>

      <div className="footer">
        <p>© 2024 MERN Stack LMS. Data stored in MongoDB.</p>
        <p className="footer-contact">
          Backend: http://localhost:5000 | MongoDB: mongodb://localhost:27017
        </p>
      </div>
    </div>
  );
}

export default App;
