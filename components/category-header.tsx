import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-16">
      <div className=" max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-4">
              카테고리
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 max-w-2xl">{category.description}</p>
          </div>

          {category.image_url && (
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image src={category.image_url || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
