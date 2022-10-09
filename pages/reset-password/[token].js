import React from "react"
import ResetPassordLayout from "../../components/Layouts/ResetPasswordLayout"
import Footer from "../../components/Navigation/Footers/Footer"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"

export default function ResetPassordPage(props) {
  // Main meta tags
  const title = "Réinitialisation de mot de passe"
  const description = `Réinitialisez votre mot de passe`

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <ResetPassordLayout />

      <Footer />
    </PageRoot>
  )
}
