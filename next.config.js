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
          source: "/:all*(svg|jpg|png)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=9999999999, must-revalidate",
            },
          ],
        },
      ]
    },
  },
])
