import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  sale_price: number | null;
  image_url: string | null;
  rating: number | null;
  review_count: number | null;
  rank_position: number;
}

interface CategoryRankingCardsProps {
  rankingsByCategory: Record<
    string,
    {
      category: {
        name: string;
        slug: string;
      };
      products: Product[];
    }
  >;
}

export function CategoryRankingCards({
  rankingsByCategory,
}: CategoryRankingCardsProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <section className="py-20  max-w-[1280px] mx-auto px-4">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            카테고리별 TOP 3 미리보기
          </h2>
          <p className="text-lg text-gray-600">
            각 카테고리의 상위 3개 상품을 확인하고 전체 랭킹을 살펴보세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Object.entries(rankingsByCategory).map(([slug, data]) => (
            <Card key={slug} className="overflow-hidden">
              <CardHeader className="">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {data.category.name} TOP 3
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/rankings/${slug}`}>
                      전체 보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {data.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <Badge
                          variant={
                            product.rank_position === 1
                              ? "default"
                              : "secondary"
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center p-0"
                        >
                          {product.rank_position}
                        </Badge>
                      </div>

                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={
                            product.image_url ||
                            "/placeholder.svg?height=64&width=64"
                          }
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 text-gray-900 mb-1">
                          {product.title}
                        </h4>

                        <div className="flex items-center gap-2 mb-1">
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">
                                {product.rating}
                              </span>
                            </div>
                          )}
                          {product.review_count && (
                            <span className="text-xs text-gray-500">
                              ({formatPrice(product.review_count)}개)
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-bold text-primary">
                          {formatPrice(product.sale_price)}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
