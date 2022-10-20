/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["creaqor.com"],
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
