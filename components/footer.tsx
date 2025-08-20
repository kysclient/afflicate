import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  coutners
                </span>
                <div className="text-slate-400 text-sm">쿠팡 상품 전문 큐레이션</div>
              </div>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-md">
              데이터 분석과 전문 리뷰를 통해 쿠팡의 베스트 상품들을 엄선하여 제공합니다. 
              스마트한 쇼핑으로 시간과 비용을 절약하세요.
            </p>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-3">특가 알림 받기</h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                  구독
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">빠른 링크</h3>
            <div className="space-y-3">
              <Link
                href="/products"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>전체 상품</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/rankings"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>TOP 랭킹</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/deals"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>할인 정보</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/reviews"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>상품 리뷰</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-6">고객 지원</h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>서비스 소개</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>문의하기</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/privacy"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>개인정보처리방침</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/terms"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <span>이용약관</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Categories - Responsive Grid */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <h4 className="font-semibold text-white mb-6 text-center">인기 카테고리</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/category/parenting"
              className="flex items-center justify-center px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
            >
              👶 육아용품
            </Link>
            <Link
              href="/category/pets"
              className="flex items-center justify-center px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
            >
              🐕 반려동물
            </Link>
            <Link
              href="/category/camping"
              className="flex items-center justify-center px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
            >
              🏕️ 캠핑용품
            </Link>
            <Link
              href="/category/tech"
              className="flex items-center justify-center px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
            >
              💻 IT 주변기기
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-full text-sm text-blue-300 hover:text-blue-200 transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50"
            >
              ✨ 전체 카테고리 보기
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-slate-400 text-sm text-center">
              © 2024 coutners(쿠트너스). 이 사이트는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}