import React, { useContext } from "react"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { UserContext } from "../../contexts/UserContext"
import AccountIndex from "../../components/Layouts/account/AccountIndex"
import LoginLayout from "../../components/Layouts/LoginLayout"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"

function AccountIndexPage() {
  // Main meta tags
  const title = "Mon compte"
  const description = "Gérez votre compte"

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

      <Navbar />

      {!user ? <LoginLayout /> : <AccountIndex user={user} />}

      <Footer />
    </PageRoot>
  )
}

export default AccountIndexPage
