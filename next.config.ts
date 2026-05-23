import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [32, 48, 64, 96, 128, 256],
    formats: ['image/webp'], // Format plus léger
  },
}

export default nextConfig