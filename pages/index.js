import IndexLayout from "../components/Layouts/IndexLayout"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import Footer from "../components/Navigation/Footers/Footer"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import { motion } from "framer-motion"
import prepareProps from "../services/fetchers"
import { HomePageContext } from "../contexts/PagesContexts"

export default function HomePage(props) {
  const { footer, services } = props
  // Main meta tags
  const title = "Freelance"
  const description =
    "Vidéaste et Développeur Web : disponible dans toute la France."

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
      <HomePageContext.Provider value={{ staticData: { services } }}>
        <PageRoot>
          <HtmlHead
            title={title}
            description={description}
            keywords={keywords}
            follow={follow}
            type={type}
            ogImg={ogImg}
          />

          <IndexLayout />

          <Footer staticData={footer} />
        </PageRoot>
      </HomePageContext.Provider>
    </motion.div>
  )
}

export async function getStaticProps() {
  return await prepareProps(["footer", "services"])
}
