import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Product {
  id: string
  title: string
  image_url: string | null
  sale_price: number | null
  is_active: boolean | null
  created_at: string
  categories: {
    name: string
  } | null
}

interface RecentActivityProps {
  products: Product[]
}

export function RecentActivity({ products }: RecentActivityProps) {
  const formatPrice = (price: number | null) => {
    if (!price) return null
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 등록된 상품</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={product.image_url || "/placeholder.svg?height=48&width=48"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  {product.categories && (
                    <Badge variant="secondary" className="text-xs">
                      {product.categories.name}
                    </Badge>
                  )}
                  <Badge variant={product.is_active ? "default" : "secondary"} className="text-xs">
                    {product.is_active ? "활성" : "비활성"}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{formatPrice(product.sale_price)}원</p>
                <p className="text-xs text-gray-500">{formatDate(product.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
