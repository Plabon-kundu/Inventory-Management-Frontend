import { useState } from "react";
import "./styles/products.css";
import "./styles/sales.css";
import "./styles/pricing.css";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import PricingPage from "./pages/PricingPage";

// Matches the navbar from Image 1 (InventoryMS logo, nav links, role badge, logout)
// with the lavender color theme from Image 2
const NAV_ITEMS = [
  { key: "products", label: "Products" },
  { key: "sales",    label: "Sales"    },
  { key: "pricing",  label: "Pricing"  },
];

function App() {
  const [page, setPage] = useState("products");

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">📦</div>
          InventoryMS
        </div>

        <div className="navbar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-link ${page === item.key ? "active" : ""}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Page Content ── */}
      {page === "products" && <ProductsPage />}
      {page === "sales"    && <SalesPage />}
      {page === "pricing"  && <PricingPage />}
    </div>
  );
}

export default App;
