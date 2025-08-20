import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "쿠트너스 - 쿠팡 파트너 상품 추천 플랫폼",
  description:
    "쿠팡의 베스트 상품들을 전문적으로 큐레이션합니다. 실시간 할인 정보와 상세한 분석으로 최고의 쇼핑 경험을 제공합니다.",
  keywords:
    "쿠트너스, 쿠팡파트너, 상품추천, 쇼핑큐레이션, 육아용품, 반려동물용품, 캠핑용품, IT주변기기, 할인정보, 베스트상품",
  authors: [{ name: "쿠트너스" }],
  creator: "쿠트너스",
  publisher: "쿠트너스",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://coutners.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "쿠트너스 - 쿠팡 파트너 상품 전문 큐레이션",
    description:
      "쿠팡의 베스트 상품들을 전문적으로 분석하고 추천합니다. 데이터 기반의 상품 분석과 실시간 할인 정보로 현명한 쇼핑을 도와드립니다.",
    url: "https://coutners.shop",
    siteName: "쿠트너스",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "쿠트너스 - 쿠팡 상품 전문 큐레이션",
    description: "데이터 기반 상품 분석과 실시간 할인 정보로 스마트한 쇼핑을 경험하세요!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen w-full m-0 p-0 antialiased">
        <div className="w-full min-h-screen mx-auto">{children}</div>
      </body>
    </html>
  );
}
