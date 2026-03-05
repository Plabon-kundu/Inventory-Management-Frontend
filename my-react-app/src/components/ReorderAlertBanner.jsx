import "../styles/SmartReorder.css";

const ReorderAlertBanner = ({ products }) => {
  const reorderCount = products.filter(
    (p) => p.reorder_recommended
  ).length;

  if (reorderCount === 0) return null;

  return (
    <div className="reorder-alert-banner">
      <div className="alert-dot"></div>
      <div className="alert-message">
        <span>{reorderCount}</span>
        {reorderCount === 1
          ? " Product Requires Reordering"
          : " Products Require Reordering"}
      </div>
    </div>
  );
};

export default ReorderAlertBanner;