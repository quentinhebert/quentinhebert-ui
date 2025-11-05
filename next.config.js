/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    // domains: ["creaqor.com", "qhstorage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qhstorage.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap")
    }
    return config
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|jpeg)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
}

module.exports = nextConfig
