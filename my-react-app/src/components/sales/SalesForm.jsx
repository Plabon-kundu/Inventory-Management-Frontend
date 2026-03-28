import { useState, useEffect } from "react";
import { getProductsList, getWarehousesList } from "../../services/salesService";

const INITIAL_FORM = {
  product_id: "",
  warehouse_id: "",
  quantity: "",
  reason: "Customer Sale",
};

const REASON_OPTIONS = [
  "Customer Sale",
  "Bulk Order",
  "Return Adjustment",
  "Damaged Goods",
  "Internal Use",
  "Other",
];

// Task 58: Sales Entry Form
// Task 57: Validates positive quantity input before submit
const SalesForm = ({ onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(true);

  useEffect(() => {
    const loadDropdowns = async () => {
      setDropdownLoading(true);
      try {
        const [prods, warehs] = await Promise.all([
          getProductsList(),
          getWarehousesList(),
        ]);
        setProducts(prods || []);
        setWarehouses(warehs || []);
      } catch {
        // If warehouses endpoint isn't ready yet, still show products
        try {
          const prods = await getProductsList();
          setProducts(prods || []);
        } catch {
          setProducts([]);
        }
        setWarehouses([]);
      } finally {
        setDropdownLoading(false);
      }
    };
    loadDropdowns();
  }, []);

  // Task 57: Validate positive quantity input
  const validate = () => {
    const e = {};
    if (!form.product_id) e.product_id = "Please select a product";
    if (!form.warehouse_id) e.warehouse_id = "Please select a warehouse";
    if (form.quantity === "" || isNaN(form.quantity))
      e.quantity = "Quantity is required";
    else if (Number(form.quantity) <= 0)
      e.quantity = "Quantity must be a positive number"; // Task 57
    else if (!Number.isInteger(Number(form.quantity)))
      e.quantity = "Quantity must be a whole number";
    if (!form.reason.trim()) e.reason = "Reason is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Send exact shape the backend expects
    onSubmit({
      product_id: parseInt(form.product_id),
      warehouse_id: parseInt(form.warehouse_id),
      quantity: parseInt(form.quantity),
      reason: form.reason.trim(),
    });
  };

  const selectedProduct = products.find(
    (p) => p.id === parseInt(form.product_id)
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {dropdownLoading ? (
        <div className="form-loading">
          <span className="spinner spinner-accent" />
          <span>Loading products & warehouses...</span>
        </div>
      ) : (
        <>
          <div className="form-grid">
            {/* Product selector */}
            <div className="form-group col-span-2">
              <label htmlFor="product_id" className="form-label">
                Product <span className="required">*</span>
              </label>
              <select
                id="product_id"
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                className={`form-input form-select ${
                  errors.product_id ? "input-error" : ""
                }`}
              >
                <option value="">— Select a product —</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku}) — Stock: {p.stock}
                  </option>
                ))}
              </select>
              {errors.product_id && (
                <span className="error-msg">{errors.product_id}</span>
              )}
              {/* Live stock preview */}
              {selectedProduct && (
                <div
                  className={`stock-preview ${
                    selectedProduct.stock <= selectedProduct.reorder_level
                      ? "stock-preview-warn"
                      : "stock-preview-ok"
                  }`}
                >
                  {selectedProduct.stock <= selectedProduct.reorder_level ? (
                    <>⚠ Low stock — only {selectedProduct.stock} units available</>
                  ) : (
                    <>✓ {selectedProduct.stock} units currently in stock</>
                  )}
                </div>
              )}
            </div>

            {/* Warehouse selector */}
            <div className="form-group col-span-2">
              <label htmlFor="warehouse_id" className="form-label">
                Warehouse <span className="required">*</span>
              </label>
              {warehouses.length > 0 ? (
                <select
                  id="warehouse_id"
                  name="warehouse_id"
                  value={form.warehouse_id}
                  onChange={handleChange}
                  className={`form-input form-select ${
                    errors.warehouse_id ? "input-error" : ""
                  }`}
                >
                  <option value="">— Select a warehouse —</option>
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              ) : (
                // Fallback: manual input if warehouse API not ready yet
                <input
                  id="warehouse_id"
                  name="warehouse_id"
                  type="number"
                  min={1}
                  value={form.warehouse_id}
                  onChange={handleChange}
                  placeholder="Enter warehouse ID (e.g. 1)"
                  className={`form-input ${
                    errors.warehouse_id ? "input-error" : ""
                  }`}
                />
              )}
              {errors.warehouse_id && (
                <span className="error-msg">{errors.warehouse_id}</span>
              )}
            </div>

            {/* Quantity — Task 57: must be positive */}
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity <span className="required">*</span>
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                step={1}
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 5"
                className={`form-input ${errors.quantity ? "input-error" : ""}`}
              />
              {errors.quantity && (
                <span className="error-msg">{errors.quantity}</span>
              )}
              {!errors.quantity && (
                <span className="hint-msg">Must be a positive whole number</span>
              )}
            </div>

            {/* Reason */}
            <div className="form-group">
              <label htmlFor="reason" className="form-label">
                Reason <span className="required">*</span>
              </label>
              <select
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className={`form-input form-select ${
                  errors.reason ? "input-error" : ""
                }`}
              >
                {REASON_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <span className="error-msg">{errors.reason}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" /> Recording Sale...
                </>
              ) : (
                "Record Sale"
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default SalesForm;
