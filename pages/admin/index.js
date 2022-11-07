import React, { useContext } from "react"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import AdminIndex from "../../components/Layouts/admin/AdminIndex"
import LoginLayout from "../../components/Layouts/LoginLayout"
import prepareProps from "../../services/public-fetchers"
import PagesLayout from "../../components/Layouts/PagesLayout"
import Redirect from "../../components/ReusableComponents/helpers/redirect"

const head = {
  // Main meta tags
  title: "Admin",
  description: "Page d'administration du site",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AdminLoginPage({ footer }) {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminIndex />
      ) : (
        <LoginLayout />
      )}
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["footer"])
}
