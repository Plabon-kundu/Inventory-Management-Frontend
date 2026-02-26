import WarehouseForm from "../components/WarehouseForm";

const WarehouseEdit = () => {
  const dummyData = {
    name: "Dhaka Warehouse",
    location: "Dhaka",
    description: "Main warehouse",
  };

  const handleUpdate = (data) => {
    console.log("Updating warehouse:", data);
  };

  return (
    <div>
      <h1>Edit Warehouse</h1>
      <WarehouseForm
        initialData={dummyData}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default WarehouseEdit;