import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import AccountIndex_Main from "../../components/Main/Account/AccountIndex_Main"
import Login_Main from "../../components/Main/Login_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"
import AccountLayout from "../../components/Layouts/AccountLayout"

const head = {
  // Main meta tags
  title: "Mon compte",
  description: "Gérez votre compte",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function AccountIndexPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? (
        <Login_Main />
      ) : (
        <AccountLayout title="Mon compte">
          <AccountIndex_Main user={user} />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}
