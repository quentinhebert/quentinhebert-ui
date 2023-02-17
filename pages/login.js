import { useContext } from "react"
import Login_Main from "../components/Main/Login_Main"
import { UserContext } from "../contexts/UserContext"
import { Stack } from "@mui/material"
import prepareProps from "../services/public-fetchers"
import PagesLayout from "../components/Layouts/PagesLayout"
import PleaseWait from "../components/Helpers/please-wait"
import Redirect from "../components/Helpers/redirect"
import { useRouter } from "next/router"

const head = {
  // Main meta tags
  title: "Se connecter",
  description: "Page de connexion",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function LoginPage({ navbar, footer }) {
  // Check if user is already logged in
  const { user } = useContext(UserContext)

  const router = useRouter()
  const redirect = router.query.redirect

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      {!user ? (
        <Login_Main redirect={redirect || "/account"} />
      ) : !!user ? (
        <Redirect target="/account" />
      ) : (
        <Stack flexGrow={1} justifyContent="center">
          <PleaseWait />
        </Stack>
      )}
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer"])
}
