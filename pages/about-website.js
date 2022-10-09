import Footer from "../components/Navigation/Footers/Footer"
import AboutWebsiteLayout from "../components/Layouts/AboutWebsiteLayout"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import { motion } from "framer-motion"

export default function AboutWebsitePage() {
  // Main meta tags
  const title = "À propos du site"
  const description = "Découvrez tout ce qu'il faut savoir sur ce site web !"

  // SEO helpers
  const follow = true
  const keywords =
    "Web developper, développeur web, javascript, informations, à propos du site, technologies, web services"

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <PageRoot>
        <HtmlHead
          title={title}
          description={description}
          follow={follow}
          type={type}
          ogImg={ogImg}
          keywords={keywords}
        />

        <AboutWebsiteLayout />

        <Footer />
      </PageRoot>
    </motion.div>
  )
}
