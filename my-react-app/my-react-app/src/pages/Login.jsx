import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    // Mock login (Replace with real API later)
    localStorage.setItem("token", "mock-token");

    // Demo role (for future role-based routing)
    if (email.includes("admin")) {
      localStorage.setItem("role", "admin");
    } else if (email.includes("manager")) {
      localStorage.setItem("role", "manager");
    } else {
      localStorage.setItem("role", "staff");
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Inventory Management System</h1>
        <h2 className="login-card-title">Login</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="example@yoursite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <button
          type="button"
          className="login-link"
          onClick={() => alert("Sign up page is not implemented yet.")}
        >
          Don't have an account?
        </button>
      </div>
    </div>
  );
}