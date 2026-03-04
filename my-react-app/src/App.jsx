import { useState } from "react";
import "./styles/products.css";
import "./styles/sales.css";
import "./styles/pricing.css";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import PricingPage from "./pages/PricingPage";

const NAV_ITEMS = [
  { key: "products", label: "Products", icon: "📦" },
  { key: "sales",    label: "Sales",    icon: "💰" },
  { key: "pricing",  label: "Pricing",  icon: "🤖" },
];

function App() {
  const [page, setPage] = useState("products");

  return (
    <div>
      {/* Top Navigation — same for all 3 modules */}
      <nav style={{
        padding: "0 24px",
        background: "#fff",
        borderBottom: "1px solid #e4e8f0",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "52px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}>
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          color: "#111827",
          marginRight: "24px",
          letterSpacing: "-0.3px",
        }}>
          IMS
        </span>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "13.5px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: page === item.key ? 700 : 500,
              color: page === item.key ? "#4f6ef7" : "#6b7280",
              background: page === item.key ? "#eef1ff" : "transparent",
              transition: "all 0.15s",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Page Content */}
      {page === "products" && <ProductsPage />}
      {page === "sales"    && <SalesPage />}
      {page === "pricing"  && <PricingPage />}
    </div>
  );
}

export default App;
