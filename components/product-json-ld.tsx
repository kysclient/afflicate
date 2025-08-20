interface Product {
  id: string
  title: string
  description: string | null
  sale_price: number | null
  image_url: string | null
  brand: string | null
  rating: number | null
  review_count: number | null
  categories: {
    name: string
  } | null
}

interface Review {
  id: string
  title: string
  content: string
  rating: number | null
}

interface ProductJsonLdProps {
  product: Product
  reviews: Review[]
}

export function ProductJsonLd({ product, reviews }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image_url,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.categories?.name,
    offers: {
      "@type": "Offer",
      price: product.sale_price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.review_count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    review: reviews.map((review) => ({
      "@type": "Review",
      name: review.title,
      reviewBody: review.content,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
