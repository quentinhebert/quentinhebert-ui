import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import LoginLayout from "../../components/Layouts/LoginLayout"
import SecurityLayout from "../../components/Layouts/account/SecurityLayout"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Mon compte | Sécurité",
  description: "Gérez la sécurité de votre compte",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function SecurityPage() {
  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? (
        <LoginLayout />
      ) : (
        <SecurityLayout user={user} setUser={setUser} />
      )}
    </PagesLayout>
  )
}
