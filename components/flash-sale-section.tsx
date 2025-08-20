"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Timer, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  title: string;
  original_price: number;
  sale_price: number;
  discount_rate: number;
  image_url: string;
  flash_sale_end: string;
  categories: {
    name: string;
    slug: string;
  };
}

interface FlashSaleSectionProps {
  products: Product[];
}

export function FlashSaleSection({ products }: FlashSaleSectionProps) {
  const [timeLeft, setTimeLeft] = useState<{
    [key: string]: { hours: number; minutes: number; seconds: number };
  }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: {
        [key: string]: { hours: number; minutes: number; seconds: number };
      } = {};

      products.forEach((product) => {
        const now = new Date();
        const endTime = new Date(product.flash_sale_end);
        const diff = endTime.getTime() - now.getTime();

        if (diff > 0) {
          newTimeLeft[product.id] = {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-sm font-medium mb-4 animate-pulse">
            <Zap className="h-4 w-4" />
            한정 시간 특가
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              ⚡ 번개세일
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            지금 놓치면 후회하는 초특가! 한정 시간 동안만 제공되는 특별 할인 상품들을 만나보세요.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-orange-200"
            >
              {/* Flash Sale Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  ⚡ 번개세일
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-lg font-bold shadow-lg">
                  {product.discount_rate}% OFF
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={product.image_url || "/placeholder.svg?height=250&width=250"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                    <Timer className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-orange-600 font-medium">한정시간</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-4 line-clamp-2 leading-tight text-slate-900">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {product.sale_price?.toLocaleString()}원
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {product.original_price?.toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    💰 {(product.original_price - product.sale_price).toLocaleString()}원 절약!
                  </div>
                </div>

                {/* Timer */}
                {timeLeft[product.id] && (
                  <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-4 mb-4 border border-red-200">
                    <div className="text-center text-red-700 font-bold mb-2 text-sm">
                      ⏰ 마감까지
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-xl text-sm font-bold min-w-[50px] text-center">
                        {String(timeLeft[product.id].hours).padStart(2, "0")}
                        <div className="text-xs opacity-80">시간</div>
                      </div>
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-xl text-sm font-bold min-w-[50px] text-center">
                        {String(timeLeft[product.id].minutes).padStart(2, "0")}
                        <div className="text-xs opacity-80">분</div>
                      </div>
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-xl text-sm font-bold min-w-[50px] text-center">
                        {String(timeLeft[product.id].seconds).padStart(2, "0")}
                        <div className="text-xs opacity-80">초</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={`/product/${product.id}`}
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-center py-3 rounded-2xl font-bold transition-all duration-300 group-hover:shadow-xl transform group-hover:-translate-y-1"
                >
                  🚀 지금 구매하기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-full border border-orange-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="text-orange-700 font-medium">더 많은 번개세일 보기</span>
            <ArrowRight className="h-4 w-4 text-orange-600" />
          </div>
        </div>
      </div>
    </section>
  );
}