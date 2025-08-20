import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { RelatedProducts } from "@/components/related-products";
import { ProductJsonLd } from "@/components/product-json-ld";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다",
    };
  }

  const formatPrice = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return {
    title: `${product.title} | 쿠팡 추천템`,
    description: `${product.description || product.title} 가격: ${formatPrice(
      product.sale_price
    )}원. 평점 ${product.rating}/5 (${formatPrice(
      product.review_count
    )}개 리뷰)`,
    keywords: `${product.title}, ${product.brand}, ${product.categories?.name}, 쿠팡, 추천, 리뷰`,
    openGraph: {
      title: product.title,
      description: product.description || product.title,
      images: product.image_url ? [{ url: product.image_url }] : [],
      url: `/product/${product.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || product.title,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();

  // Fetch product details
  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch all categories for header
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  // Fetch product reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch related products from same category
  const { data: relatedProducts } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `
    )
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .eq("is_active", true)
    .order("rating", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen bg-background">
      <ProductJsonLd product={product} reviews={reviews || []} />
      <Header categories={categories || []} />
      <main>
        <ProductDetail product={product} reviews={reviews || []} />
        <RelatedProducts products={relatedProducts || []} />
      </main>
      <Footer />
    </div>
  );
}
