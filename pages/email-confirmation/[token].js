import React from "react"
import EmailConfirmationLayout from "../../components/Layouts/EmailConfirmationLayout"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"

export default function EmailConfirmationPage() {
  // Main meta tags
  const title = "Confirmation de l'adresse e-mail"
  const description = "Confirmez votre adresse e-mail"

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
      <EmailConfirmationLayout />
    </PageRoot>
  )
}
