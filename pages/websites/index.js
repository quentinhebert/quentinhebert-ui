import WebsitesIndex_Main from "../../components/Main/WebsitesIndex_Main"
import prepareProps from "../../services/public-fetchers"
import { WebsitesHomePageContext } from "../../contexts/PagesContexts"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Développeur Freelance",
  description: "Développeur Web Freelance : disponible dans toute la France.",
  // SEO helpers
  follow: true,
  keywords:
    "Web, Developper, JavaScript, Full-Stack, Website, Creator, Digital, Internet, Site, Sites, Site vitrine, Front-End, Frontend, Back-End, Backend",
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
