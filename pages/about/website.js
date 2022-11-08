import AboutWebsite_Main from "../../components/Main/AboutWebsite_Main"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "À propos du site",
  description: "Découvrez tout ce qu'il faut savoir sur ce site web !",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking, Web developper, développeur web, javascript, informations, à propos du site, technologies, web services",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AboutWebsitePage({ navbar, footer }) {
  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <AboutWebsite_Main />
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer"])
}
