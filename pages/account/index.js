import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import AccountIndex from "../../components/Layouts/account/AccountIndex"
import LoginLayout from "../../components/Layouts/LoginLayout"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Mon compte",
  description: "Gérez votre compte",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AccountIndexPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? <LoginLayout /> : <AccountIndex user={user} />}
    </PagesLayout>
  )
}
