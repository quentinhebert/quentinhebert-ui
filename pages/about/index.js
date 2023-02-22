import About_Main from "../../components/Main/About_Main"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "À propos",
  description:
    "Je m'appelle Quentin, et je suis vidéaste professionnel et développeur web en freelance. Je réalise des films pour vos mariages, des clips, des publicités et bien plus encore ! Si vous cherchez un site web professionnel, contactez-moi !",
  // SEO helpers
  follow: true,
  keywords:
    "Quentin Hébert, vidéaste, freelance, développeur web, Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, video, monteur video advertising, corporate videos, corporate filmmaking, french videomaker, french director, french filmmaker, mariage, vidéaste mariage, autoentrepreneur, microentrepreneur, microentreprise, programmation, web, site web, developer, développeur react, développeur javascript, developpeur js",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function AboutPage({ navbar, footer }) {
  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer} withLayer>
      <About_Main />
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer"])
}
