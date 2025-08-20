"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Grid3x3, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface SearchPopoverProps {
  categories: Category[];
}

const categoryIcons = {
  parenting: "👶",
  pets: "🐕",
  camping: "🏕️",
  tech: "💻",
  fashion: "👕",
  beauty: "💄",
  home: "🏠",
  sports: "⚽",
  food: "🍽️",
  book: "📚",
};

const popularSearches = [
  "무선 이어폰",
  "캠핑 텐트", 
  "아기 기저귀",
  "강아지 사료",
  "게이밍 키보드",
  "유아용 카시트"
];

export function SearchPopover({ categories }: SearchPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Search Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-slate-100 transition-colors"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-lg font-bold text-slate-900 mb-3">카테고리</h3>
            
            {/* Search Input */}
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="상품명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div> */}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {/* Popular Searches */}
            {!searchQuery && (
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <h4 className="font-semibold text-sm text-slate-700">인기 검색어</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium text-slate-700 transition-colors"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Grid3x3 className="h-4 w-4 text-blue-500" />
                <h4 className="font-semibold text-sm text-slate-700">
                  {searchQuery ? `"${searchQuery}" 검색 결과` : "전체 카테고리"}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {/* All Products Link */}
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      All
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">전체 상품</div>
                      <div className="text-xs text-slate-500">모든 카테고리의 상품 보기</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Category Links */}
                {filteredCategories.slice(0, 8).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-lg">
                        {categoryIcons[category.slug as keyof typeof categoryIcons] || "📦"}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-slate-900">{category.name}</div>
                        <div className="text-xs text-slate-500">{category.description}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}

                {/* Show more categories if there are many */}
                {filteredCategories.length > 8 && (
                  <div className="text-center py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +{filteredCategories.length - 8}개 더 보기
                    </Button>
                  </div>
                )}
              </div>

              {/* No results */}
              {searchQuery && filteredCategories.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-slate-500 text-sm">검색 결과가 없습니다</div>
                  <div className="text-xs text-slate-400 mt-1">다른 검색어로 시도해보세요</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="text-xs text-slate-500 text-center">
              <kbd className="px-2 py-1 bg-white rounded border text-xs">ESC</kbd>를 눌러 닫기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}