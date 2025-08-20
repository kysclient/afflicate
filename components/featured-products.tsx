import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  description: string | null
  original_price: number | null
  sale_price: number | null
  discount_rate: number | null
  image_url: string | null
  coupang_url: string
  brand: string | null
  rating: number | null
  review_count: number | null
  categories: {
    name: string
    slug: string
  } | null
}

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  return (
    <section id="featured" className="py-20 max-w-[1280px] mx-auto px-4">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이번 주 베스트 상품</h2>
          <p className="mt-4 text-lg text-gray-600">가장 인기 있고 할인율이 높은 추천 상품들을 만나보세요</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount_rate && product.discount_rate > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                      {product.discount_rate}% 할인
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  {product.categories && (
                    <Badge variant="secondary" className="text-xs">
                      {product.categories.name}
                    </Badge>
                  )}

                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.title}</h3>

                  {product.brand && <p className="text-xs text-gray-500">{product.brand}</p>}

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({formatPrice(product.review_count)}개 리뷰)</span>
                  </div>

                  <div className="space-y-1">
                    {product.original_price && product.sale_price && product.original_price !== product.sale_price && (
                      <p className="text-xs text-gray-500 line-through">{formatPrice(product.original_price)}원</p>
                    )}
                    <p className="text-lg font-bold text-primary">{formatPrice(product.sale_price)}원</p>
                  </div>

                  <Button className="w-full mt-4" size="sm" asChild>
                    <Link href={product.coupang_url} target="_blank" rel="noopener noreferrer">
                      쿠팡에서 보기
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">더 많은 상품 보기</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
