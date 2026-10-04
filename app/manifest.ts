import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.claim}`,
    short_name: site.shortName,
    description: `${site.claim} no ${site.locale}, ${site.city}. Peça pelo ${site.delivery.platform}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#101820",
    theme_color: "#101820",
    lang: site.lang,
    categories: ["food", "restaurants"],
    icons: [
      { src: "/icon.jpg", sizes: "512x512", type: "image/jpeg" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}