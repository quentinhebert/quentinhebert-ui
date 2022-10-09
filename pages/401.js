import Custom401Layout from "../components/Layouts/error/Custom401Layout"
import Footer from "../components/Navigation/Footers/Footer"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import { motion } from "framer-motion"

export default function Custom401Page() {
  // Main meta tags
  const title = "401 | Accès non autorisé"
  const description = "Erreur 401 : l'accès n'est pas autorisé"

  // SEO helpers
  const follow = false

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
        />

        <Custom401Layout />

        <Footer />
      </PageRoot>
    </motion.div>
  )
}
