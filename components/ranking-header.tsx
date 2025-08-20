import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Percent } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface RankingHeaderProps {
  category: Category;
}

export function RankingHeader({ category }: RankingHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 py-16">
      <div className="px-4 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/rankings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              전체 할인 랭킹
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Percent className="h-8 w-8 text-red-600" />
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              최고 할인율 TOP 10
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {category.name} 최고 할인율 특가
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.name} 카테고리에서 가장 높은 할인율을 자랑하는 특가 상품
            TOP 10입니다. 30% 이상 할인부터 최대 85% 대폭 할인까지 실시간 특가
            정보를 확인하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
