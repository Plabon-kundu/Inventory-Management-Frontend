const BASE_URL = "http://localhost:8080";

// Helper for JSON requests
const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.status === 204) return null; // DELETE returns no body

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || data?.message || `Error ${res.status}`;
    throw new Error(message);
  }

  return data;
};

// Task 21 / FR-04: Create product (POST /products)
export const createProduct = (product) =>
  request("/products", { method: "POST", body: JSON.stringify(product) });

// Task 22 / FR-05: Get all products (GET /products)
export const getProducts = () => request("/products");

// Get single product (GET /products/get?id=1)
export const getProduct = (id) => request(`/products/get?id=${id}`);

// Task 23 / FR-05: Update product (PUT /products/update?id=1)
export const updateProduct = (id, product) =>
  request(`/products/update?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

// Task 24 / FR-05: Delete product (DELETE /products/delete?id=1)
export const deleteProduct = (id) =>
  request(`/products/delete?id=${id}`, { method: "DELETE" });

// Get low-stock products (GET /products/low-stock)
export const getLowStockProducts = () => request("/products/low-stock");