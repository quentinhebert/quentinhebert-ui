import React from "react"
import PagesLayout from "../../../components/Layouts/PagesLayout"
import ResetPassord_Main from "../../../components/Main/Account/ResetPassword_Main"

const head = {
  // Main meta tags
  title: "Réinitialisation de mot de passe",
  description: `Réinitialisez votre mot de passe`,
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function ResetPassordPage() {
  return (
    <PagesLayout head={head}>
      <ResetPassord_Main />
    </PagesLayout>
  )
}
