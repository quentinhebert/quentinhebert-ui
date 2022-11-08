import React, { useContext } from "react"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import UsersPanel_Main from "../../components/Main/Admin/UsersPanel_Main"
import Login_Main from "../../components/Main/Login_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"
import Redirect from "../../components/Helpers/redirect"
import AdminLayout from "../../components/Layouts/AdminLayout"

const head = {
  // Main meta tags
  title: "Admin | Gérer les utilisateurs du site",
  description:
    "Page d'administration du site : gérez les utilisateurs de votre site",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AdminUsersManagementPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!user && <Login_Main />}

      {!!user && user.type === USERTYPES.ADMIN && (
        <AdminLayout title="Gérer les utilisateurs">
          <UsersPanel_Main />
        </AdminLayout>
      )}
    </PagesLayout>
  )
}
