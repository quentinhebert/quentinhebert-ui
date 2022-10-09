import ContactLayout from "../components/Layouts/contact/ContactLayout"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import Footer from "../components/Navigation/Footers/Footer"
import { motion } from "framer-motion"
import { Box } from "@mui/material"

function ContactPage() {
  // Main meta tags
  const title = "Contact"
  const description =
    "Contactez-moi si vous avez un projet et que vous souhaitez collaborer !"

  // SEO helpers
  const follow = true
  const keywords =
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking"

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <PageRoot>
        <HtmlHead
          title={title}
          description={description}
          keywords={keywords}
          follow={follow}
          type={type}
          ogImg={ogImg}
        />

        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            background: (theme) =>
              `linear-gradient(150deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
          }}
        />

        <ContactLayout />

        <Footer />
      </PageRoot>
    </motion.div>
  )
}

export default ContactPage
