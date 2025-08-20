import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SearchPopover } from "@/components/search-popover"

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

interface HeaderProps {
  categories: Category[]
}

export function Header({ categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between  max-w-[1280px] mx-auto px-4">
        <div className="flex items-center gap-2">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              {/* Mobile Sidebar Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-white font-bold text-lg">coutners</div>
                    <div className="text-blue-100 text-xs">쿠팡 상품 큐레이션</div>
                  </div>
                </div>
              </div>

              {/* Mobile Search */}
              {/* <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="상품명으로 검색..."
                    className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div> */}

              {/* Mobile Menu Items */}
              <div className="flex flex-col">
                {/* All Products */}
                <Link
                  href="/products"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">All</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 group-hover:text-blue-600">전체 상품</div>
                    <div className="text-xs text-slate-500">모든 카테고리 상품</div>
                  </div>
                </Link>

                {/* Categories */}
                <div className="px-6 py-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">카테고리</div>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-lg">
                          {category.slug === 'parenting' && '👶'}
                          {category.slug === 'pets' && '🐕'}
                          {category.slug === 'camping' && '🏕️'}
                          {category.slug === 'tech' && '💻'}
                          {!['parenting', 'pets', 'camping', 'tech'].includes(category.slug) && '📦'}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-blue-600">{category.name}</div>
                          <div className="text-xs text-slate-500">{category.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="px-6 py-4 border-t border-slate-100 mt-4">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">서비스</div>
                  <div className="space-y-2">
                    <Link href="/rankings" className="block text-sm text-slate-600 hover:text-blue-600 py-1">
                      TOP 랭킹
                    </Link>
                    <Link href="/deals" className="block text-sm text-slate-600 hover:text-blue-600 py-1">
                      할인 정보
                    </Link>
                    <Link href="/about" className="block text-sm text-slate-600 hover:text-blue-600 py-1">
                      서비스 소개
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              coutners
            </span>
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav> */}
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              전체 상품
            </Link>
          </nav>

          {/* Search Popover */}
          <div className="hidden sm:block">
            <SearchPopover categories={categories} />
          </div>
        </div>
      </div>
    </header>
  )
}
