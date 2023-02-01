import React, { useContext } from "react"
import { USERTYPES } from "../../../../../enums/userTypes"
import { UserContext } from "../../../../../contexts/UserContext"
import Login_Main from "../../../../../components/Main/Login_Main"
import EditWebsite_Main from "../../../../../components/Main/Admin/EditWebsite_Main"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import Redirect from "../../../../../components/Helpers/redirect"
import AdminLayout from "../../../../../components/Layouts/AdminLayout"
import { useRouter } from "next/router"

const head = {
  // Main meta tags
  title: "Admin | Back-Office | Web",
  description:
    "Back-Office : gérez tout ce qui concerne le développement web sur votre site",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function EditWebsitePage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const router = useRouter()

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!user && <Login_Main />}
      {!!user && user.type === USERTYPES.ADMIN && (
        <AdminLayout title="Modifier le projet web">
          <EditWebsite_Main websiteId={router.query.id} />
        </AdminLayout>
      )}
    </PagesLayout>
  )
}
