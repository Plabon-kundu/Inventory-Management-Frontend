
export const getReorderRecommendations = async () => {
  const dummyData = [
    {
      product_id: "SKU-WBH-2024-001",
      product_name: "Wireless Bluetooth Headphones",
      current_stock: 150,
      stock_covers_days: 12.5,
      reorder_recommended: false,
      reorder_quantity: 0,
      urgency: "low",
      confidence: 0.87,
    },
    {
      product_id: "SKU-MSE-2024-002",
      product_name: "Wireless Mouse",
      current_stock: 20,
      stock_covers_days: 2,
      reorder_recommended: true,
      reorder_quantity: 80,
      urgency: "high",
      confidence: 0.93,
    },
    {
      product_id: "SKU-KBD-2024-003",
      product_name: "Mechanical Keyboard",
      current_stock: 60,
      stock_covers_days: 5,
      reorder_recommended: true,
      reorder_quantity: 40,
      urgency: "medium",
      confidence: 0.89,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500);
  });
};
 


















/*

import axios from "axios";

// Replace with your backend URL
const API_URL = "http://localhost:5000/api/reorder"; 

export const getReorderRecommendations = async () => {
  try {
    // Example payload (send product info if backend needs it)
    const payload = {
      product_id: "all", // or send specific product IDs
    };

    // Make POST request to backend
    const response = await axios.post(API_URL, payload);

    // Map backend response to frontend format
    const data = response.data.map(item => ({
      id: item.product_id,
      name: item.product_name,
      currentStock: item.current_stock,
      recommendedQuantity: item.reorder_quantity,
      stockCoversDays: item.stock_covers_days,
      urgency: item.urgency,
      confidence: item.confidence,
    }));

    return data;

  } catch (error) {
    console.error("Error fetching reorder recommendations:", error);
    // Fallback: return empty array if backend fails
    return [];
  }
};

*/