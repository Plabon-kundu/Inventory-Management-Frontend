import { useState } from "react";
import "./WarehouseForm.css";

const WarehouseForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, location, description });
  };

  return (
    <form className="structured-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Top Row: Split 50/50 */}
        <div className="form-group">
          <label>Warehouse Name</label>
          <input
            type="text"
            placeholder="Enter entity name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location / Region</label>
          <input
            type="text"
            placeholder="e.g. Dhaka, BD"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Bottom Row: Full Width */}
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            placeholder="Provide operational details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">
          Confirm & Save Node
        </button>
      </div>
    </form>
  );
};

export default WarehouseForm;