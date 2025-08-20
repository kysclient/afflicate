import { createClient } from "@/lib/supabase/server"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = "https://afflicate.vercel.app"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ]

  // Category pages
  const { data: categories } = await supabase.from("categories").select("slug, updated_at")
  const categoryPages =
    categories?.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(category.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })) || []

  // Category ranking pages
  const categoryRankingPages =
    categories?.map((category) => ({
      url: `${baseUrl}/rankings/${category.slug}`,
      lastModified: new Date(category.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })) || []

  // Product pages
  const { data: products } = await supabase.from("products").select("id, updated_at").eq("is_active", true)
  const productPages =
    products?.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })) || []

  return [...staticPages, ...categoryPages, ...categoryRankingPages, ...productPages]
}
