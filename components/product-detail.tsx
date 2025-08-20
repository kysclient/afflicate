import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Heart, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"

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

interface Review {
  id: string
  title: string
  content: string
  rating: number | null
  pros: string[] | null
  cons: string[] | null
  created_at: string
}

interface ProductDetailProps {
  product: Product
  reviews: Review[]
}

export function ProductDetail({ product, reviews }: ProductDetailProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  return ( 
    <section className="py-8  max-w-[1280px] mx-auto px-4">
      <div className="">
        {/* Breadcrumb */}
        <Breadcrumb className="w-full mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.categories && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/category/${product.categories.slug}`}>
                    {product.categories.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.image_url || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.discount_rate && product.discount_rate > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                  {product.discount_rate}% 할인
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.categories && (
              <Badge variant="secondary" className="text-sm">
                {product.categories.name}
              </Badge>
            )}

            <div>
              {product.brand && <p className="text-lg text-gray-600 mb-2">{product.brand}</p>}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.rating}</span>
                </div>
                {product.review_count && (
                  <span className="text-gray-600">({formatPrice(product.review_count)}개 리뷰)</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              {product.original_price && product.sale_price && product.original_price !== product.sale_price && (
                <p className="text-lg text-gray-500 line-through">{formatPrice(product.original_price)}원</p>
              )}
              <p className="text-4xl font-bold text-primary">{formatPrice(product.sale_price)}원</p>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-lg mb-2">상품 설명</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href={product.coupang_url} target="_blank" rel="noopener noreferrer">
                  쿠팡에서 구매하기
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>이 상품은 현재 인기 상승 중입니다</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">상품 리뷰</h2>
            <div className="grid grid-cols-1 gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{review.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {review.rating && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          )}
                          <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.content}</p>

                    {(review.pros || review.cons) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {review.pros && review.pros.length > 0 && (
                          <div>
                            <h5 className="font-medium text-green-700 mb-2">장점</h5>
                            <ul className="space-y-1">
                              {review.pros.map((pro, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                  <span className="text-green-500">+</span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {review.cons && review.cons.length > 0 && (
                          <div>
                            <h5 className="font-medium text-red-700 mb-2">단점</h5>
                            <ul className="space-y-1">
                              {review.cons.map((con, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                  <span className="text-red-500">-</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
