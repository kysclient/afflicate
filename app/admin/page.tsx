import { createClient } from "@/lib/supabase/server"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentActivity } from "@/components/admin/recent-activity"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard stats
  const [{ count: totalProducts }, { count: totalCategories }, { count: totalReviews }, { data: recentProducts }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("reviews").select("*", { count: "exact", head: true }),
      supabase
        .from("products")
        .select(`
      *,
      categories (name)
    `)
        .order("created_at", { ascending: false })
        .limit(5),
    ])

  const stats = {
    totalProducts: totalProducts || 0,
    totalCategories: totalCategories || 0,
    totalReviews: totalReviews || 0,
    activeProducts: recentProducts?.filter((p) => p.is_active).length || 0,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600 mt-2">쿠팡 추천템 사이트 관리</p>
      </div>

      <AdminStats stats={stats} />
      <RecentActivity products={recentProducts || []} />
    </div>
  )
}
