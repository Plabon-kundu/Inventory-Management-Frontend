import { useEffect, useState } from "react";
import { getReorderRecommendations } from "../services/reorderService";
import ReorderAlertBanner from "../components/ReorderAlertBanner";
import ProductListWithReorder from "../components/ProductListWithReorder";
import ReorderNotification from "../components/ReorderNotification";
import "./SmartReorder.css";

const SmartReorderPage = () => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReorderRecommendations();
      setProducts(data);

      const needReorder = data.filter(item => item.recommendedQuantity > 0);
      if (needReorder.length > 0) {
        setAlert(`${needReorder.length} product(s) require immediate restock`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="smart-reorder-page">
      <div className="glow-circle top-right"></div>
      <div className="glow-circle bottom-left"></div>

      <div className="reorder-content-container">
        <header className="movement-header">
           <h2>Smart <span>Reordering Dashboard</span></h2>
           <p>AI-driven inventory forecasting and replenishment logic.</p>
        </header>

        {alert && <ReorderAlertBanner alertMessage={alert} />}
        
        <div className="reorder-glass-panel">
          <ProductListWithReorder products={products} />
        </div>
        
        <ReorderNotification products={products} />
      </div>
    </div>
  );
};

export default SmartReorderPage;