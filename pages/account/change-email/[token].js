import React from "react"
import ChangeEmailLayout from "../../../components/Layouts/ChangeEmailLayout"
import Footer from "../../../components/Navigation/Footers/Footer"
import HtmlHead from "../../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../../components/ReusableComponents/page-builder/page-root"

// Main meta tags
const title = "Modifier mon adresse e-mail"
const description = "Modifiez votre adresse e-mail"

// SEO helpers
const follow = false

// OpenGraph additional tags (sharing)
const type = "website"
const ogImg = "/medias/ogimg.png"

export default function ChangeEmailPage() {
  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />
      <ChangeEmailLayout />
      <Footer />
    </PageRoot>
  )
}
