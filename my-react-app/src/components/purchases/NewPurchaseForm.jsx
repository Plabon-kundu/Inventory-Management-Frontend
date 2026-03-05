import React, { useState } from "react";

export default function NewPurchaseForm({ products, warehouses, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    productId: "",
    warehouseId: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productId) newErrors.productId = "Please select a product";
    if (!formData.warehouseId) newErrors.warehouseId = "Please select a warehouse";

    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    else if (Number.isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    } else if (!Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a whole number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit(formData);

    setFormData({ productId: "", warehouseId: "", quantity: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    if (errors[name]) {
      setErrors((s) => ({ ...s, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="purchase-form-group">
        <label>Product *</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className={`purchase-form-control ${errors.productId ? "purchase-error" : ""}`}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>
        {errors.productId ? <div className="purchase-error-message">{errors.productId}</div> : null}
      </div>

      <div className="purchase-form-group">
        <label>Warehouse *</label>
        <select
          name="warehouseId"
          value={formData.warehouseId}
          onChange={handleChange}
          className={`purchase-form-control ${errors.warehouseId ? "purchase-error" : ""}`}
        >
          <option value="">Select a warehouse</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
        {errors.warehouseId ? <div className="purchase-error-message">{errors.warehouseId}</div> : null}
      </div>

      <div className="purchase-form-group">
        <label>Purchase Quantity *</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className={`purchase-form-control ${errors.quantity ? "purchase-error" : ""}`}
          placeholder="Enter quantity"
          min="1"
          step="1"
        />
        {errors.quantity ? <div className="purchase-error-message">{errors.quantity}</div> : null}
      </div>

      <button className="purchase-btn" type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Record Purchase"}
      </button>
    </form>
  );
}