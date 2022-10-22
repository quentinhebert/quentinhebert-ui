import IndexLayout from "../components/Layouts/IndexLayout"
import prepareProps from "../services/public-fetchers"
import { HomePageContext } from "../contexts/PagesContexts"
import PagesLayout from "../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Freelance",
  description: "Vidéaste et Développeur Web : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function HomePage(props) {
  const { navbar, footer, services } = props

  return (
    <HomePageContext.Provider value={{ staticData: { services } }}>
      <PagesLayout head={head} navbarData={navbar} footerData={footer}>
        <IndexLayout />
      </PagesLayout>
    </HomePageContext.Provider>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "services"])
}
