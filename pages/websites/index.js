import WebsitesIndex_Main from "../../components/Main/WebsitesIndex_Main"
import prepareProps from "../../services/public-fetchers"
import { WebsitesHomePageContext } from "../../contexts/PagesContexts"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Développeur Web en Freelance",
  description:
    "Développeur Site Web Professionel : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Quentin Hébert, développeur web, développeur site web professionel, freelance, autoentrepreneur, microentrepreneur, microentreprise, programmation, web, site web, developer, développeur react, développeur javascript, developpeur js",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function WebsitesHomePage({
  navbar,
  footer,
  websites,
  websiteSlides,
}) {
  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <WebsitesHomePageContext.Provider
        value={{ staticData: { websites, websiteSlides } }}
      >
        <WebsitesIndex_Main />
      </WebsitesHomePageContext.Provider>
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "websites", "websiteSlides"])
}
