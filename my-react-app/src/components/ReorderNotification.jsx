import { useEffect, useState } from "react";
import "../styles/SmartReorder.css";

const ReorderNotification = ({ products }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const needReorder = products.filter(
      (p) => p.reorder_recommended
    );

    if (needReorder.length > 0) {
      const productNames = needReorder
        .map((p) => p.product_name)
        .join(", ");

      const message =
        needReorder.length === 1
          ? `Replenishment required: ${needReorder[0].product_name}`
          : `System Alert: ${productNames} require stock replenishment`;

      setNotification({ count: needReorder.length, message });

      const timer = setTimeout(() => setNotification(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  if (!notification) return null;

  return (
    <div className="toast-container">
      <div
        className={`toast-standard ${
          notification.count > 1 ? "priority-alert" : ""
        }`}
      >
        <div className="status-indicator"></div>
        <div className="toast-content">
          <span className="toast-title">Inventory Intelligence</span>
          <p className="toast-msg">{notification.message}</p>
        </div>
        <button
          className="toast-close"
          onClick={() => setNotification(null)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ReorderNotification;