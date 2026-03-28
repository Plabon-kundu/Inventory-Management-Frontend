// Detailed pricing breakdown modal
// Shows full AI reasoning, metrics, discount and bundle info

const PricingDetailModal = ({ data, onClose }) => {
  if (!data) return null;

  const margin = (
    ((data.suggested_price - data.cogs) / data.suggested_price) *
    100
  ).toFixed(1);

  const currentMargin = (
    ((data.current_price - data.cogs) / data.current_price) *
    100
  ).toFixed(1);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box pricing-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Pricing Analysis</h2>
            <p className="modal-title-sub">
              {data.product_name} &nbsp;·&nbsp;
              <span className="sku-badge">{data.sku}</span>
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Price comparison */}
          <div className="detail-section">
            <h3 className="detail-section-title">Price Recommendation</h3>
            <div className="detail-price-grid">
              <div className="detail-price-cell">
                <span className="detail-price-label">Current Price</span>
                <span className="detail-price-val">${data.current_price.toFixed(2)}</span>
                <span className="detail-margin-label">Margin: {currentMargin}%</span>
              </div>
              <div className="detail-arrow">→</div>
              <div className="detail-price-cell highlight">
                <span className="detail-price-label">Suggested Price</span>
                <span className="detail-price-val suggested">${data.suggested_price.toFixed(2)}</span>
                <span className="detail-margin-label">Margin: {margin}%</span>
              </div>
            </div>
          </div>

          {/* AI Metrics breakdown */}
          <div className="detail-section">
            <h3 className="detail-section-title">AI Analysis Breakdown</h3>
            <div className="detail-metrics-list">
              <div className="detail-metric-row">
                <div className="detail-metric-left">
                  <span className="detail-metric-icon">💰</span>
                  <div>
                    <span className="detail-metric-name">Weighted Avg COGS</span>
                    <span className="detail-metric-desc">Cost of goods sold (#96)</span>
                  </div>
                </div>
                <span className="detail-metric-val">${data.cogs.toFixed(2)}</span>
              </div>

              <div className="detail-metric-row">
                <div className="detail-metric-left">
                  <span className="detail-metric-icon">⚡</span>
                  <div>
                    <span className="detail-metric-name">Sales Velocity</span>
                    <span className="detail-metric-desc">Units sold per day (#97)</span>
                  </div>
                </div>
                <span className="detail-metric-val">{data.sales_velocity} units/day</span>
              </div>

              <div className="detail-metric-row">
                <div className="detail-metric-left">
                  <span className="detail-metric-icon">🕐</span>
                  <div>
                    <span className="detail-metric-name">Inventory Age</span>
                    <span className="detail-metric-desc">Days in stock (#98)</span>
                  </div>
                </div>
                <span
                  className="detail-metric-val"
                  style={{ color: data.aging_days > 60 ? "var(--warning)" : "inherit" }}
                >
                  {data.aging_days} days
                  {data.aging_days > 60 && " (aging)"}
                </span>
              </div>

              {data.discount_percentage > 0 && (
                <div className="detail-metric-row">
                  <div className="detail-metric-left">
                    <span className="detail-metric-icon">🏷️</span>
                    <div>
                      <span className="detail-metric-name">Suggested Discount</span>
                      <span className="detail-metric-desc">To stimulate demand (#101)</span>
                    </div>
                  </div>
                  <span className="detail-metric-val" style={{ color: "var(--danger)" }}>
                    {data.discount_percentage}% off
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="detail-section">
            <h3 className="detail-section-title">AI Explanation</h3>
            <div className="detail-explanation">
              <span className="explanation-icon">💡</span>
              <p>{data.explanation}</p>
            </div>
          </div>

          {/* Bundle — Task #106 */}
          {data.bundle && (
            <div className="detail-section">
              <h3 className="detail-section-title">Bundle Recommendation</h3>
              <div className="bundle-detail">
                <div className="bundle-detail-products">
                  {data.bundle.products.map((p, i) => (
                    <div key={i} className="bundle-detail-item">
                      <span className="bundle-check">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div className="bundle-detail-pricing">
                  <div className="bundle-detail-row">
                    <span>Bundle Price</span>
                    <strong>${data.bundle.suggested_bundle_price.toFixed(2)}</strong>
                  </div>
                  <div className="bundle-detail-row">
                    <span>Customer Savings</span>
                    <span style={{ color: "var(--success)" }}>
                      −${data.bundle.savings.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions" style={{ padding: "0 24px 24px" }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailModal;
