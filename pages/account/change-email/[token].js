import React from "react"
import ChangeEmail_Main from "../../../components/Main/Account/ChangeEmail_Main"
import PagesLayout from "../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Modifier mon adresse e-mail",
  description: "Modifiez votre adresse e-mail",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function ChangeEmailPage() {
  return (
    <PagesLayout head={head}>
      <ChangeEmail_Main />
    </PagesLayout>
  )
}
