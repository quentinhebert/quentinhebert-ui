import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import Login_Main from "../../components/Main/Login_Main"
import AccountPersonalInformation_Main from "../../components/Main/Account/AccountPersonalInformation_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"
import AccountLayout from "../../components/Layouts/AccountLayout"

const head = {
  // Main meta tags
  title: "Mon compte | Mes informations personnelles",
  description: "Modifiez vos informations personnelles",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

function PersonalInformationPage() {
  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? (
        <Login_Main />
      ) : (
        <AccountLayout title="Mes informations personnelles">
          <AccountPersonalInformation_Main user={user} setUser={setUser} />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}

export default PersonalInformationPage
