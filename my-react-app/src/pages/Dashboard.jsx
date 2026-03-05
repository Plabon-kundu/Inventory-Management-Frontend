// src/pages/Dashboard.jsx
// Changes applied (only these):
// 1) Removed "Reports" and "Users" buttons from navbar
// 2) "Products" is clickable, but Product Management page is removed (click keeps you on dashboard)
// 3) "Warehouses" card is clickable and smoothly scrolls to a Warehouses section
// 4) Added "AI Demand Forecasting" navbar button to open /ai-demand-forecasting
// Everything else remains the same UI/logic.

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS, ROLE_PERMISSIONS } from "../rbacData";
import PurchasesContent from "../components/purchases/PurchasesContent";

const LS_PRODUCTS_KEY = "products";
const LS_PURCHASES_KEY = "purchases";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const [currentPage, setCurrentPage] = useState("dashboard");

  // Products state (localStorage fallback)
  const [products, setProducts] = useState(() => {
    const raw = localStorage.getItem(LS_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : MOCK_PRODUCTS;
  });

  // Purchases state (localStorage fallback)
  const [purchases, setPurchases] = useState(() => {
    const raw = localStorage.getItem(LS_PURCHASES_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  if (!user) return null;

  const permissions = ROLE_PERMISSIONS[user.role];

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Smooth scroll to Warehouses section inside Dashboard
  const scrollToWarehouses = () => {
    const el = document.getElementById("warehouses-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
            <div className="card-value">{products.length}</div>
            <div className="card-desc">Across all warehouses</div>
          </div>

          {/* Warehouses card is clickable */}
          <div className="dashboard-card" style={{ cursor: "pointer" }} onClick={scrollToWarehouses} role="button">
            <div className="card-icon">🏭</div>
            <div className="card-title">Warehouses</div>
            <div className="card-value">3</div>
            <div className="card-desc">Active locations (Click)</div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Total Purchases</div>
            <div className="card-value">{purchases.length}</div>
            <div className="card-desc">Saved in local storage</div>
          </div>
        </div>

        {/* Scroll target section for Warehouses */}
        <div className="permissions-card" id="warehouses-section">
          <h2>🏭 Warehouses</h2>
          <p>Warehouse section is clickable from the dashboard card.</p>

          <div className="table-container mt-15">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Warehouse Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Main Warehouse</td>
                  <td>
                    <span className="ok">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>North Warehouse</td>
                  <td>
                    <span className="ok">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>South Warehouse</td>
                  <td>
                    <span className="ok">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
    // Product Management page removed:
    // If currentPage becomes "products", show DashboardHome instead.
    if (currentPage === "products") return <DashboardHome />;

    if (currentPage === "purchases") {
      if (!permissions.canManagePurchases) {
        return (
          <div className="permissions-card denied-card">
            <h2 className="denied-title">⛔ Access Denied</h2>
            <p>You don't have permission to manage purchases.</p>
          </div>
        );
      }

      return (
        <PurchasesContent
          user={user}
          products={products}
          purchases={purchases}
          onProductsChange={(nextProducts) => {
            setProducts(nextProducts);
            localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(nextProducts));
          }}
          onPurchasesChange={(nextPurchases) => {
            setPurchases(nextPurchases);
            localStorage.setItem(LS_PURCHASES_KEY, JSON.stringify(nextPurchases));
          }}
        />
      );
    }

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

              {/* Products remains clickable but does not open Product Management page */}
              {permissions.menuItems.includes("products") ? (
                <span
                  className="nav-link"
                  onClick={() => {
                    // Keep it clickable but show dashboard (product page removed)
                    setCurrentPage("dashboard");
                  }}
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

              {/* New navbar button for AI Demand Forecasting */}
              <span className="nav-link" onClick={() => navigate("/ai-demand-forecasting")}>
                AI Demand Forecasting
              </span>

              {/* Reports and Users removed completely */}
              {/* {permissions.menuItems.includes("reports") ? <span className="nav-link">Reports</span> : null} */}
              {/* {permissions.menuItems.includes("users") ? <span className="nav-link">Users</span> : null} */}

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