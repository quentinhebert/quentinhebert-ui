import { useContext } from "react"
import LoginLayout from "../components/Layouts/LoginLayout"
import Footer from "../components/Navigation/Footers/Footer"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import { UserContext } from "../contexts/UserContext"
import PleaseWait from "../components/ReusableComponents/helpers/please-wait"
import { Stack } from "@mui/material"
import { motion } from "framer-motion"
import prepareProps from "../services/fetchers"

export default function LoginPage({ footer }) {
  // Main meta tags
  const title = "Se connecter"
  const description = "Page de connexion"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  // Check if user is already logged in
  const { user } = useContext(UserContext)

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
          follow={follow}
          type={type}
          ogImg={ogImg}
        />

        {!user ? (
          <LoginLayout redirect="/account" />
        ) : (
          <Stack flexGrow={1} justifyContent="center">
            <PleaseWait />
          </Stack>
        )}

        <Footer staticData={footer} />
      </PageRoot>
    </motion.div>
  )
}

export async function getStaticProps() {
  return await prepareProps(["footer"])
}
