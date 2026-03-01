import { useState } from "react";
import MovementLogTable from "../components/MovementLogTable";
import MovementFilter from "../components/MovementFilter";
import "./MovementLogs.css";

const MovementLogs = () => {
  const [logs] = useState([
    { id: 1, product: "Laptop", warehouse: "Dhaka Warehouse", user: "Admin", type: "SALE", quantity: 5, timestamp: "2026-02-26 10:30 AM" },
    { id: 2, product: "Mouse", warehouse: "Chittagong Warehouse", user: "Manager", type: "PURCHASE", quantity: 20, timestamp: "2026-02-25 03:15 PM" },
    { id: 3, product: "Keyboard", warehouse: "Dhaka Warehouse", user: "Admin", type: "SALE", quantity: 3, timestamp: "2026-02-24 01:10 PM" },
  ]);

  const [filterType, setFilterType] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredLogs = logs.filter(log => {
    const typeMatch = filterType === "" || log.type === filterType;
    const productMatch = filterProduct === "" || log.product.toLowerCase().includes(filterProduct.toLowerCase());
    const dateMatch = filterDate === "" || log.timestamp.startsWith(filterDate);
    return typeMatch && productMatch && dateMatch;
  });

  return (
    <div className="movement-page-wrapper">
      {/* Immersive Background Decor */}
      <div className="glow-circle top-right"></div>
      <div className="glow-circle bottom-left"></div>

      <div className="movement-content-container">
        <header className="movement-header">
          <h2 className="page-title">Inventory <span>Movement History</span></h2>
          <p>Real-time telemetry of assets across the node network.</p>
        </header>

        <div className="movement-glass-panel">
          <div className="filter-section-wrapper">
            <MovementFilter
              filterType={filterType}
              setFilterType={setFilterType}
              filterProduct={filterProduct}
              setFilterProduct={setFilterProduct}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
            />
          </div>

          <div className="table-wrapper">
            {filteredLogs.length === 0 ? (
              <div className="no-records-glass">
                <p>No telemetry found for the selected parameters.</p>
              </div>
            ) : (
              <MovementLogTable logs={filteredLogs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementLogs;