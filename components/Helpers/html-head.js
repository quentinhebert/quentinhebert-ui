import Head from "next/head"
import { useRouter } from "next/router"
import { defaultConfig } from "../../config/defaultConfig"

export default function HtmlHead({
  title,
  description,
  keywords,
  follow,
  type,
  ogImg,
}) {
  const router = useRouter()
  const canonicalUrl = `${defaultConfig.webclientUrl}${router.pathname}`
  const pageTitle = `${defaultConfig.websiteName} | ${title}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="stylesheet" href="/fonts/fonts.css" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#ffffff"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="robots"
        content={follow ? "index, follow" : "noindex, nofollow"}
      />
      <link rel="canonical" href={canonicalUrl} />
      keywords
      <meta name="keywords" content={keywords || ""} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImg} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}
