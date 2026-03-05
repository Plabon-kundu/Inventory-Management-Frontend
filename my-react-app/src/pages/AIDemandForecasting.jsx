// src/pages/AIDemandForecasting.jsx
// Standalone page for AI Demand Forecasting.
// It does not modify any existing Inventory pages/components.
// Chart.js is imported as a dependency (no CDN script needed).

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./AIDemandForecasting.css";

// Mock API service (same logic you provided)
async function fetchForecastData(productId, months) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const monthsNum = parseInt(months, 10);
  const labels = [];
  const historical = [];
  const movingAverage = [];

  for (let i = monthsNum; i > 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    labels.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
  }

  let baseSales = 1000;
  if (productId === "prod1") baseSales = 1500;
  else if (productId === "prod2") baseSales = 800;
  else if (productId === "prod3") baseSales = 500;
  else if (productId === "prod4") baseSales = 2000;

  for (let i = 0; i < monthsNum; i++) {
    const trend = i * 15;
    const seasonality = Math.sin(i * 0.5) * 100;
    const random = Math.random() * 200 - 100;
    historical.push(Math.max(0, Math.round(baseSales + trend + seasonality + random)));
  }

  for (let i = 0; i < monthsNum; i++) {
    if (i < 2) movingAverage.push(null);
    else movingAverage.push(Math.round((historical[i] + historical[i - 1] + historical[i - 2]) / 3));
  }

  const lastValue = historical[historical.length - 1];
  const trendDirection =
    historical[historical.length - 1] > historical[0]
      ? "Up"
      : historical[historical.length - 1] < historical[0]
      ? "Down"
      : "Stable";

  const forecast = [];
  for (let i = 1; i <= 3; i++) {
    const forecastValue = lastValue + i * 25 + (Math.random() * 50 - 25);
    forecast.push(Math.round(forecastValue));
  }

  const calculateVolatility = (data) => {
    if (data.length < 2) return 0;
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  };

  const volatility = calculateVolatility(historical);
  const confidence = Math.max(0.65, Math.min(0.95, 1 - volatility / 1000));

  const generateExplanation = (pid, trend, conf, vol) => {
    const productName =
      {
        prod1: "Premium Widget",
        prod2: "Standard Widget",
        prod3: "Basic Widget",
        prod4: "Deluxe Model",
        all: "all products",
      }[pid] || "selected product";

    const trendMessage =
      {
        Up: "showing an upward trend",
        Down: "showing a downward trend",
        Stable: "remaining relatively stable",
      }[trend] || "showing a stable pattern";

    const confidenceMessage = conf > 0.85 ? "high confidence" : conf > 0.7 ? "moderate confidence" : "lower confidence";

    const volatilityMessage =
      vol > 500 ? "high demand volatility" : vol > 250 ? "moderate demand volatility" : "stable demand patterns";

    return `Based on historical sales data for ${productName} ${trendMessage} with ${volatilityMessage}.
The forecast suggests ${trend === "Up" ? "increasing" : trend === "Down" ? "decreasing" : "stable"} demand over the next period with ${confidenceMessage}.
Key factors: ${Math.round(vol)} units standard deviation in historical data, ${trend === "Up" ? "positive" : trend === "Down" ? "negative" : "neutral"} momentum.`;
  };

  return {
    predictedDemand: forecast[0],
    movingAverage: movingAverage[movingAverage.length - 1] || historical[historical.length - 1],
    trend: trendDirection,
    confidence,
    volatility: volatility.toFixed(0),
    historicalData: {
      labels,
      historical,
      movingAverage,
      forecast: [...Array(Math.max(0, monthsNum - 3)).fill(null), ...forecast],
    },
    explanation: generateExplanation(productId, trendDirection, confidence, volatility),
  };
}

