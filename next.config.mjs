const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Enable static generation for better SEO
  output: 'standalone',
  // Optimize for search engines
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
