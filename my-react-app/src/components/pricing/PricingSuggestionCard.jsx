// Task #105: Pricing Suggestion Panel
// Displays all AI-generated pricing data for one product

const ActionConfig = {
  increase: {
    label: "Increase Price",
    color: "var(--success)",
    bg: "var(--success-light)",
    icon: "↑",
    border: "#bbf7d0",
  },
  decrease: {
    label: "Decrease Price",
    color: "var(--danger)",
    bg: "var(--danger-light)",
    icon: "↓",
    border: "#fecaca",
  },
  hold: {
    label: "Hold Price",
    color: "var(--accent)",
    bg: "var(--accent-light)",
    icon: "→",
    border: "#c7d2fe",
  },
};

const PricingSuggestionCard = ({ data, onViewDetail }) => {
  const action = ActionConfig[data.action] || ActionConfig.hold;
  const priceDiff = (data.suggested_price - data.current_price).toFixed(2);
  const priceDiffPct = (
    ((data.suggested_price - data.current_price) / data.current_price) *
    100
  ).toFixed(1);

  return (
    <div className="pricing-card">
      {/* Card Header */}
      <div className="pricing-card-header">
        <div>
          <div className="pricing-product-name">{data.product_name}</div>
          <span className="sku-badge">{data.sku}</span>
        </div>
        <span
          className="action-tag"
          style={{
            background: action.bg,
            color: action.color,
            border: `1px solid ${action.border}`,
          }}
        >
          {action.icon} {action.label}
        </span>
      </div>

      {/* Price Row */}
      <div className="pricing-price-row">
        <div className="pricing-price-block">
          <span className="pricing-label">Current Price</span>
          <span className="pricing-current">${data.current_price.toFixed(2)}</span>
        </div>
        <div className="pricing-arrow">→</div>
        <div className="pricing-price-block">
          <span className="pricing-label">Suggested Price</span>
          <span
            className="pricing-suggested"
            style={{ color: action.color }}
          >
            ${data.suggested_price.toFixed(2)}
          </span>
        </div>
        <div className="pricing-diff-block">
          <span
            className="pricing-diff"
            style={{ color: action.color, background: action.bg }}
          >
            {priceDiff > 0 ? "+" : ""}
            {priceDiff} ({priceDiffPct}%)
          </span>
        </div>
      </div>

      {/* Metrics Row — #96 COGS, #97 Velocity, #98 Aging */}
      <div className="pricing-metrics">
        <div className="pricing-metric">
          <span className="metric-label">Avg COGS</span>
          <span className="metric-value">${data.cogs.toFixed(2)}</span>
        </div>
        <div className="pricing-metric">
          <span className="metric-label">Sales Velocity</span>
          <span className="metric-value">{data.sales_velocity} /day</span>
        </div>
        <div className="pricing-metric">
          <span className="metric-label">Stock Age</span>
          <span
            className="metric-value"
            style={{ color: data.aging_days > 60 ? "var(--warning)" : "inherit" }}
          >
            {data.aging_days}d
            {data.aging_days > 60 && " ⚠"}
          </span>
        </div>
        {data.discount_percentage > 0 && (
          <div className="pricing-metric">
            <span className="metric-label">Discount</span>
            <span className="metric-value" style={{ color: "var(--danger)" }}>
              {data.discount_percentage}% off
            </span>
          </div>
        )}
      </div>

      {/* Explanation — #103 */}
      <div className="pricing-explanation">
        <span className="explanation-icon">💡</span>
        <p>{data.explanation}</p>
      </div>

      {/* Bundle suggestion — #106 */}
      {data.bundle && (
        <div className="bundle-section">
          <div className="bundle-header">
            <span className="bundle-icon">📦</span>
            <span className="bundle-title">Bundle Recommendation</span>
          </div>
          <div className="bundle-products">
            {data.bundle.products.map((p, i) => (
              <span key={i} className="bundle-product-tag">
                {p}
              </span>
            ))}
          </div>
          <div className="bundle-pricing">
            <span>
              Bundle Price:{" "}
              <strong>${data.bundle.suggested_bundle_price.toFixed(2)}</strong>
            </span>
            <span className="bundle-savings">
              Save ${data.bundle.savings.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <button
        className="btn btn-secondary pricing-detail-btn"
        onClick={() => onViewDetail(data)}
      >
        View Details
      </button>
    </div>
  );
};

export default PricingSuggestionCard;
