import FilmsIndex_Main from "../../components/Main/FilmsIndex_Main"
import prepareProps from "../../services/public-fetchers"
import { FilmsHomePageContext } from "../../contexts/PagesContexts"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Vidéaste Freelance",
  description:
    "Réalisateur – Cadreur – Monteur professionnel : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Quentin Hébert, vidéaste, freelance, Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, video, monteur video advertising, corporate videos, corporate filmmaking, french videomaker, french director, french filmmaker, mariage, vidéaste mariage, autoentrepreneur, microentrepreneur, microentreprise",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function FilmsHomePage({ navbar, footer, films }) {
  return (
    <FilmsHomePageContext.Provider value={{ staticData: { films } }}>
      <PagesLayout head={head} navbarData={navbar} footerData={footer}>
        <FilmsIndex_Main />
      </PagesLayout>
    </FilmsHomePageContext.Provider>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "films"])
}
