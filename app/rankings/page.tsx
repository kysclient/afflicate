import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RankingOverview } from "@/components/ranking-overview";
import { CategoryRankingCards } from "@/components/category-ranking-cards";

export const metadata: Metadata = {
  title: "최고 할인율 랭킹 TOP 10 | 쿠팡 특가 모음",
  description:
    "카테고리별 최고 할인율 상품 TOP 10 랭킹을 확인하세요. 50% 이상 할인 상품부터 85% 대폭 할인까지! 실시간 업데이트되는 특가 정보.",
  keywords:
    "쿠팡 할인율 랭킹, 최고 할인, 특가 상품, 할인율 TOP 10, 쿠팡 세일, 반값 할인",
  openGraph: {
    title: "최고 할인율 랭킹 TOP 10",
    description:
      "쿠팡에서 가장 높은 할인율을 자랑하는 상품들의 실시간 랭킹을 확인하세요.",
    url: "/rankings",
  },
};

export default async function RankingsPage() {
  const supabase = await createClient();

  // Fetch all categories for header
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: topDiscountRankings } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `
    )
    .eq("is_active", true)
    .gte("discount_rate", 50)
    .order("discount_rate", { ascending: false })
    .limit(15);

  const rankingsByCategory =
    topDiscountRankings?.reduce((acc, product) => {
      if (!product.categories) return acc;

      const categorySlug = product.categories.slug;
      if (!acc[categorySlug]) {
        acc[categorySlug] = {
          category: product.categories,
          products: [],
        };
      }

      // Only take top 3 per category for overview
      if (acc[categorySlug].products.length < 3) {
        acc[categorySlug].products.push({
          ...product,
          rank_position: acc[categorySlug].products.length + 1,
        });
      }
      return acc;
    }, {} as Record<string, any>) || {};

  return (
    <div className="min-h-screen bg-background">
      <Header categories={categories || []} />
      <main>
        <RankingOverview />
        <CategoryRankingCards rankingsByCategory={rankingsByCategory} />
      </main>
      <Footer />
    </div>
  );
}
