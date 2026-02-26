import WarehouseForm from "../components/WarehouseForm";

const WarehouseCreate = () => {
  const handleCreate = (data) => {
    console.log("Creating warehouse:", data);
  };

  return (
    <div>
      <h1>Create Warehouse</h1>
      <WarehouseForm onSubmit={handleCreate} />
    </div>
  );
};

export default WarehouseCreate;