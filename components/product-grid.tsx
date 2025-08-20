import { ProductCard } from "./product-card";

interface Product {
  id: string;
  title: string;
  description: string | null;
  original_price: number | null;
  sale_price: number | null;
  discount_rate: number | null;
  image_url: string | null;
  coupang_url: string;
  brand: string | null;
  rating: number | null;
  review_count: number | null;
  is_featured: boolean | null;
  is_flash_sale?: boolean;
  flash_sale_end?: string;
  categories: {
    name: string;
    slug: string;
  } | null;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          조건에 맞는 할인 상품이 없습니다.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          할인율 필터를 조정해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">할인 상품 목록</h2>
        <p className="text-gray-600">{products.length}개 특가 상품</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              title: product.title,
              original_price: product.original_price || 0,
              sale_price: product.sale_price || 0,
              discount_rate: product.discount_rate || 0,
              image_url: product.image_url || "",
              rating: product.rating || 0,
              review_count: product.review_count || 0,
              is_flash_sale: product.is_flash_sale,
              flash_sale_end: product.flash_sale_end,
              categories: product.categories,
            }}
            size="lg"
            showTimer={true}
          />
        ))}
      </div>
    </div>
  );
}
