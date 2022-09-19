import React, { useContext } from "react"
import Head from "next/head"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { UserContext } from "../../contexts/UserContext"
import { Stack } from "@mui/material"
import LoginLayout from "../../components/Layouts/LoginLayout"
import ChangePersonalInformationLayout from "../../components/Layouts/account/ChangePersonalInformationLayout"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"

function PersonalInformationPage() {
  // Main meta tags
  const title = "Mon compte | Mes informations personnelles"
  const description = "Modifiez vos informations personnelles"

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

      <Navbar />

      {!user ? (
        <LoginLayout />
      ) : (
        <ChangePersonalInformationLayout user={user} setUser={setUser} />
      )}

      <Footer />
    </PageRoot>
  )
}

export default PersonalInformationPage
