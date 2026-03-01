import { Routes, Route, Navigate } from "react-router-dom";

// Pages - Existing
import WarehouseList from "./pages/WarehouseList";
import WarehouseCreate from "./pages/WarehouseCreate";
import WarehouseEdit from "./pages/WarehouseEdit";
import MovementLogs from "./pages/MovementLogs";

// Pages - New Smart Reorder
import SmartReorderPage from "./pages/SmartReorderPage";

function App() {
  return (
    <Routes>
      {/* Redirect root to warehouse list */}
      <Route path="/" element={<Navigate to="/warehouses" replace />} />

      {/* Warehouse Routes */}
      <Route path="/warehouses" element={<WarehouseList />} />
      <Route path="/warehouses/create" element={<WarehouseCreate />} />
      <Route path="/warehouses/edit/:id" element={<WarehouseEdit />} />

      {/* Movement Logs Route */}
      <Route path="/movement-logs" element={<MovementLogs />} />

      {/* Smart Reordering Module Route */}
      <Route path="/smart-reorder" element={<SmartReorderPage />} />

      {/* Fallback */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;