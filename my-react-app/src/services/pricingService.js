const USE_MOCK = true; // 
const BACKEND_URL = "http://localhost:8080"; // 
const MOCK_URL = "https://jsonplaceholder.typicode.com";

const fetchFromBackend = async (productId) => {
  const res = await fetch(`${BACKEND_URL}/pricing/suggest?product_id=${productId}`);
  if (!res.ok) throw new Error(`Pricing API error: ${res.status}`);
  return res.json();
};

const fetchMock = async (productId) => {
  const id = productId || 1;

  // Use JSONPlaceholder /posts as fake pricing data source
  const [postRes, usersRes] = await Promise.all([
    fetch(`${MOCK_URL}/posts/${id}`),
    fetch(`${MOCK_URL}/users`),
  ]);

  const post = await postRes.json();
  const users = await usersRes.json();

  const seed = post.id; // deterministic mock values per product
  const currentPrice = parseFloat((seed * 1.37 + 5.99).toFixed(2));
  const cogs = parseFloat((currentPrice * 0.6).toFixed(2));
  const salesVelocity = parseFloat((seed % 10 + 0.5).toFixed(1));
  const agingDays = (seed * 3) % 120;
  const isAging = agingDays > 60;
  const isSlowMoving = salesVelocity < 3;
  const action = isAging || isSlowMoving ? "decrease" : salesVelocity > 7 ? "increase" : "hold";
  const discountPct = action === "decrease" ? Math.min(30, Math.round(agingDays / 5)) : 0;
  const suggestedPrice =
    action === "increase"
      ? parseFloat((currentPrice * 1.15).toFixed(2))
      : action === "decrease"
      ? parseFloat((currentPrice * (1 - discountPct / 100)).toFixed(2))
      : currentPrice;

  const hasBundle = seed % 3 === 0;
  const bundlePartner = users[seed % users.length]?.company?.name || "Partner Product";

  return {
    product_id: post.id,
    product_name: post.title.split(" ").slice(0, 3).join(" "),
    sku: `SKU-${String(post.id).padStart(3, "0")}`,
    current_price: currentPrice,
    suggested_price: suggestedPrice,
    cogs,
    sales_velocity: salesVelocity,
    aging_days: agingDays,
    action,
    discount_percentage: discountPct,
    bundle: hasBundle
      ? {
          products: [post.title.split(" ").slice(0, 2).join(" "), bundlePartner],
          suggested_bundle_price: parseFloat((suggestedPrice * 1.8).toFixed(2)),
          savings: parseFloat((suggestedPrice * 0.2).toFixed(2)),
        }
      : null,
    explanation: generateExplanation(action, salesVelocity, agingDays, discountPct),
  };
};

// Generates explanation text — mirrors what backend #103 will produce
const generateExplanation = (action, velocity, aging, discount) => {
  if (action === "increase")
    return `Upward trend detected — sales velocity of ${velocity} units/day exceeds threshold. Price increase recommended to capture margin.`;
  if (action === "decrease" && aging > 60)
    return `Inventory aging detected — stock has been held for ${aging} days. A ${discount}% discount is recommended to improve turnover.`;
  if (action === "decrease")
    return `Sales velocity is low at ${velocity} units/day. A ${discount}% price reduction may stimulate demand.`;
  return `Current pricing is optimal. Sales velocity of ${velocity} units/day is within the healthy range.`;
};

// ── Public API ─────────────────────────────────────────────────────
// Task #107: Get pricing suggestion for one product
export const getPricingSuggestion = (productId) =>
  USE_MOCK ? fetchMock(productId) : fetchFromBackend(productId);

// Task #107: Get pricing suggestions for all products (list page)
export const getAllPricingSuggestions = async () => {
  if (USE_MOCK) {
    // Fetch first 10 posts from JSONPlaceholder as mock product list
    const res = await fetch(`${MOCK_URL}/posts?_limit=10`);
    const posts = await res.json();
    const suggestions = await Promise.all(posts.map((p) => fetchMock(p.id)));
    return suggestions;
  }
 
};