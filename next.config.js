// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withPlugins([
  [withBundleAnalyzer({})],
  {
    images: {
      domains: [
        "creaqor.com",
        "staging.quentinhebert.com",
        "quentinhebert.com",
      ],
      minimumCacheTTL: 600,
    },
    headers: async () => {
      return [
        {
          source: "/:pages*",
          headers: [
            {
              key: "Cache-Control",
              value: "private, max-age=180, must-revalidate",
            },
          ],
        },
      ]
    },
  },
])
