import React from "react"
import EmailConfirmation_Main from "../../../components/Main/Account/EmailConfirmation_Main"
import PagesLayout from "../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Confirmation de l'adresse e-mail",
  description: "Confirmez votre adresse e-mail",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function EmailConfirmationPage() {
  return (
    <PagesLayout head={head}>
      <EmailConfirmation_Main />
    </PagesLayout>
  )
}
