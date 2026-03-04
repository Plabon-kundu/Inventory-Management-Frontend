const BASE_URL = "http://localhost:8080";

const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || data?.message || `Error ${res.status}`;
    throw new Error(message);
  }

  return data;
};

// Task 58 / Task 59: POST /stock-out — Create a sale (Stock OUT)
// Task 54: Backend will reject if stock goes negative
// Task 57: Frontend validates positive quantity before sending
export const createStockOut = (payload) =>
  request("/stock-out", {
    method: "POST",
    body: JSON.stringify(payload),
    // payload shape: { product_id, warehouse_id, quantity, reason }
  });

// Task 60: GET sales history
// NOTE: Adjust endpoint once backend confirms the history route
export const getSalesHistory = () => request("/stock-out/history");

// Helper: get products list (reused from product module for the dropdown)
export const getProductsList = () => request("/products");

// Helper: get warehouses list for the dropdown
export const getWarehousesList = () => request("/warehouses");