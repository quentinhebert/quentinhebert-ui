import React, { useContext } from "react"
import Footer from "../../../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../../../enums/userTypes"
import { UserContext } from "../../../../contexts/UserContext"
import HtmlHead from "../../../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../../../components/ReusableComponents/page-builder/page-root"
import LoginLayout from "../../../../components/Layouts/LoginLayout"
import AdminWebsitesSlidesPanel from "../../../../components/Layouts/admin/AdminWebsitesSlidesPanel"
import { useRouter } from "next/router"
import PagesLayout from "../../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Admin | Back-Office | Web | Gérer les diapositives textuelles",
  description:
    "Back-Office : gérez les diapositives textuelles de votre page de développeur",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function ManageWebsitesPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  const router = useRouter()
  if (!!user && user.type !== USERTYPES.ADMIN) router.push("/account")

  return (
    <PagesLayout head={head}>
      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminWebsitesSlidesPanel />
      ) : (
        <LoginLayout />
      )}
    </PagesLayout>
  )
}
