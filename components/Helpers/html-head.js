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
      <meta
        name="google-site-verification"
        content="gawWbOBpznQuSXjpGyB-Xn5lwxo2bb9HqoQ1W0vprFw"
      />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
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
