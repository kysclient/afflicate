import Link from "next/link"
import { ArrowRight, Users, Package, Tent, Laptop } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

interface CategoryGridProps {
  categories: Category[]
}

const categoryIcons = {
  parenting: Users,
  pets: Package,
  camping: Tent,
  tech: Laptop,
}

const categoryColors = {
  parenting: {
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200 hover:border-pink-300",
    shadow: "shadow-pink-100"
  },
  pets: {
    gradient: "from-amber-500 to-orange-500", 
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200 hover:border-amber-300",
    shadow: "shadow-amber-100"
  },
  camping: {
    gradient: "from-green-500 to-emerald-500",
    bg: "from-green-50 to-emerald-50", 
    border: "border-green-200 hover:border-green-300",
    shadow: "shadow-green-100"
  },
  tech: {
    gradient: "from-blue-500 to-indigo-500",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200 hover:border-blue-300", 
    shadow: "shadow-blue-100"
  },
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            전문 큐레이션
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            카테고리별 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">베스트 셀렉션</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            각 분야별 전문가가 엄선한 상품들을 만나보세요. 데이터 분석과 실제 사용 경험을 바탕으로 추천합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const colorScheme = categoryColors[category.slug as keyof typeof categoryColors] || categoryColors.tech
            const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Laptop

            return (
              <Link key={category.id} href={`/category/${category.slug}`} className="group">
                <div className={`relative bg-gradient-to-br ${colorScheme.bg} rounded-2xl p-8 border-2 ${colorScheme.border} transition-all duration-300 group-hover:shadow-xl ${colorScheme.shadow} group-hover:-translate-y-1`}>
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${colorScheme.gradient} rounded-full blur-2xl`}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${colorScheme.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">100+</span> 상품
                    </div>
                    <div className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">실시간</span> 업데이트
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                      상품 둘러보기
                    </span>
                    <div className={`p-2 bg-gradient-to-r ${colorScheme.gradient} rounded-lg group-hover:shadow-lg transition-all duration-300`}>
                      <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <span className="text-slate-700 font-medium">더 많은 카테고리 보기</span>
            <ArrowRight className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </div>
    </section>
  )
}