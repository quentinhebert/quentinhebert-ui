import About_Main from "../../components/Main/About_Main"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "À propos",
  description: "Quentin Hébert | À propos",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking, Web developper, développeur web, javascript, informations, à propos du site, technologies, web services",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AboutPage({ navbar, footer }) {
  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <About_Main />
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer"])
}
