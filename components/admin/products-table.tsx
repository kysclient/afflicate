"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Eye, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  image_url: string | null
  sale_price: number | null
  original_price: number | null
  discount_rate: number | null
  brand: string | null
  rating: number | null
  review_count: number | null
  is_active: boolean | null
  is_featured: boolean | null
  created_at: string
  categories: {
    name: string
    slug: string
  } | null
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const formatPrice = (price: number | null) => {
    if (!price) return "-"
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  // Get unique categories for filter
  const categories = [...new Set(products.map((p) => p.categories?.name).filter(Boolean))]

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && product.is_active) ||
      (statusFilter === "inactive" && !product.is_active) ||
      (statusFilter === "featured" && product.is_featured)

    const matchesCategory = categoryFilter === "all" || product.categories?.name === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="상품명 또는 브랜드로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">활성</SelectItem>
            <SelectItem value="inactive">비활성</SelectItem>
            <SelectItem value="featured">추천</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 카테고리</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category!}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">총 {filteredProducts.length}개 상품</div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">이미지</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>평점</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="w-32">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=48&width=48"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium line-clamp-2 text-sm">{product.title}</p>
                    {product.brand && <p className="text-xs text-gray-500 mt-1">{product.brand}</p>}
                  </div>
                </TableCell>

                <TableCell>
                  {product.categories && (
                    <Badge variant="secondary" className="text-xs">
                      {product.categories.name}
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{formatPrice(product.sale_price)}</p>
                    {product.discount_rate && product.discount_rate > 0 && (
                      <Badge variant="destructive" className="text-xs mt-1">
                        {product.discount_rate}% 할인
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  {product.rating && (
                    <div className="text-sm">
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500 ml-1">({product.review_count?.toLocaleString()})</span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant={product.is_active ? "default" : "secondary"} className="text-xs w-fit">
                      {product.is_active ? "활성" : "비활성"}
                    </Badge>
                    {product.is_featured && (
                      <Badge variant="outline" className="text-xs w-fit">
                        추천
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-sm text-gray-600">{formatDate(product.created_at)}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/product/${product.id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
