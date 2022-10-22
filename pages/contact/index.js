import ContactLayout from "../../components/Layouts/contact/ContactLayout"
import { Box } from "@mui/material"
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
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: (theme) =>
            `linear-gradient(150deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
        }}
      />

      <ContactLayout staticData={websiteContact} />
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "websiteContact"])
}
