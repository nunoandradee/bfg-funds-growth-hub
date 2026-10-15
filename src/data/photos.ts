// Photographs of real small business owners at work (Unsplash License: free
// for commercial use, no attribution required). They show the kind of
// businesses we work with; they are not BFG Funds clients.
import autoRepair from "@/assets/photos/auto-repair.jpg";
import beauty from "@/assets/photos/beauty.jpg";
import construction from "@/assets/photos/construction.jpg";
import ownerAtWork from "@/assets/photos/owner-at-work.jpg";
import restaurants from "@/assets/photos/restaurants.jpg";
import retail from "@/assets/photos/retail.jpg";
import trucking from "@/assets/photos/trucking.jpg";

export type Photo = { src: string; alt: string };

export const INDUSTRY_PHOTOS: Record<string, Photo> = {
  construction: { src: construction, alt: "Contractor cutting trim with a miter saw" },
  restaurants: { src: restaurants, alt: "Café owner standing behind her counter" },
  trucking: { src: trucking, alt: "Semi truck on an open highway" },
  "retail-ecommerce": { src: retail, alt: "Shop owner sitting in her clothing store" },
  "auto-repair": { src: autoRepair, alt: "Mechanic working in his repair shop" },
  "beauty-wellness": { src: beauty, alt: "Salon owner standing in her salon" },
};

export const OWNER_AT_WORK: Photo = {
  src: ownerAtWork,
  alt: "Butcher shop owner checking an order on his phone",
};
