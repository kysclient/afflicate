import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-xl font-bold text-gray-900">
              쿠팡 추천템 관리자
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                사이트 보기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
