import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Ranking {
  id: string;
  rank_position: number;
  products: {
    id: string;
    title: string;
    description: string | null;
    original_price: number | null;
    sale_price: number | null;
    discount_rate: number | null;
    image_url: string | null;
    coupang_url: string;
    brand: string | null;
    rating: number | null;
    review_count: number | null;
  } | null;
}

interface RankingListProps {
  rankings: Ranking[];
}

export function RankingList({ rankings }: RankingListProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const getRankBadgeColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case 2:
        return "bg-gray-400 hover:bg-gray-500 text-white";
      case 3:
        return "bg-amber-600 hover:bg-amber-700 text-white";
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
  };

  return (
    <section className="py-12  max-w-[1280px] mx-auto px-4">
      <div className="">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {rankings.map((ranking) => {
              const product = ranking.products;
              if (!product) return null;

              return (
                <Card
                  key={ranking.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    ranking.rank_position <= 3 ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <Badge
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRankBadgeColor(
                            ranking.rank_position
                          )}`}
                        >
                          {ranking.rank_position}
                        </Badge>
                      </div>

                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={
                            product.image_url ||
                            "/placeholder.svg?height=128&width=128"
                          }
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                        {product.discount_rate && product.discount_rate > 0 && (
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                            {product.discount_rate}% 할인
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          {product.brand && (
                            <p className="text-sm text-gray-500 font-medium mb-1">
                              {product.brand}
                            </p>
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {product.title}
                          </h3>
                        </div>

                        {product.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4">
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {product.rating}
                              </span>
                              {product.review_count && (
                                <span className="text-sm text-gray-500">
                                  ({formatPrice(product.review_count)}개 리뷰)
                                </span>
                              )}
                            </div>
                          )}

                          {ranking.rank_position <= 3 && (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                인기 급상승
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            {product.original_price &&
                              product.sale_price &&
                              product.original_price !== product.sale_price && (
                                <p className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.original_price)}원
                                </p>
                              )}
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(product.sale_price)}원
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/product/${product.id}`}>
                                상세보기
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link
                                href={product.coupang_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                쿠팡에서 보기
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
