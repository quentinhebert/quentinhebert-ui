import Index_Main from "../components/Main/Index_Main"
import prepareProps from "../services/public-fetchers"
import { HomePageContext } from "../contexts/PagesContexts"
import PagesLayout from "../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Freelance",
  description:
    "Vidéaste et Développeur Web professionnel : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Quentin hébert, vidéaste, freelance, développeur web, Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, video, monteur video advertising, corporate videos, corporate filmmaking, french videomaker, french director, french filmmaker, mariage, vidéaste mariage, autoentrepreneur, microentrepreneur, microentreprise, programmation, web, site web, developer, développeur react, développeur javascript, developpeur js",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.img",
}

export default function HomePage(props) {
  const { navbar, footer, services } = props

  return (
    <HomePageContext.Provider value={{ staticData: { services } }}>
      <PagesLayout head={head} navbarData={navbar} footerData={footer}>
        <Index_Main />
      </PagesLayout>
    </HomePageContext.Provider>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "services"])
}
