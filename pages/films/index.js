import FilmsIndexLayout from "../../components/Layouts/films/FilmsIndexLayout"
import { defaultConfig } from "../../config/defaultConfig"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import Footer from "../../components/Navigation/Footers/Footer"
import { motion } from "framer-motion"
import prepareProps from "../../services/fetchers"

export default function FilmsHomePage({ footer, films }) {
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

        <FilmsIndexLayout staticData={films} />

        <Footer staticData={footer} />
      </PageRoot>
    </motion.div>
  )
}

export async function getStaticProps() {
  return await prepareProps(["footer", "films"])
}
