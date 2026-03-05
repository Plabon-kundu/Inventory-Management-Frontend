const BASE_URL = "http://localhost:8080";

// GET all warehouses
export const getWarehouses = async () => {
  const response = await fetch(`${BASE_URL}/warehouses`);
  return await response.json();
};

// CREATE warehouse
export const createWarehouse = async (data) => {
  const response = await fetch(`${BASE_URL}/warehouses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// UPDATE warehouse
export const updateWarehouse = async (data) => {
  const response = await fetch(`${BASE_URL}/warehouses`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// DELETE warehouse
export const deleteWarehouse = async (id) => {
  await fetch(`${BASE_URL}/warehouses?id=${id}`, {
    method: "DELETE",
  });
};