// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS, ROLE_PERMISSIONS } from "../rbacData";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!user) return null;

  const permissions = ROLE_PERMISSIONS[user.role];

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const Products = () => {
    if (!permissions.canManageProducts) {
      return (
        <div className="permissions-card denied-card">
          <h2 className="denied-title">⛔ Access Denied</h2>
          <p>You don't have permission to manage products.</p>
          <p className="small">Required role: Admin or Manager</p>
        </div>
      );
    }

    return (
      <div>
        <h2 className="section-title">📦 Product Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                  <td>${p.price}</td>
                  <td>
                    <button className="action-btn btn-view">View</button>
                    <button className="action-btn btn-edit">Edit</button>
                    {user.role === "admin" ? (
                      <button className="action-btn btn-delete">Delete</button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Purchases = () => {
    return (
      <div>
        <h2 className="section-title">🛒 Purchase Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Purchase ID</th>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>2024-01-20</td>
                <td>Laptop</td>
                <td>5</td>
                <td>
                  <span className="ok">Completed</span>
                </td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>2024-01-19</td>
                <td>Mouse</td>
                <td>20</td>
                <td>
                  <span className="ok">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const DashboardHome = () => {
    return (
      <div>
        <div className="welcome-banner">
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>
            You are logged in as <strong>{user.role.toUpperCase()}</strong> with{" "}
            {permissions.menuItems.length} available modules
          </p>
        </div>

        <div className="permissions-card">
          <h2>🔑 Your Permissions ({user.role})</h2>

          <div className="permissions-grid">
            <div className={`permission-item ${permissions.canViewDashboard ? "allowed" : "denied"}`}>
              {permissions.canViewDashboard ? "✅" : "❌"} View Dashboard
            </div>
            <div className={`permission-item ${permissions.canManageUsers ? "allowed" : "denied"}`}>
              {permissions.canManageUsers ? "✅" : "❌"} Manage Users
            </div>
            <div className={`permission-item ${permissions.canManageProducts ? "allowed" : "denied"}`}>
              {permissions.canManageProducts ? "✅" : "❌"} Manage Products
            </div>
            <div className={`permission-item ${permissions.canManagePurchases ? "allowed" : "denied"}`}>
              {permissions.canManagePurchases ? "✅" : "❌"} Manage Purchases
            </div>
            <div className={`permission-item ${permissions.canViewReports ? "allowed" : "denied"}`}>
              {permissions.canViewReports ? "✅" : "❌"} View Reports
            </div>
            <div className={`permission-item ${permissions.canDeleteData ? "allowed" : "denied"}`}>
              {permissions.canDeleteData ? "✅" : "❌"} Delete Data
            </div>
            <div className={`permission-item ${permissions.canEditSettings ? "allowed" : "denied"}`}>
              {permissions.canEditSettings ? "✅" : "❌"} Edit Settings
            </div>
            <div className={`permission-item ${permissions.canViewAuditLogs ? "allowed" : "denied"}`}>
              {permissions.canViewAuditLogs ? "✅" : "❌"} View Audit Logs
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📦</div>
            <div className="card-title">Total Products</div>
            <div className="card-value">156</div>
            <div className="card-desc">Across all warehouses</div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏭</div>
            <div className="card-title">Warehouses</div>
            <div className="card-value">3</div>
            <div className="card-desc">Active locations</div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Monthly Purchases</div>
            <div className="card-value">$45.2K</div>
            <div className="card-desc">+15% from last month</div>
          </div>
        </div>

        {user.role === "admin" ? (
          <div className="permissions-card admin-border">
            <h2>👑 Admin Exclusive Content</h2>
            <p>Only admin users can see this section with system settings and audit logs.</p>

            <div className="table-container mt-15">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Timestamp</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>admin</td>
                    <td>Login</td>
                    <td>2024-01-20 10:30</td>
                    <td>192.168.1.1</td>
                  </tr>
                  <tr>
                    <td>manager</td>
                    <td>Updated Product</td>
                    <td>2024-01-20 09:15</td>
                    <td>192.168.1.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {user.role === "manager" ? (
          <div className="permissions-card manager-border">
            <h2>📈 Manager Reports</h2>
            <p>Performance metrics and team analytics visible to managers only.</p>

            <div className="dashboard-grid mt-15">
              <div className="dashboard-card">
                <div className="card-value">89%</div>
                <div className="card-desc">Team Performance</div>
              </div>
              <div className="dashboard-card">
                <div className="card-value">12</div>
                <div className="card-desc">Pending Approvals</div>
              </div>
            </div>
          </div>
        ) : null}

        {user.role === "staff" ? (
          <div className="permissions-card staff-border">
            <h2>📝 Your Tasks</h2>
            <p>Staff-specific tasks and daily operations.</p>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Process Purchase #1234</td>
                    <td>
                      <span className="danger">High</span>
                    </td>
                    <td>Pending</td>
                    <td>
                      <button className="action-btn btn-view">Start</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderPage = () => {
    if (currentPage === "products") return <Products />;
    if (currentPage === "purchases") return <Purchases />;
    return <DashboardHome />;
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span>📦 InventoryMS</span>
          </div>

          <div className="navbar-menu">
            <div className="nav-links">
              {permissions.menuItems.includes("dashboard") ? (
                <span
                  className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
                  onClick={() => setCurrentPage("dashboard")}
                >
                  Dashboard
                </span>
              ) : null}

              {permissions.menuItems.includes("products") ? (
                <span
                  className={`nav-link ${currentPage === "products" ? "active" : ""}`}
                  onClick={() => setCurrentPage("products")}
                >
                  Products
                </span>
              ) : null}

              {permissions.menuItems.includes("purchases") ? (
                <span
                  className={`nav-link ${currentPage === "purchases" ? "active" : ""}`}
                  onClick={() => setCurrentPage("purchases")}
                >
                  Purchases
                </span>
              ) : null}

              {permissions.menuItems.includes("reports") ? <span className="nav-link">Reports</span> : null}
              {permissions.menuItems.includes("users") ? <span className="nav-link">Users</span> : null}
              {permissions.menuItems.includes("settings") ? <span className="nav-link">Settings</span> : null}
            </div>

            <div className="user-info">
              <div className="user-badge">
                <span>{user.name}</span>
                <span className={`user-role ${user.role}`}>{user.role}</span>
              </div>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">{renderPage()}</div>
    </div>
  );
}