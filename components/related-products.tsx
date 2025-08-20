import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  sale_price: number | null
  image_url: string | null
  rating: number | null
  review_count: number | null
  discount_rate: number | null
  coupang_url: string
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  if (products.length === 0) return null

  return (
    <section className="py-16 bg-gray-50  max-w-[1280px] mx-auto px-4">
      <div className="">
        <h2 className="text-2xl font-bold mb-8">관련 상품</h2>
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
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                      {product.discount_rate}% 할인
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.title}</h3>

                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      {product.review_count && (
                        <span className="text-xs text-gray-500">({formatPrice(product.review_count)}개)</span>
                      )}
                    </div>
                  )}

                  <p className="text-lg font-bold text-primary">{formatPrice(product.sale_price)}원</p>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/product/${product.id}`}>상세보기</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={product.coupang_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
