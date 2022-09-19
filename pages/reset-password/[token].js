import React from "react"
import ResetPassordLayout from "../../components/Layouts/ResetPasswordLayout"
import Footer from "../../components/Navigation/Footers/Footer"
import Navbar from "../../components/Navigation/Navbars/navbar"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import { defaultConfig } from "../../config/defaultConfig"

export default function ResetPassordPage(props) {
  // Main meta tags
  const title = `${defaultConfig.websiteName} | Réinitialisez votre mot de passe`
  const description = `Réinitialisez votre mot de passe pour le site ${defaultConfig.webclientUrl}`
  const canonicalUrl = `${defaultConfig.webclientUrl}/reset-password/[token]`

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        canonicalUrl={canonicalUrl}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <Navbar />

      <ResetPassordLayout />

      <Footer />
    </PageRoot>
  )
}
