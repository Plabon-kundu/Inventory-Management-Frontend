import React from "react";

export default function PurchaseHistory({ purchases }) {
  if (!purchases || purchases.length === 0) {
    return (
      <div className="purchase-empty">
        <p>No purchase transactions yet</p>
      </div>
    );
  }

  return (
    <div className="purchase-table-container">
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((p) => (
            <tr key={p.id}>
              <td>{p.date}</td>
              <td>{p.productName}</td>
              <td>{p.warehouseName}</td>
              <td>{p.quantity}</td>
              <td>
                <span className="purchase-status-badge" style={{ background: "#4caf50" }}>
                  Completed
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}