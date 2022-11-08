import { useContext } from "react"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import Redirect from "../../components/Helpers/redirect"
import PagesLayout from "../../components/Layouts/PagesLayout"
import AdminLayout from "../../components/Layouts/AdminLayout"
import FilesPanel_Main from "../../components/Main/Admin/FilesPanel_Main"
import Login_Main from "../../components/Main/Login_Main"

const head = {
  // Main meta tags
  title: "Admin | Gérer les fichiers du site",
  description:
    "Page d'administration du site : gérez les fichiers de votre site",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AdminFilesManagementPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!user && <Login_Main />}

      {!!user && user.type === USERTYPES.ADMIN && (
        <AdminLayout title="Gérer les fichiers">
          <FilesPanel_Main />
        </AdminLayout>
      )}
    </PagesLayout>
  )
}
