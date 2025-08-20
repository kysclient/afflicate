import { Badge } from "@/components/ui/badge";
import { Percent, Zap, TrendingDown } from "lucide-react";

export function RankingOverview() {
  return (
    <section className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-red-100 text-red-700">
            🔥 실시간 할인율 랭킹
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            최고 할인율 TOP 랭킹
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            카테고리별 최대 85% 할인! 쿠팡에서 가장 높은 할인율을 자랑하는 특가
            상품들을 실시간으로 업데이트합니다. 놓치면 후회하는 초특가 딜을 지금
            확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="rounded-full bg-red-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Percent className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              최고 할인율
            </h3>
            <p className="text-gray-600">
              30%부터 85%까지 카테고리별 최고 할인율 상품
            </p>
          </div>

          <div className="text-center">
            <div className="rounded-full bg-yellow-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              번개세일
            </h3>
            <p className="text-gray-600">
              시간 제한 특가! 마감 임박 초특가 상품들
            </p>
          </div>

          <div className="text-center">
            <div className="rounded-full bg-green-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              최대 절약
            </h3>
            <p className="text-gray-600">
              원가 대비 절약 금액이 가장 큰 상품들
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
