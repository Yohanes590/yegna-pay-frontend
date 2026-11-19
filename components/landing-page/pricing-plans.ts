export type PricingPlan = {
  id: "free" | "shop" | "developer" | "scale";
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try it out on the app and API.",
    price: "Free",
    features: [
      "200 new receipts / month",
      "All 17 banks & wallets",
      "App + API access",
      "Verify from URL or reference",
      "200 screenshot reads / month",
    ],
  },
  {
    id: "shop",
    name: "Shop",
    tagline: "For a counter confirming payments all day.",
    price: "499",
    priceSuffix: "ETB / mo",
    highlight: true,
    badge: "Most Popular",
    features: [
      "2,000 new receipts / day",
      "Everything in Free",
      "1,000 screenshot reads / month",
      "REST API + streamed results",
      "Daily sales, trends, top payers",
      "Standard priority",
    ],
  },
  {
    id: "developer",
    name: "Developer",
    tagline: "For products built on the API.",
    price: "999",
    priceSuffix: "ETB / mo",
    features: [
      "30,000 new receipts / month",
      "Everything in Shop",
      "2,000 screenshot reads / month",
      "Faster priority queue",
      "Overage 0.05 ETB / receipt (opt-in)",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For high volume that verifies all day.",
    price: "2,999",
    priceSuffix: "ETB / mo",
    features: [
      "150,000 new receipts / month",
      "Everything in Developer",
      "6,000 screenshot reads / month",
      "Top priority — verified in under 3s at peak",
      "Overage 0.03 ETB / receipt (opt-in)",
      "SLA + priority support",
    ],
  },
];

/** Cheapest plan that fits expected monthly receipt volume (landing estimator). */
export function planForMonthlyVolume(volume: number): PricingPlan {
  if (volume <= 200) return PRICING_PLANS[0];
  if (volume <= 60_000) return PRICING_PLANS[1];
  if (volume <= 150_000) return PRICING_PLANS[3];
  return PRICING_PLANS[3];
}