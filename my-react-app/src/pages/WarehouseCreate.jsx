import { useNavigate } from "react-router-dom";
import WarehouseForm from "../components/WarehouseForm";
import "./WarehouseCreate.css";

const WarehouseCreate = () => {
  const navigate = useNavigate();

  const handleCreate = (data) => {
    console.log("Warehouse created:", data);
    alert(`Warehouse "${data.name}" created successfully!`);
    navigate("/warehouses"); 
  };

  return (
    <div className="create-page-wrapper">
      {/* Immersive Background Glows */}
      <div className="glow-circle top-right"></div>
      <div className="glow-circle bottom-left"></div>

      <div className="create-content-container">
        <header className="create-header-section">
          <div className="back-link" onClick={() => navigate("/warehouses")}>
            ← Back to Network Hub
          </div>
          <h1>Deploy New <span>Warehouse Node</span></h1>
          <p>Configure the parameters for your next logistics entity.</p>
        </header>

        <div className="create-glass-panel">
          <WarehouseForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default WarehouseCreate;