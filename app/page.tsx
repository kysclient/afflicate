import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FlashSaleSection } from "@/components/flash-sale-section";
import { TopDiscountsSection } from "@/components/top-discounts-section"

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch categories for navigation and grid
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: topDiscountProducts } = await supabase
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
    .limit(8);

  const { data: flashSaleProducts } = await supabase
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
    .eq("is_flash_sale", true)
    .eq("is_active", true)
    .gt("flash_sale_end", new Date().toISOString())
    .order("discount_rate", { ascending: false })
    .limit(6);

  const { data: todayDeals } = await supabase
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
    .gte("discount_rate", 60)
    .gte("rating", 4.5)
    .order("discount_rate", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen bg-background">
      <Header categories={categories || []} />
      <main>
        <HeroSection />

        {/* <DiscountBanner /> */}

        {todayDeals && todayDeals.length > 0 && (
          <section id="featured" className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-4">
                  ⭐ 에디터 추천
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    오늘의 베스트 딜
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                  높은 할인율과 우수한 평점을 자랑하는 엄선된 상품들. 쿠트너스 에디터가 직접 선별한 오늘만의 특가입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {todayDeals.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100 hover:border-purple-200"
                  >
                    {/* Editor's Choice Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        에디터 추천
                      </div>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                        {product.discount_rate}% OFF
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={
                          product.image_url ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-base sm:text-lg mb-3 line-clamp-2 leading-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                        {product.title}
                      </h3>

                      {/* Price and Rating */}
                      <div className="space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {product.sale_price?.toLocaleString()}원
                          </span>
                          <span className="text-xs sm:text-sm text-slate-400 line-through">
                            {product.original_price?.toLocaleString()}원
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                            <span className="text-xs text-slate-500">({product.review_count})</span>
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {(product.original_price - product.sale_price).toLocaleString()}원 절약
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-16">
                <Link href="/products">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <span className="text-purple-700 font-medium">더 많은 추천 상품 보기</span>
                    <span className="h-4 w-4 text-purple-600">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {flashSaleProducts && flashSaleProducts.length > 0 && (
          <FlashSaleSection products={flashSaleProducts} />
        )}

        <TopDiscountsSection products={topDiscountProducts || []} />

        <CategoryGrid categories={categories || []} />


      </main>
      <Footer />
    </div>
  );
}
