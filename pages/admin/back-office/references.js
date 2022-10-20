import React, { useContext } from "react"
import Footer from "../../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../../enums/userTypes"
import { UserContext } from "../../../contexts/UserContext"
import PageRoot from "../../../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../../../components/ReusableComponents/page-builder/html-head"
import AdminBackOfficeReferences from "../../../components/Layouts/admin/AdminBackOfficeReferences"
import LoginLayout from "../../../components/Layouts/LoginLayout"
import PagesLayout from "../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Admin | Back-Office | Références",
  description: "Back-Office : gérez vos références",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function References() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminBackOfficeReferences />
      ) : (
        <LoginLayout />
      )}
    </PagesLayout>
  )
}
