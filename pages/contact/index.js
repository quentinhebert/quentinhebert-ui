import Contact_Main from "../../components/Main/Contact_Main"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Contactez-moi",
  description:
    "Vous avez un projet ? Donnons du sens à vos idées, que ce soit en vidéo ou sur le web, et réalisons ensemble un film ou un site qui vous ressemble.",
  // SEO helpers
  follow: true,
  keywords:
    "Quentin hébert, contact, vidéaste, freelance, développeur web, Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, video, monteur video advertising, corporate videos, corporate filmmaking, french videomaker, french director, french filmmaker, mariage, vidéaste mariage, autoentrepreneur, microentrepreneur, microentreprise, programmation, web, site web, developer, développeur react, développeur javascript, developpeur js, contact",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function ContactPage(props) {
  const { navbar, footer, websiteContact } = props

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <Contact_Main staticData={websiteContact} />
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "websiteContact"])
}