// UI components
function ForecastWidget({ forecastData }) {
  if (!forecastData) return null;

  const { predictedDemand, movingAverage, trend, confidence } = forecastData;

  return (
    <div className="ai-forecast-widget ai-span-2">
      <h3>Demand Forecast</h3>

      <div className="ai-forecast-metrics">
        <div className="ai-metric-card">
          <span className="ai-metric-label">Predicted Demand</span>
          <span className="ai-metric-value ai-predicted">{predictedDemand}</span>
          <span className="ai-metric-unit">units</span>
        </div>

        <div className="ai-metric-card">
          <span className="ai-metric-label">Moving Average (3mo)</span>
          <span className="ai-metric-value">{movingAverage}</span>
          <span className="ai-metric-unit">units</span>
        </div>

        <div className="ai-metric-card">
          <span className="ai-metric-label">Trend Direction</span>
          <span className={`ai-metric-value ai-trend-${trend.toLowerCase()}`}>
            {trend} {trend === "Up" ? "↑" : trend === "Down" ? "↓" : "→"}
          </span>
        </div>

        <div className="ai-metric-card">
          <span className="ai-metric-label">Confidence Level</span>
          <span className="ai-metric-value">{(confidence * 100).toFixed(1)}%</span>
          <div className="ai-confidence-bar">
            <div className="ai-confidence-fill" style={{ width: `${confidence * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesTrendChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Historical Sales",
            data: data.historical,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Moving Average",
            data: data.movingAverage,
            borderColor: "#f59e0b",
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
          },
          {
            label: "Forecast",
            data: data.forecast,
            borderColor: "#10b981",
            borderWidth: 2,
            pointStyle: "circle",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#1e293b", font: { size: 12 } } },
          tooltip: {
            backgroundColor: "white",
            titleColor: "#1e293b",
            bodyColor: "#475569",
            borderColor: "#e2e8f0",
            borderWidth: 1,
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#64748b" } },
          y: { beginAtZero: true, grid: { color: "#e2e8f0" }, ticks: { color: "#64748b" } },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [data]);

  if (!data) {
    return (
      <div className="ai-chart-placeholder ai-span-3">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="ai-sales-trend-chart ai-span-3">
      <h3>Sales Trend Analysis</h3>
      <div className="ai-chart-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function ProductSelector({ selectedProduct, onProductChange }) {
  const products = [
    { id: "all", name: "All Products" },
    { id: "prod1", name: "Product A - Premium Widget" },
    { id: "prod2", name: "Product B - Standard Widget" },
    { id: "prod3", name: "Product C - Basic Widget" },
    { id: "prod4", name: "Product D - Deluxe Model" },
  ];

  return (
    <div className="ai-product-selector">
      <label htmlFor="ai-product-select">Select Product:</label>
      <select
        id="ai-product-select"
        value={selectedProduct}
        onChange={(e) => onProductChange(e.target.value)}
        className="ai-product-select"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// Page component
export default function AIDemandForecasting() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("6");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchForecastData(selectedProduct, timeRange);
        setForecastData(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedProduct, timeRange]);

  return (
    <div className="ai-app">
      <header className="ai-header">
        <h1>AI Demand Forecasting</h1>
        <p className="ai-subtitle">Predict future product demand based on historical sales data</p>
      </header>

      <main className="ai-main">
        <div className="ai-controls">
          <ProductSelector selectedProduct={selectedProduct} onProductChange={setSelectedProduct} />

          <div className="ai-time-range">
            <label>Historical Data Range:</label>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="ai-time-select">
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="9">Last 9 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>
        </div>

        <div className="ai-grid">
          {loading ? (
            <div className="ai-loading">Loading forecast data...</div>
          ) : (
            <>
              <ForecastWidget forecastData={forecastData} />
              <SalesTrendChart data={forecastData?.historicalData} />

              <div className="ai-explanation">
                <h3>Forecast Explanation</h3>
                {forecastData?.explanation ? (
                  <div className="ai-explanation-message">
                    <p>{forecastData.explanation}</p>
                    <div className="ai-badges">
                      <span className="ai-badge ai-badge-confidence">
                        Confidence: {(forecastData.confidence * 100).toFixed(1)}%
                      </span>
                      <span className="ai-badge ai-badge-volatility">Volatility: {forecastData.volatility}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}