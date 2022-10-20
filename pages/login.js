import { useContext } from "react"
import LoginLayout from "../components/Layouts/LoginLayout"
import { UserContext } from "../contexts/UserContext"
import PleaseWait from "../components/ReusableComponents/helpers/please-wait"
import { Stack } from "@mui/material"
import prepareProps from "../services/fetchers"
import PagesLayout from "../components/Layouts/PagesLayout"

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
  ogImg: "/medias/ogimg.png",
}

export default function LoginPage({ navbar, footer }) {
  // Check if user is already logged in
  const { user } = useContext(UserContext)

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      {!user ? (
        <LoginLayout redirect="/account" />
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
