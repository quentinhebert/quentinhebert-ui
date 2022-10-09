import React, { useContext } from "react"
import Footer from "../../components/Navigation/Footers/Footer"
import { UserContext } from "../../contexts/UserContext"
import LoginLayout from "../../components/Layouts/LoginLayout"
import SecurityLayout from "../../components/Layouts/account/SecurityLayout"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"

export default function SecurityPage() {
  // Main meta tags
  const title = "Mon compte | Sécurité"
  const description = "Gérez la sécurité de votre compte"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      {!user ? (
        <LoginLayout />
      ) : (
        <SecurityLayout user={user} setUser={setUser} />
      )}

      <Footer />
    </PageRoot>
  )
}
