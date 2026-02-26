import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWarehouses, deleteWarehouse } from "../services/warehouseService";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  // Fetch all warehouses from backend
  const fetchData = async () => {
    try {
      const res = await getWarehouses();
      setWarehouses(res.data); // assuming backend sends array
    } catch (err) {
      console.error("Error fetching warehouses:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this warehouse?"
    );
    if (confirmDelete) {
      try {
        await deleteWarehouse(id); // call backend API
        fetchData(); // refresh list
      } catch (err) {
        console.error("Error deleting warehouse:", err);
      }
    }
  };

  return (
    <div>
      <h1>Warehouse List</h1>
      <Link to="/warehouses/create">
        <button>Add Warehouse</button>
      </Link>

      {warehouses.length === 0 ? (
        <p>No warehouses found.</p>
      ) : (
        <ul>
          {warehouses.map((wh) => (
            <li key={wh.id} style={{ marginBottom: "10px" }}>
              <strong>{wh.name}</strong> - {wh.location}
              {" | "}
              <Link to={`/warehouses/edit/${wh.id}`}>
                <button>Edit</button>
              </Link>
              {" | "}
              <button onClick={() => handleDelete(wh.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WarehouseList;