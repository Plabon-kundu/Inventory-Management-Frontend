import "../styles/SmartReorder.css";

const ProductListWithReorder = ({ products }) => (
  <table className="product-table">
    <thead>
      <tr>
        <th>Product Identifier</th>
        <th>Current Stock</th>
        <th>Stock Covers (Days)</th>
        <th>AI Recommendation</th>
        <th>Urgency</th>
        <th>Confidence</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.product_id}>
          <td>{p.product_name}</td>
          <td>{p.current_stock} Units</td>
          <td>{p.stock_covers_days} days</td>
          <td>
            <span
              className={
                p.reorder_recommended
                  ? "recommended-positive"
                  : "recommended-zero"
              }
            >
              {p.reorder_recommended
                ? `+ ${p.reorder_quantity} units`
                : "Stock Optimal"}
            </span>
          </td>
          <td>{p.urgency}</td>
          <td>{Math.round(p.confidence * 100)}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductListWithReorder;