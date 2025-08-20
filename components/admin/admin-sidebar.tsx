"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, FolderOpen, Trophy, MessageSquare, Settings } from "lucide-react"

const navigation = [
  { name: "대시보드", href: "/admin", icon: LayoutDashboard },
  { name: "상품 관리", href: "/admin/products", icon: Package },
  { name: "카테고리", href: "/admin/categories", icon: FolderOpen },
  { name: "랭킹 관리", href: "/admin/rankings", icon: Trophy },
  { name: "리뷰 관리", href: "/admin/reviews", icon: MessageSquare },
  { name: "설정", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">관리자 메뉴</h2>
      </div>

      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
