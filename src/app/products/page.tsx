import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";
import ProductsClient from "@/components/ProductsClient";

export const revalidate = 60;

const MOCK_PRODUCTS = [
  {
    _id: "p1",
    title: "Premium Calendars",
    shortDescription: "Large-format offset printing with UV coating. Our premium calendars are designed for high-impact visual storytelling.",
    imageUrl: "https://images.unsplash.com/photo-1506784951206-b9241fc9a6c1?q=80&w=2070&auto=format&fit=crop",
    accentColor: "#00FFFF",
  },
  {
    _id: "p2",
    title: "Greeting Cards",
    shortDescription: "Die-cut folded cards with foil stamping. Perfect for bespoke brand messaging and luxury retail.",
    imageUrl: "https://images.unsplash.com/photo-1512144888804-9426f8d09579?q=80&w=2070&auto=format&fit=crop",
    accentColor: "#FF00FF",
  },
  {
    _id: "p3",
    title: "Fine Books",
    shortDescription: "Hardcover Smyth-sewn binding. Archival quality printing for art books and limited editions.",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
    accentColor: "#FFFF00",
  },
  {
    _id: "p4",
    title: "Custom Packaging",
    shortDescription: "Structural corrugated and folding carton design. Embossed and debossed finishes available.",
    imageUrl: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=2071&auto=format&fit=crop",
    accentColor: "#00FF00",
  },
  {
    _id: "p5",
    title: "Business Stationery",
    shortDescription: "Letterpress and offset stationery suites on 100% cotton paper.",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1974&auto=format&fit=crop",
    accentColor: "#FF4500",
  },
];

export default async function ProductsPage() {
  let products;

  try {
    products = await client.fetch(allProductsQuery);
  } catch (e) {
    console.warn("Sanity fetch failed, using mock data.");
  }

  const activeProducts = products?.length ? products : MOCK_PRODUCTS;

  return <ProductsClient products={activeProducts} />;
}
