// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      <span>{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
    </button>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const user = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }, []);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  return (
    <>
      <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode((s) => !s)} />

      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}