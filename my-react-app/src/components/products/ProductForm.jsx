import { useState, useEffect } from "react";

const INITIAL_FORM = {
  name: "",
  sku: "",
  price: "",
  description: "",
  stock: "",
  reorder_level: "",
};

// Task 21: Product Creation Form  |  Task 23: Product Edit UI
const ProductForm = ({ initialData = null, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        sku: initialData.sku || "",
        price: initialData.price ?? "",
        description: initialData.description || "",
        stock: initialData.stock ?? "",
        reorder_level: initialData.reorder_level ?? "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.sku.trim()) e.sku = "SKU is required";
    else if (!/^[A-Za-z0-9\-_]+$/.test(form.sku))
      e.sku = "SKU can only contain letters, numbers, hyphens, underscores";
    if (form.price === "" || isNaN(form.price) || Number(form.price) < 0)
      e.price = "Valid price is required";
    if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0)
      e.stock = "Valid stock quantity is required";
    if (
      form.reorder_level === "" ||
      isNaN(form.reorder_level) ||
      Number(form.reorder_level) < 0
    )
      e.reorder_level = "Valid reorder level is required";
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
    onSubmit({
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      price: parseFloat(form.price),
      description: form.description.trim(),
      stock: parseInt(form.stock),
      reorder_level: parseInt(form.reorder_level),
    });
  };

  const fields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      placeholder: "e.g. Widget Pro",
      col: 2,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "e.g. WGT-001",
      col: 1,
      hint: isEdit ? "Changing SKU must remain unique" : "Must be unique",
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      placeholder: "0.00",
      col: 1,
      min: 0,
      step: "0.01",
    },
    {
      name: "stock",
      label: "Stock Quantity",
      type: "number",
      placeholder: "0",
      col: 1,
      min: 0,
    },
    {
      name: "reorder_level",
      label: "Reorder Level",
      type: "number",
      placeholder: "10",
      col: 1,
      min: 0,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Optional product description...",
      col: 2,
    },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`form-group ${field.col === 2 ? "col-span-2" : ""}`}
          >
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.name !== "description" && (
                <span className="required">*</span>
              )}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`form-input form-textarea ${
                  errors[field.name] ? "input-error" : ""
                }`}
                rows={3}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                className={`form-input ${
                  errors[field.name] ? "input-error" : ""
                }`}
              />
            )}

            {errors[field.name] && (
              <span className="error-msg">{errors[field.name]}</span>
            )}
            {field.hint && !errors[field.name] && (
              <span className="hint-msg">{field.hint}</span>
            )}
          </div>
        ))}
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" />
              {isEdit ? "Saving..." : "Creating..."}
            </>
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
