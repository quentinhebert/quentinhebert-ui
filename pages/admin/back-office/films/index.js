import React, { useContext } from "react"
import Navbar from "../../../../components/Navigation/Navbars/navbar"
import Footer from "../../../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../../../enums/userTypes"
import { UserContext } from "../../../../contexts/UserContext"
import HtmlHead from "../../../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../../../components/ReusableComponents/page-builder/page-root"
import LoginLayout from "../../../../components/Layouts/LoginLayout"
import AdminBackOfficeFilms from "../../../../components/Layouts/admin/AdminBackOfficeFilms"
import { useRouter } from "next/router"

export default function ManageVideosPage() {
  // Main meta tags
  const title = "Admin | Back-Office | Films"
  const description =
    "Back-Office : gérez tout ce qui concerne les films de votre site"

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
        <AdminBackOfficeFilms />
      ) : (
        <LoginLayout />
      )}

      <Footer />
    </PageRoot>
  )
}
