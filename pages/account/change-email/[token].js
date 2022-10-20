import React from "react"
import ChangeEmailLayout from "../../../components/Layouts/ChangeEmailLayout"
import PagesLayout from "../../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Modifier mon adresse e-mail",
  description: "Modifiez votre adresse e-mail",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function ChangeEmailPage() {
  return (
    <PagesLayout head={head}>
      <ChangeEmailLayout />
    </PagesLayout>
  )
}
