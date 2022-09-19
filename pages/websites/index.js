import WebsitesIndexLayout from "../../components/Layouts/websites/WebsitesIndexLayout"
import Footer from "../../components/Navigation/Footers/Footer"
import Navbar from "../../components/Navigation/Navbars/navbar"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import { defaultConfig } from "../../config/defaultConfig"

export default function WebsitesHomePage() {
  // Main meta tags
  const title = `${defaultConfig.websiteName} | Développeur Freelance`
  const description =
    "Développeur Web Freelance : disponible dans toute la France."
  const canonicalUrl = `${defaultConfig.webclientUrl}/websites`

  // SEO helpers
  const follow = true
  const keywords =
    "Web, Developper, JavaScript, Full-Stack, Website, Creator, Digital, Internet, Site, Sites, Site vitrine, Front-End, Frontend, Back-End, Backend"

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        canonicalUrl={canonicalUrl}
        description={description}
        keywords={keywords}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <Navbar />

      <WebsitesIndexLayout />

      <Footer />
    </PageRoot>
  )
}
