import axios from "axios";

const API_URL = "http://localhost:8080/api/warehouses";

export const getWarehouses = () => axios.get(API_URL);
export const createWarehouse = (data) => axios.post(API_URL, data);
export const updateWarehouse = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteWarehouse = (id) =>
  axios.delete(`${API_URL}/${id}`);