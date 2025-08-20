import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  original_price: number;
  sale_price: number;
  discount_rate: number;
  image_url: string;
  rating: number;
  review_count: number;
  brand: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
}

export default async function ProductsPage() {
  const supabase = await createClient();

  // Fetch categories for navigation
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  // Fetch all products
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <Header categories={categories || []} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
                전체 상품 컬렉션
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="block">쿠트너스가 엄선한</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  전체 상품 라인업
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                각 카테고리별 베스트 상품들을 한 곳에서 모두 만나보세요.
                데이터 분석과 전문 큐레이션을 통해 검증된 {products?.length || 0}개의 프리미엄 상품들입니다.
              </p>



              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{products?.length || 0}</div>
                  <div className="text-sm text-slate-600">전체 상품</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{categories?.length || 0}</div>
                  <div className="text-sm text-slate-600">카테고리</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">평균 65%</div>
                  <div className="text-sm text-slate-600">할인율</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">4.7+</div>
                  <div className="text-sm text-slate-600">평균 평점</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      

            {/* Products Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    size="lg"
                    showTimer={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-slate-500 text-lg mb-4">상품이 없습니다</div>
                <p className="text-slate-400">곧 새로운 상품들을 준비해드리겠습니다.</p>
              </div>
            )}

            {/* Load More Button */}
            {products && products.length > 0 && (
              <div className="text-center mt-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                >
                  더 많은 상품 보기
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              원하는 상품을 찾지 못하셨나요?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              쿠트너스 에디터팀에 상품 추천을 요청하세요. 전문적인 분석과 큐레이션을 통해 최고의 상품을 찾아드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                상품 추천 요청하기
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-slate-400"
              >
                카테고리별 보기
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}