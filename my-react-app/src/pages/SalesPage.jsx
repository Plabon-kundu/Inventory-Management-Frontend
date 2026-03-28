import { useState, useEffect, useCallback } from "react";
import { getSalesHistory, createStockOut } from "../services/salesService";
import SalesModal from "../components/sales/SalesModal";

// Task 60: Sales History Page
// Task 59: Connected to POST /stock-out API
const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  // ─── Fetch sales history ──────────────────────────
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSalesHistory();
      setSales(data || []);
    } catch (err) {
      // History endpoint may not be ready yet — show empty gracefully
      if (err.message.includes("404") || err.message.includes("fetch")) {
        setSales([]);
      } else {
        setError(err.message || "Failed to load sales history");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // ─── Toast ────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── Task 59: Create stock-out (POST /stock-out) ──
  const handleSaleSubmit = async (formData) => {
    setActionLoading(true);
    try {
      await createStockOut(formData);
      showToast("Sale recorded successfully! Stock updated.");
      setShowModal(false);
      fetchSales();
    } catch (err) {
      // Task 54: Backend returns error if stock goes negative
      showToast(err.message || "Failed to record sale", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Filter ───────────────────────────────────────
  const filtered = sales.filter((s) => {
    const q = search.toLowerCase();
    return (
      String(s.product_id).includes(q) ||
      (s.product_name || "").toLowerCase().includes(q) ||
      (s.reason || "").toLowerCase().includes(q) ||
      (s.warehouse_name || String(s.warehouse_id) || "").toLowerCase().includes(q)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ─── Render ───────────────────────────────────────
  return (
    <div className="page">
      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales</h1>
          <p className="page-subtitle">
            {sales.length} total transactions &nbsp;•&nbsp;
            <span className="sales-accent">Stock OUT records</span>
          </p>
        </div>
        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          + Record Sale
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
            placeholder="Search by product, warehouse or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="state-box">
          <div className="spinner spinner-lg" />
          <p>Loading sales history...</p>
        </div>
      ) : error ? (
        <div className="state-box error-state">
          <p className="error-text">{error}</p>
          <button className="btn btn-secondary" onClick={fetchSales}>
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="state-box">
          <div className="empty-sales-icon">📦</div>
          <p className="muted-text">
            {search
              ? "No sales match your search."
              : 'No sales recorded yet. Click "Record Sale" to get started.'}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Warehouse</th>
                <th className="text-right">Qty Sold</th>
                <th>Reason</th>
                <th>Date & Time</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sale, idx) => (
                <tr key={sale.id || idx}>
                  <td className="row-id">#{sale.id || idx + 1}</td>
                  <td>
                    <div className="product-name">
                      {sale.product_name || `Product #${sale.product_id}`}
                    </div>
                    {sale.sku && (
                      <span className="sku-badge">{sale.sku}</span>
                    )}
                  </td>
                  <td>
                    {sale.warehouse_name || `Warehouse #${sale.warehouse_id}`}
                  </td>
                  <td className="text-right">
                    <span className="qty-out">−{sale.quantity}</span>
                  </td>
                  <td>
                    <span className="reason-badge">{sale.reason}</span>
                  </td>
                  <td className="date-cell">{formatDate(sale.created_at)}</td>
                  <td className="text-muted">
                    {sale.user_id ? `User #${sale.user_id}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sales Modal */}
      {showModal && (
        <SalesModal
          onSubmit={handleSaleSubmit}
          onClose={() => setShowModal(false)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default SalesPage;
