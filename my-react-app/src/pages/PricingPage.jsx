import { useState, useEffect, useCallback } from "react";
import { getAllPricingSuggestions } from "../services/pricingService";
import PricingSuggestionCard from "../components/pricing/PricingSuggestionCard";
import PricingDetailModal from "../components/pricing/PricingDetailModal";

// Task #105: Pricing Suggestion Panel (page level)
// Task #106: Bundle suggestions shown inside each card
// Task #107: Connected to pricingService (JSONPlaceholder now, real API later)
const PricingPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [filterAction, setFilterAction] = useState("all");
  const [search, setSearch] = useState("");

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPricingSuggestions();
      setSuggestions(data || []);
    } catch (err) {
      setError(err.message || "Failed to load pricing suggestions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  // Filter & search
  const filtered = suggestions.filter((s) => {
    const matchAction = filterAction === "all" || s.action === filterAction;
    const matchSearch =
      s.product_name.toLowerCase().includes(search.toLowerCase()) ||
      s.sku.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchSearch;
  });

  const counts = {
    all: suggestions.length,
    increase: suggestions.filter((s) => s.action === "increase").length,
    decrease: suggestions.filter((s) => s.action === "decrease").length,
    hold: suggestions.filter((s) => s.action === "hold").length,
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Pricing Suggestions</h1>
          <p className="page-subtitle">
            AI-powered pricing recommendations based on COGS, sales velocity &
            inventory aging
            <span className="mock-badge"> ● Using mock data</span>
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchSuggestions}>
          ↻ Refresh
        </button>
      </div>

      {/* Summary stats */}
      {!loading && !error && (
        <div className="pricing-stats-row">
          <div className="pricing-stat-card">
            <span className="stat-num">{counts.all}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="pricing-stat-card stat-increase">
            <span className="stat-num" style={{ color: "var(--success)" }}>
              {counts.increase}
            </span>
            <span className="stat-label">↑ Price Increase</span>
          </div>
          <div className="pricing-stat-card stat-decrease">
            <span className="stat-num" style={{ color: "var(--danger)" }}>
              {counts.decrease}
            </span>
            <span className="stat-label">↓ Price Decrease</span>
          </div>
          <div className="pricing-stat-card stat-hold">
            <span className="stat-num" style={{ color: "var(--accent)" }}>
              {counts.hold}
            </span>
            <span className="stat-label">→ Hold Price</span>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by product or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Action filter tabs */}
        <div className="filter-tabs">
          {["all", "increase", "decrease", "hold"].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filterAction === tab ? "filter-tab-active" : ""}`}
              onClick={() => setFilterAction(tab)}
            >
              {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="filter-tab-count">{counts[tab]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="state-box">
          <div className="spinner spinner-lg" />
          <p>Calculating pricing suggestions...</p>
        </div>
      ) : error ? (
        <div className="state-box error-state">
          <p className="error-text">{error}</p>
          <button className="btn btn-secondary" onClick={fetchSuggestions}>
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="state-box">
          <p className="muted-text">No products match your filters.</p>
        </div>
      ) : (
        <div className="pricing-cards-grid">
          {filtered.map((suggestion) => (
            <PricingSuggestionCard
              key={suggestion.product_id}
              data={suggestion}
              onViewDetail={setSelectedDetail}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedDetail && (
        <PricingDetailModal
          data={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
};

export default PricingPage;
