import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/WarehouseList.css";

const WarehouseList = () => {
  const location = useLocation();

  const [warehouses, setWarehouses] = useState([
    { id: 1, name: "Dhaka Warehouse", location: "Dhaka", description: "Main distribution center for the capital region." },
    { id: 2, name: "Chittagong Warehouse", location: "Chittagong", description: "Primary port-side facility for international shipping." },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      setWarehouses(warehouses.filter((wh) => wh.id !== id));
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="glow-circle top-right"></div>
      <div className="glow-circle bottom-left"></div>

      <aside className="glass-sidebar">
        <div className="logo">STOCK<span>FLOW</span></div>
        <nav>
         
          
          <Link
            to="/movement-logs"
            className={`nav-item ${location.pathname === "/movement-logs" ? "active" : ""}`}
          >
          Inventory-Movement
          </Link>
        </nav>
      </aside>

      <main className="main-viewport">
        <div className="viewport-content-container">
          
          <header className="page-header">
            <div className="title-area">
              <h1>Warehouse <span>Hub</span></h1>
              <p>Monitoring {warehouses.length} active logistics nodes</p>
            </div>
            {/* New Warehouse Button */}
            <Link to="/warehouses/create" className="glowing-button">
              + New Warehouse
            </Link>
          </header>

          <div className="stats-row">
            <div className="stat-mini-card">
              <span>Total Nodes</span>
              <strong>0{warehouses.length}</strong>
            </div>
            <div className="stat-mini-card">
              <span>System Health</span>
              <strong>99.9%</strong>
            </div>
            <div className="stat-mini-card">
              <span>Region</span>
              <strong>Asia/BD</strong>
            </div>
          </div>

          <div className="glass-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Entity Name</th>
                  <th>Region</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((wh) => (
                  <tr key={wh.id}>
                    <td className="bold-blue">{wh.name}</td>
                    <td><span className="pill">{wh.location}</span></td>
                    <td className="muted-text">{wh.description}</td>
                    <td>
                      <div className="actions-flex">
                        <Link className="action-pill edit-pill" to={`/warehouses/edit/${wh.id}`}>
                          <span className="btn-icon">✎</span> Edit
                        </Link>
                        <button className="action-pill delete-pill" onClick={() => handleDelete(wh.id)}>
                          <span className="btn-icon">🗑</span> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default WarehouseList;