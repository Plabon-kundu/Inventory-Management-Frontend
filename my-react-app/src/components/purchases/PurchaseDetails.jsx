import React, { useMemo } from "react";

export default function PurchaseDetails({ purchase, products, onClose }) {
  const productMap = useMemo(() => {
    const m = new Map();
    products.forEach((p) => m.set(p.id, p));
    return m;
  }, [products]);

  return (
    <div className="purchase-details">
      <div className="details-header">
        <h3>Purchase Details - PO-{purchase.id.toString().padStart(3, "0")}</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="details-info">
        <p>
          <strong>Date:</strong> {purchase.date}
        </p>
        <p>
          <strong>Supplier:</strong> {purchase.supplier}
        </p>
        <p>
          <strong>Status:</strong> <span className={`status ${purchase.status}`}>{purchase.status}</span>
        </p>
        <p>
          <strong>Total:</strong> ${Number(purchase.total || 0).toLocaleString()}
        </p>
      </div>

      <h4>Items</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {purchase.items.map((item, index) => {
            const p = productMap.get(item.productId);
            return (
              <tr key={index}>
                <td>{p ? p.name : `Product #${item.productId}`}</td>
                <td>{item.quantity}</td>
                <td>${Number(item.unitPrice || 0).toFixed(2)}</td>
                <td>${Number(item.total || 0).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>
              <strong>Grand Total:</strong>
            </td>
            <td>
              <strong>${Number(purchase.total || 0).toLocaleString()}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}