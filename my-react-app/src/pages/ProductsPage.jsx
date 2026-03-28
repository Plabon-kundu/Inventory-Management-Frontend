import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getLowStockProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductModal from "../components/products/ProductModal";
import DeleteConfirmDialog from "../components/products/DeleteConfirmDialog";

// Task 22: Product Listing Page
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [lowStockIds, setLowStockIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Modal state
  const [modal, setModal] = useState(null); // null | { mode: 'create' | 'edit', product?: {} }
  const [deleteTarget, setDeleteTarget] = useState(null); // product to delete

  // Search & filter
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);

  // ─── Data fetching ───────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [allProducts, lowStock] = await Promise.all([
        getProducts(),
        getLowStockProducts(),
      ]);
      setProducts(allProducts || []);
      setLowStockIds(new Set((lowStock || []).map((p) => p.id)));
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ─── Toast helper ────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── CRUD handlers (Task 25: Connect frontend with APIs) ─────────

  // Task 21: Create
  const handleCreate = async (formData) => {
    setActionLoading(true);
    try {
      await createProduct(formData);
      showToast(`Product "${formData.name}" created successfully!`);
      setModal(null);
      fetchAll();
    } catch (err) {
      // Task 20 (SKU uniqueness): backend returns 400 for duplicate SKU
      showToast(err.message || "Failed to create product", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Task 23: Edit
  const handleEdit = async (formData) => {
    setActionLoading(true);
    try {
      await updateProduct(modal.product.id, formData);
      showToast(`Product "${formData.name}" updated successfully!`);
      setModal(null);
      fetchAll();
    } catch (err) {
      showToast(err.message || "Failed to update product", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Task 24: Delete
  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      await deleteProduct(id);
      showToast("Product deleted successfully!");
      setDeleteTarget(null);
      fetchAll();
    } catch (err) {
      showToast(err.message || "Failed to delete product", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Filtered list ───────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterLowStock ? lowStockIds.has(p.id) : true;
    return matchesSearch && matchesFilter;
  });

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="page">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">
            {products.length} total &nbsp;•&nbsp;
            <span className="low-stock-badge">
              {lowStockIds.size} low stock
            </span>
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setModal({ mode: "create" })}
        >
          + Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={filterLowStock}
            onChange={(e) => setFilterLowStock(e.target.checked)}
            className="toggle-checkbox"
          />
          <span>Low Stock Only</span>
        </label>
      </div>

      {/* Content */}
      {loading ? (
        <div className="state-box">
          <div className="spinner spinner-lg" />
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="state-box error-state">
          <p className="error-text">{error}</p>
          <button className="btn btn-secondary" onClick={fetchAll}>
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="state-box">
          <p className="muted-text">
            {search || filterLowStock
              ? "No products match your filters."
              : "No products yet. Click \"Add Product\" to get started."}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const isLow = lowStockIds.has(product.id);
                return (
                  <tr key={product.id} className={isLow ? "row-low-stock" : ""}>
                    <td>
                      <div className="product-name">{product.name}</div>
                      {product.description && (
                        <div className="product-desc">{product.description}</div>
                      )}
                    </td>
                    <td>
                      <span className="sku-badge">{product.sku}</span>
                    </td>
                    <td className="text-right">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="text-right">
                      <span className={isLow ? "stock-low" : ""}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="text-right">{product.reorder_level}</td>
                    <td>
                      {isLow ? (
                        <span className="status-badge status-low">
                          ⚠ Low Stock
                        </span>
                      ) : (
                        <span className="status-badge status-ok">In Stock</span>
                      )}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-icon edit-btn"
                          title="Edit"
                          onClick={() =>
                            setModal({ mode: "edit", product })
                          }
                        >
                          ✏
                        </button>
                        <button
                          className="btn-icon delete-btn"
                          title="Delete"
                          onClick={() => setDeleteTarget(product)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modal && (
        <ProductModal
          mode={modal.mode}
          product={modal.product}
          onSubmit={modal.mode === "create" ? handleCreate : handleEdit}
          onClose={() => setModal(null)}
          loading={actionLoading}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <DeleteConfirmDialog
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default ProductsPage;
