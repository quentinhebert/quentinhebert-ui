import React, { useContext } from "react"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import AdminFilesPanel from "../../components/Layouts/admin/AdminFilesPanel"
import { useRouter } from "next/router"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"

export default function AdminFilesManagementPage() {
  // Main meta tags
  const title = "Admin | Gérer les fichiers du site"
  const description =
    "Page d'administration du site : gérez les fichiers de votre site"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  const router = useRouter()
  if (!!user && user.type !== USERTYPES.ADMIN) router.push("/account")

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <Navbar />

      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminFilesPanel />
      ) : (
        <LoginLayout />
      )}

      <Footer />
    </PageRoot>
  )
}
