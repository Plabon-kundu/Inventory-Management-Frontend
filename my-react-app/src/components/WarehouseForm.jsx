import { useState } from "react";

const WarehouseForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, location, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Warehouse Form</h2>

      <input
        type="text"
        placeholder="Warehouse Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default WarehouseForm;