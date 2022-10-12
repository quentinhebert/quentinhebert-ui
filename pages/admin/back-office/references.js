import React, { useContext } from "react"
import Footer from "../../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../../enums/userTypes"
import { UserContext } from "../../../contexts/UserContext"
import PageRoot from "../../../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../../../components/ReusableComponents/page-builder/html-head"
import AdminBackOfficeReferences from "../../../components/Layouts/admin/AdminBackOfficeReferences"
import LoginLayout from "../../../components/Layouts/LoginLayout"

export default function References() {
  // Main meta tags
  const title = "Admin | Back-Office | Vidéo"
  const description =
    "Back-Office : gérez tout ce qui concerne la vidéo sur votre site"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminBackOfficeReferences />
      ) : (
        <LoginLayout />
      )}

      <Footer />
    </PageRoot>
  )
}
