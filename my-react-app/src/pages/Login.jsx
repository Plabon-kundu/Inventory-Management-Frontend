// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_USERS } from "../rbacData";

export default function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("staff");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const roles = [
    { id: "admin", label: "Admin", color: "admin" },
    { id: "manager", label: "Manager", color: "manager" },
    { id: "staff", label: "Staff", color: "staff" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = MOCK_USERS.find(
      (u) => u.role === selectedRole && u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        role: user.role,
        username: user.username,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Inventory Management</h1>
          <p>Role-Based Access Control System</p>
        </div>

        <div className="role-selector">
          {roles.map((role) => (
            <span
              key={role.id}
              className={`role-badge ${role.color} ${selectedRole === role.id ? "selected" : ""}`}
              onClick={() => setSelectedRole(role.id)}
            >
              {role.label}
            </span>
          ))}
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error ? <div className="error-text">{error}</div> : null}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}