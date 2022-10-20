import React from "react"
import EmailConfirmationLayout from "../../../components/Layouts/EmailConfirmationLayout"
import PagesLayout from "../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Confirmation de l'adresse e-mail",
  description: "Confirmez votre adresse e-mail",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function EmailConfirmationPage() {
  return (
    <PagesLayout head={head}>
      <EmailConfirmationLayout />
    </PagesLayout>
  )
}
