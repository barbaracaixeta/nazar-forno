import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.siteUrl}/cardapio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.siteUrl}/a-nazar`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.siteUrl}/privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${site.siteUrl}/termos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}