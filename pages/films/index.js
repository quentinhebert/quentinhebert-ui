import FilmsIndexLayout from "../../components/Layouts/films/FilmsIndexLayout"
import { defaultConfig } from "../../config/defaultConfig"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { motion } from "framer-motion"

export default function FilmsHomePage() {
  // Main meta tags
  const title = "Vidéaste Freelance"
  const description =
    "Réalisateur – Cadreur – Monteur : disponible dans toute la France."

  // SEO helpers
  const follow = true
  const keywords =
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking"

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
          keywords={keywords}
          follow={follow}
          type={type}
          ogImg={ogImg}
        />

        <Navbar />

        <FilmsIndexLayout />

        <Footer />
      </PageRoot>
    </motion.div>
  )
}
