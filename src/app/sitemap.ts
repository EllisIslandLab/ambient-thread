import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-09-21"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/partners`,
      lastModified: new Date("2026-09-21"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${SITE_URL}/privacy`, lastModified: new Date("2026-10-22"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: new Date("2026-10-22"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
