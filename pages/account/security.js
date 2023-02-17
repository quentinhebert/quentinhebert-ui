import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import Login_Main from "../../components/Main/Login_Main"
import AccountSecurity_Main from "../../components/Main/Account/AccountSecurity_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"
import AccountLayout from "../../components/Layouts/AccountLayout"

const head = {
  // Main meta tags
  title: "Mon compte | Sécurité",
  description: "Gérez la sécurité de votre compte",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function SecurityPage() {
  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? (
        <Login_Main />
      ) : (
        <AccountLayout title="Sécurité">
          <AccountSecurity_Main user={user} setUser={setUser} />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}
