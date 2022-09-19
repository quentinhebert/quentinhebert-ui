import Custom401Layout from "../components/Layouts/error/Custom401Layout"
import Footer from "../components/Navigation/Footers/Footer"
import Navbar from "../components/Navigation/Navbars/navbar"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import { defaultConfig } from "../config/defaultConfig"

export default function Custom401Page() {
  // Main meta tags
  const title = `${defaultConfig.websiteName} | 401 | Accès non autorisé`
  const description = `${defaultConfig.websiteName} | 401 | Accès non autorisé`
  const canonicalUrl = `${defaultConfig.webclientUrl}` // FIXME: reprendre la vraie url dynamiquement

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        canonicalUrl={canonicalUrl}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <Navbar />

      <Custom401Layout />

      <Footer />
    </PageRoot>
  )
}
