// src/components/purchases/PurchasesContent.jsx
// Change applied:
// - Added a "Stock OUT" button in Stock IN module header (UI only).
// Everything else remains the same.

import React, { useMemo, useState } from "react";
import NewPurchaseForm from "./NewPurchaseForm";
import PurchaseHistory from "./PurchaseHistory";
import "./purchases.css";

const MOCK_WAREHOUSES = [
  { id: 1, name: "Main Warehouse", location: "New York" },
  { id: 2, name: "North Warehouse", location: "Los Angeles" },
  { id: 3, name: "South Warehouse", location: "Chicago" },
];

export default function PurchasesContent({
  user,
  products,
  purchases,
  onProductsChange,
  onPurchasesChange,
}) {
  const warehouses = useMemo(() => MOCK_WAREHOUSES, []);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    window.setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handlePurchase = async (formData) => {
    setIsLoading(true);

    // Simulate API delay (like your HTML demo)
    window.setTimeout(() => {
      try {
        const product = products.find((p) => p.id === Number(formData.productId));
        const warehouse = warehouses.find((w) => w.id === Number(formData.warehouseId));
        const quantity = Number(formData.quantity);

        if (!product || !warehouse) throw new Error("Invalid product or warehouse");
        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new Error("Quantity must be a positive whole number");
        }

        // Update stock
        const nextProducts = products.map((p) =>
          p.id === product.id ? { ...p, stock: Number(p.stock || 0) + quantity } : p
        );

        // Create purchase record
        const newPurchase = {
          id: (purchases?.length || 0) + 1,
          date: new Date().toISOString().split("T")[0],
          productId: product.id,
          productName: product.name,
          warehouseId: warehouse.id,
          warehouseName: warehouse.name,
          quantity,
          status: "completed",
          createdBy: user?.name || "Unknown",
        };

        onProductsChange(nextProducts);
        onPurchasesChange([newPurchase, ...(purchases || [])]);

        showAlert("success", "Purchase recorded successfully! Stock updated.");
      } catch (e) {
        showAlert("error", e.message || "Failed to record purchase");
      } finally {
        setIsLoading(false);
      }
    }, 900);
  };

  const totalPurchases = (purchases || []).length;
  const totalItemsPurchased = (purchases || []).reduce((sum, p) => sum + Number(p.quantity || 0), 0);
  const uniqueProducts = new Set((purchases || []).map((p) => p.productId)).size;

  const handleStockOutClick = () => {
    // UI only (page not implemented)
    alert("Stock OUT (Coming soon)");
  };

  return (
    <div className="purchase-page">
      <div className="purchase-container">
        {/* Header */}
        <div className="purchase-header">
          <h1>Purchase Management (Stock IN) Module</h1>
          <p>Record product purchases into a warehouse (Role-based access)</p>
        </div>

        {/* Alert */}
        {alert.show ? (
          <div
            className={`purchase-alert ${
              alert.type === "success" ? "purchase-alert-success" : "purchase-alert-error"
            }`}
          >
            {alert.message}
          </div>
        ) : null}

        {/* Stats */}
        <div className="purchase-stats-grid">
          <div className="purchase-stat-item">
            <div className="purchase-stat-value">{totalPurchases}</div>
            <div className="purchase-stat-label">Total Purchases</div>
          </div>

          <div className="purchase-stat-item">
            <div className="purchase-stat-value">{totalItemsPurchased}</div>
            <div className="purchase-stat-label">Items Purchased</div>
          </div>

          <div className="purchase-stat-item">
            <div className="purchase-stat-value">{uniqueProducts}</div>
            <div className="purchase-stat-label">Products</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="purchase-main-grid">
          {/* Form Card */}
          <div className="purchase-card">
            <div className="purchase-card-header">
              <h2>New Purchase Entry</h2>

              {/* ✅ Stock IN badge + Stock OUT button */}
              <div className="purchase-header-actions">
                <span className="purchase-badge">Stock IN</span>

                <button type="button" className="purchase-badge purchase-badge-secondary" onClick={handleStockOutClick}>
                  Stock OUT
                </button>
              </div>
            </div>

            <NewPurchaseForm
              products={products}
              warehouses={warehouses}
              onSubmit={handlePurchase}
              isLoading={isLoading}
            />
          </div>

          {/* History Card */}
          <div className="purchase-card">
            <div className="purchase-card-header">
              <h2>Purchase History</h2>
              <span className="purchase-badge">Recent Transactions</span>
            </div>

            {isLoading ? <div className="purchase-spinner" /> : <PurchaseHistory purchases={purchases || []} />}
          </div>
        </div>

        {/* Stock Status */}
        <div className="purchase-card purchase-mt-20">
          <div className="purchase-card-header">
            <h2>Current Stock Status</h2>
            <span className="purchase-badge">Live Update</span>
          </div>

          <div className="purchase-table-container">
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => {
                  const inStock = Number(p.stock || 0) > 100;
                  return (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span
                          className="purchase-status-badge"
                          style={{ background: inStock ? "#4caf50" : "#ff9800" }}
                        >
                          {inStock ? "In Stock" : "Low Stock"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}