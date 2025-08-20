import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RankingHeader } from "@/components/ranking-header";
import { RankingList } from "@/components/ranking-list";

interface RankingPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({
  params,
}: RankingPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.category)
    .single();

  if (!category) {
    return {
      title: "카테고리를 찾을 수 없습니다",
    };
  }

  return {
    title: `${category.name} 최고 할인율 TOP 10 | 쿠팡 특가`,
    description: `${category.name} 카테고리에서 가장 높은 할인율을 자랑하는 상품 TOP 10입니다. 50% 이상 할인부터 최대 85% 대폭 할인까지 실시간 특가 정보를 확인하세요.`,
    keywords: `${category.name} 할인율, ${category.name} 특가, ${category.name} 세일, 쿠팡 ${category.name} 할인`,
    openGraph: {
      title: `${category.name} 최고 할인율 TOP 10`,
      description: `${category.name}에서 가장 높은 할인율을 자랑하는 특가 상품 TOP 10을 확인하세요.`,
      url: `/rankings/${category.slug}`,
    },
  };
}

export default async function CategoryRankingPage({
  params,
}: RankingPageProps) {
  const supabase = await createClient();

  // Fetch category info
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.category)
    .single();

  if (!category) {
    notFound();
  }

  // Fetch all categories for header
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: discountProducts } = await supabase
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
    .eq("category_id", category.id)
    .eq("is_active", true)
    .gte("discount_rate", 30)
    .order("discount_rate", { ascending: false })
    .limit(10);

  const rankings =
    discountProducts?.map((product, index) => ({
      id: `ranking-${product.id}`,
      rank_position: index + 1,
      ranking_type: "highest_discount",
      products: product,
    })) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header categories={categories || []} />
      <main>
        <RankingHeader category={category} />
        <RankingList rankings={rankings} />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  const { data: categories } = await supabase.from("categories").select("slug");

  return (
    categories?.map((category) => ({
      category: category.slug,
    })) || []
  );
}
