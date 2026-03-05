
import { useNavigate } from "react-router-dom";
import WarehouseForm from "../components/WarehouseForm";
import "../styles/WarehouseCreate.css";
import { createWarehouse } from "../services/warehouseService";


const WarehouseCreate = () => {
  const navigate = useNavigate();

 const handleCreate = async (data) => {
  try {
    await createWarehouse(data);

    alert(`Warehouse "${data.name}" created successfully!`);

    navigate("/warehouses");
  } catch (error) {
    console.error(error);
    alert("Failed to create warehouse");
  }
};

  return (
    <div className="create-page-wrapper">
     
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
