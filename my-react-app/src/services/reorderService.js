// reorderService.js
// This service will fetch reorder recommendations from backend
// For now, we use dummy data since backend is not ready

export const getReorderRecommendations = async () => {
  // Dummy data
  const dummyData = [
    { id: 1, name: "Product A", currentStock: 10, recommendedQuantity: 50 },
    { id: 2, name: "Product B", currentStock: 5, recommendedQuantity: 20 },
    { id: 3, name: "Product C", currentStock: 100, recommendedQuantity: 0 },
  ];

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500);
  });
};