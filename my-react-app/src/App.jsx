import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehouseList from "./pages/WarehouseList";
import WarehouseCreate from "./pages/WarehouseCreate";
import WarehouseEdit from "./pages/WarehouseEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/create" element={<WarehouseCreate />} />
        <Route path="/warehouses/edit/:id" element={<WarehouseEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;