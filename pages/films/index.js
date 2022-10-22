import FilmsIndexLayout from "../../components/Layouts/films/FilmsIndexLayout"
import prepareProps from "../../services/public-fetchers"
import { FilmsHomePageContext } from "../../contexts/PagesContexts"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Vidéaste Freelance",
  description:
    "Réalisateur – Cadreur – Monteur : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function FilmsHomePage({ navbar, footer, films }) {
  return (
    <FilmsHomePageContext.Provider value={{ staticData: { films } }}>
      <PagesLayout head={head} navbarData={navbar} footerData={footer}>
        <FilmsIndexLayout />
      </PagesLayout>
    </FilmsHomePageContext.Provider>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "films"])
}
