import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home
  entries.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: { en: SITE_URL, ko: `${SITE_URL}/ko` },
    },
  });

  // Blog list
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: { en: `${SITE_URL}/blog`, ko: `${SITE_URL}/ko/blog` },
    },
  });

  // Individual blog posts (use en slugs as canonical, link to ko alternates)
  const slugs = getAllPostSlugs("en");
  for (const slug of slugs) {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/blog/${slug}`,
          ko: `${SITE_URL}/ko/blog/${slug}`,
        },
      },
    });
  }

  return entries;
}
