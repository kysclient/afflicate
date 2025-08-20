import Link from "next/link";
import { ArrowRight, TrendingUp, Star, Clock, Crown } from "lucide-react";

interface Product {
  id: string;
  title: string;
  original_price: number;
  sale_price: number;
  discount_rate: number;
  image_url: string;
  rating: number;
  review_count: number;
  categories: {
    name: string;
    slug: string;
  };
}

interface TopDiscountsSectionProps {
  products: Product[];
}

export function TopDiscountsSection({ products }: TopDiscountsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            실시간 할인 분석
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              최고 할인율
            </span> 베스트 8
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            AI 분석을 통해 검증된 최고의 할인 상품들을 실시간으로 추천합니다. 놓치기 전에 지금 확인하세요!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
            >
              {/* Rank Badge */}
              {index < 3 && (
                <div className="absolute top-4 left-4 z-20">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm text-white shadow-lg ${
                    index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                    index === 1 ? "bg-gradient-to-r from-gray-300 to-gray-400" :
                    "bg-gradient-to-r from-orange-400 to-orange-500"
                  }`}>
                    {index === 0 && <Crown className="h-4 w-4" />}
                    {index !== 0 && (index + 1)}
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  {product.discount_rate}% OFF
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={product.image_url || "/placeholder.svg?height=250&width=250"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {product.categories?.name}
                  </span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">실시간</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-4 line-clamp-2 leading-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                      {product.sale_price?.toLocaleString()}원
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {product.original_price?.toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {(product.original_price - product.sale_price).toLocaleString()}원 절약
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">
                    ({product.review_count.toLocaleString()})
                  </span>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/product/${product.id}`}
                  className="block w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-0.5"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <span className="text-red-700 font-medium">더 많은 할인 상품 보기</span>
            <ArrowRight className="h-4 w-4 text-red-600" />
          </div>
        </div>
      </div>
    </section>
  );
}