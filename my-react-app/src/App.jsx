import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Old Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// New Feature Pages
import WarehouseList from "./pages/WarehouseList";
import WarehouseCreate from "./pages/WarehouseCreate";
import WarehouseEdit from "./pages/WarehouseEdit";
import MovementLogs from "./pages/MovementLogs";
import SmartReorderPage from "./pages/SmartReorderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Old Login/Dashboard Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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
    </BrowserRouter>
  );
}

export default App;