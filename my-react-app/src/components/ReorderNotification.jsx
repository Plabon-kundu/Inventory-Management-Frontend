import { useEffect, useState } from "react";
import "../pages/SmartReorder.css";

const ReorderNotification = ({ products }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Filter for items that actually need reordering
    const needReorder = products.filter((p) => p.recommendedQuantity > 0);

    if (needReorder.length > 0) {
      // 1. Get the names of all products needing reorder
      const productNames = needReorder.map(p => p.name).join(", ");

      // 2. Create the dynamic message
      const message = needReorder.length === 1 
        ? `Replenishment required: ${needReorder[0].name}` 
        : `System Alert: ${productNames} require stock replenishment`;

      setNotification({ count: needReorder.length, message });

      // Auto-hide after 7 seconds (slightly longer so you can read the names)
      const timer = setTimeout(() => setNotification(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  if (!notification) return null;

  return (
    <div className="toast-container">
      <div className={`toast-standard ${notification.count > 1 ? "priority-alert" : ""}`}>
        <div className="status-indicator"></div>
        <div className="toast-content">
          <span className="toast-title">Inventory Intelligence</span>
          <p className="toast-msg">{notification.message}</p>
        </div>
        <button className="toast-close" onClick={() => setNotification(null)}>×</button>
      </div>
    </div>
  );
};

export default ReorderNotification;