import React from "react"
import PagesLayout from "../../../components/Layouts/PagesLayout"
import ResetPassordLayout from "../../../components/Layouts/ResetPasswordLayout"

const head = {
  // Main meta tags
  title: "Réinitialisation de mot de passe",
  description: `Réinitialisez votre mot de passe`,
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function ResetPassordPage() {
  return (
    <PagesLayout head={head}>
      <ResetPassordLayout />
    </PagesLayout>
  )
}
