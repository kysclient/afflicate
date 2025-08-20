import { createClient } from "@/lib/supabase/server";
import { createClient as createClientSide } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryHeader } from "@/components/category-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    return {
      title: "카테고리를 찾을 수 없습니다",
    };
  }

  return {
    title: `${category.name} 베스트 상품 추천 | 쿠팡 추천템`,
    description: `${category.description} 쿠팡에서 가장 인기 있는 ${category.name} TOP 10 랭킹과 할인 정보를 확인하세요.`,
    keywords: `${category.name}, 쿠팡, 추천, 베스트, 할인, 리뷰`,
    openGraph: {
      title: `${category.name} 베스트 상품 추천`,
      description: `쿠팡에서 가장 인기 있는 ${category.name} 상품들을 한눈에 비교해보세요.`,
      url: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const supabase = await createClient();

  // Fetch category info
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    notFound();
  }

  // Fetch all categories for header
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  // Build query for products
  let query = supabase
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
    .eq("is_active", true);

  // Apply filters
  if (searchParams.minPrice) {
    query = query.gte("sale_price", Number.parseInt(searchParams.minPrice));
  }
  if (searchParams.maxPrice) {
    query = query.lte("sale_price", Number.parseInt(searchParams.maxPrice));
  }
  if (searchParams.brand) {
    query = query.eq("brand", searchParams.brand);
  }

  // Apply sorting
  switch (searchParams.sort) {
    case "price-low":
      query = query.order("sale_price", { ascending: true });
      break;
    case "price-high":
      query = query.order("sale_price", { ascending: false });
      break;
    case "rating":
      query = query.order("rating", { ascending: false });
      break;
    case "reviews":
      query = query.order("review_count", { ascending: false });
      break;
    default:
      query = query
        .order("is_featured", { ascending: false })
        .order("rating", { ascending: false });
  }

  const { data: products } = await query.limit(24);

  // Fetch unique brands for filter
  const { data: brands } = await supabase
    .from("products")
    .select("brand")
    .eq("category_id", category.id)
    .not("brand", "is", null)
    .order("brand");

  const uniqueBrands = [
    ...new Set(brands?.map((b) => b.brand).filter(Boolean)),
  ] as string[];

  return (
    <div className="min-h-screen bg-background">
      <Header categories={categories || []} />
      <main>
        <CategoryHeader category={category} />
        <div className="py-8  max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProductFilters brands={uniqueBrands} />
            </aside>
            <div className="flex-1">
              <ProductGrid products={products || []} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = createClientSide();
  const { data: categories } = await supabase.from("categories").select("slug");

  return (
    categories?.map((category) => ({
      slug: category.slug,
    })) || []
  );
}
