import Contact_Main from "../../components/Main/Contact_Main"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Contact",
  description:
    "Contactez-moi si vous avez un projet et que vous souhaitez collaborer !",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
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
