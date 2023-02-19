const fs = require("fs")
const globby = require("globby")

function addPage(page) {
  const route = page
    .replace("pages", "")
    .replace(".js", "")
    .replace("/index", "")
    .replace(".mdx", "")
  //   const route = path === "/index" ? "" : path
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_WEBCLIENT_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
}

async function generateSitemap() {
  // excludes Nextjs files and API routes.
  const pages = await globby([
    "pages/**/*{.js,.mdx}",
    "!pages/_*.js",
    "!pages/401.js",
    "!pages/404.js",
    "!pages/login.js",
    "!pages/logout.js",
    "!pages/admin",
    "!pages/account",
    "!pages/order-view",
    "!pages/quotation-view",
    "!pages/dashboard",
  ])
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join("\n")}
  </urlset>`
  fs.writeFileSync("public/sitemap.xml", sitemap)
}
generateSitemap()
