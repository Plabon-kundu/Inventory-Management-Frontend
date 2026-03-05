import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WarehouseForm from "../components/WarehouseForm";
import "../styles/WarehouseEdit.css";
import { getWarehouses, updateWarehouse } from "../services/warehouseService";

const WarehouseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouseData, setWarehouseData] = useState(null);

  // Load warehouse from backend
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const warehouses = await getWarehouses();
        const wh = warehouses.find((w) => w.id === parseInt(id));

        if (wh) {
          setWarehouseData(wh);
        } else {
          navigate("/warehouses");
        }
      } catch (error) {
        console.error("Failed to fetch warehouse:", error);
      }
    };

    fetchWarehouse();
  }, [id, navigate]);

  // Update warehouse
  const handleUpdate = async (data) => {
    try {
      await updateWarehouse({ id: parseInt(id), ...data });
      alert(`Warehouse "${data.name}" updated successfully`);
      navigate("/warehouses");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!warehouseData) return <div className="loader-bg">Loading Node...</div>;

  return (
    <div className="edit-fullscreen-wrapper">
      <div className="glow-blur-1"></div>
      <div className="glow-blur-2"></div>

      <div className="split-container">
        <div className="info-panel">
          <div className="back-nav" onClick={() => navigate("/warehouses")}>
            ← Back to Hub
          </div>

          <div className="info-content">
            <span className="node-id">Node Update </span>

            <h1>
              Edit <span>Logistics</span> Point
            </h1>

            <p>
              Modify the parameters, location, and description of your warehouse
              node. Changes are synced instantly with the central database.
            </p>

            <div className="current-stats">
              <div className="stat-pill">
                Region: {warehouseData.location}
              </div>
            </div>
          </div>
        </div>

        <div className="form-panel">
          <div className="glass-form-card">
            <div className="mobile-only-header">
              <h1>Edit Warehouse</h1>
            </div>

            <WarehouseForm
              initialData={warehouseData}
              onSubmit={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseEdit;