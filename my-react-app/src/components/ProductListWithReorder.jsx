import "../pages/SmartReorder.css";

const ProductListWithReorder = ({ products }) => (
  <table className="product-table">
    <thead>
      <tr>
        <th>Product Identifier</th>
        <th>Current Node Stock</th>
        <th>AI Recommendation</th>
      </tr>
    </thead>
    <tbody>
      {products.map(p => (
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.currentStock} Units</td>
          <td>
            <span className={p.recommendedQuantity > 0 ? "recommended-positive" : "recommended-zero"}>
              {p.recommendedQuantity > 0 ? `+ ${p.recommendedQuantity} units` : "Stock Optimal"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductListWithReorder;